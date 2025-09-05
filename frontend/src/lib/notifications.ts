// lib/notifications.ts - Integrated notification service
import { prisma } from './prisma'
import { socketManager } from '../../../server'

export class NotificationService {
  
  static async createNotification(hospitalId: number, message: string, type: string = 'info') {
    try {
      // Store in database
      const notification = await prisma.notifications.create({
        data: {
          hospital_id: hospitalId,
          message
        }
      })

      // Send real-time notification via Socket.IO
      socketManager.emitToHospital(hospitalId, 'new_notification', {
        id: notification.id,
        message: notification.message,
        type,
        created_at: notification.created_at
      })

      return notification
    } catch (error) {
      console.error('Failed to create notification:', error)
      throw error
    }
  }

  static async notifyMatchFound(organId: number, patientId: number, matchScore: number) {
    try {
      const organ = await prisma.organs.findUnique({
        where: { id: organId },
        include: { hospitals: true }
      })
      
      const patient = await prisma.patients.findUnique({
        where: { id: patientId },
        include: { hospitals: true }
      })

      if (!organ || !patient) return

      const message = `🫀 New organ match found: ${organ.organ_type} for patient ${patient.name} (${Math.round(matchScore)}% compatibility)`
      
      // Notify both hospitals if different
      const hospitalIds = new Set([organ.hospital_id, patient.hospital_id].filter(Boolean))
      
      for (const hospitalId of hospitalIds) {
        await this.createNotification(hospitalId!, message, 'match')
      }

      // Notify organ and patient subscribers
      socketManager.emitToOrganSubscribers(organId, 'match_found', {
        organ_id: organId,
        patient_id: patientId,
        match_score: matchScore,
        patient_name: patient.name,
        organ_type: organ.organ_type,
        message
      })

      console.log(`Match notification sent: Organ ${organId} -> Patient ${patientId}`)
    } catch (error) {
      console.error('Failed to send match notification:', error)
    }
  }

  static async notifyMatchApproved(matchId: number, approvedBy: number) {
    try {
      const match = await prisma.matches.findUnique({
        where: { id: matchId },
        include: {
          organs: { include: { hospitals: true } },
          patients: { include: { hospitals: true } },
          users: { select: { email: true, role: true } }
        }
      })

      if (!match) return

      const message = `✅ Match approved: ${match.organs?.organ_type} for patient ${match.patients?.name}`
      
      // Notify all relevant hospitals
      const hospitalIds = new Set([
        match.organs?.hospital_id,
        match.patients?.hospital_id
      ].filter(Boolean))
      
      for (const hospitalId of hospitalIds) {
        await this.createNotification(hospitalId!, message, 'success')
      }

      // Broadcast urgent update
      socketManager.broadcast('match_approved', {
        match_id: matchId,
        organ_type: match.organs?.organ_type,
        patient_name: match.patients?.name,
        approved_by: match.users?.email,
        message
      })

    } catch (error) {
      console.error('Failed to send approval notification:', error)
    }
  }

  static async notifyOrganExpiring(organId: number, hoursRemaining: number) {
    try {
      const organ = await prisma.organs.findUnique({
        where: { id: organId },
        include: { hospitals: true }
      })

      if (!organ) return

      const message = `⏰ URGENT: ${organ.organ_type} expires in ${hoursRemaining} hours`
      
      await this.createNotification(organ.hospital_id!, message, 'urgent')

      // Broadcast to all hospitals for urgent cases
      if (hoursRemaining <= 6) {
        socketManager.broadcast('organ_expiring', {
          organ_id: organId,
          organ_type: organ.organ_type,
          hours_remaining: hoursRemaining,
          message
        })
      }

    } catch (error) {
      console.error('Failed to send expiration notification:', error)
    }
  }
}
