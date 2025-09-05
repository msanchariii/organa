// lib/matching.ts
import { prisma } from './prisma'

export interface MatchResult {
  patient: any
  organ: any
  score: number
  compatibility_factors: string[]
  created_at: Date
}

export class MatchingService {
  
  static async calculateMatchScore(organId: number, patientId: number): Promise<number> {
    const organ = await prisma.organs.findUnique({
      where: { id: organId }
    })
    
    const patient = await prisma.patients.findUnique({
      where: { id: patientId }
    })
    
    if (!organ || !patient) return 0

    let score = 0

    // Blood type compatibility (40% weight)
    if (this.isBloodTypeCompatible(organ.donor_blood_type, patient.blood_type)) {
      score += 0.4
    }

    // Priority status (30% weight)
    const priorityScore = (patient.priority_status / 10) * 0.3
    score += priorityScore

    // HLA compatibility (20% weight)
    const hlaScore = this.calculateHLACompatibility(organ, patient)
    score += hlaScore * 0.2

    // Geographic proximity (10% weight)
    if (organ.hospital_id === patient.hospital_id) {
      score += 0.1
    }

    return Math.min(Math.round(score * 100) / 100, 1.0)
  }

  private static isBloodTypeCompatible(donorType: string, recipientType: string): boolean {
    const compatibilityMap: Record<string, string[]> = {
      'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      'O+': ['O+', 'A+', 'B+', 'AB+'],
      'A-': ['A-', 'A+', 'AB-', 'AB+'],
      'A+': ['A+', 'AB+'],
      'B-': ['B-', 'B+', 'AB-', 'AB+'],
      'B+': ['B+', 'AB+'],
      'AB-': ['AB-', 'AB+'],
      'AB+': ['AB+']
    }
    return compatibilityMap[donorType]?.includes(recipientType) || false
  }

  private static calculateHLACompatibility(organ: any, patient: any): number {
    if (!organ.hla_a || !patient.hla_test) return 0.5

    let matches = 0, total = 0
    const organHLA = { hla_a: organ.hla_a, hla_b: organ.hla_b, hla_c: organ.hla_c }
    const patientHLA = patient.hla_test

    for (const [key, value] of Object.entries(organHLA)) {
      if (value && patientHLA[key]) {
        total++
        if (value === patientHLA[key]) matches++
      }
    }

    return total > 0 ? matches / total : 0.5
  }

  static async findMatches(organId: number): Promise<MatchResult[]> {
    const organ = await prisma.organs.findUnique({
      where: { id: organId },
      include: { hospitals: true }
    })

    if (!organ) throw new Error('Organ not found')

    const potentialPatients = await prisma.patients.findMany({
      where: {
        organ_needed: organ.organ_type,
        status: 'waiting'
      },
      include: { hospitals: true }
    })

    const matches: MatchResult[] = []

    for (const patient of potentialPatients) {
      const score = await this.calculateMatchScore(organId, patient.id)
      
      if (score > 0.1) {
        matches.push({
          patient,
          organ,
          score,
          compatibility_factors: this.getCompatibilityFactors(organ, patient, score),
          created_at: new Date()
        })
      }
    }

    return matches.sort((a, b) => b.score - a.score)
  }

  private static getCompatibilityFactors(organ: any, patient: any, score: number): string[] {
    const factors: string[] = []
    
    if (this.isBloodTypeCompatible(organ.donor_blood_type, patient.blood_type)) {
      factors.push(`Blood type compatible (${organ.donor_blood_type} → ${patient.blood_type})`)
    }
    
    if (patient.priority_status >= 7) factors.push('High priority patient')
    if (score >= 0.8) factors.push('Excellent overall match')
    if (organ.hospital_id === patient.hospital_id) factors.push('Same hospital - minimal transport')
    
    return factors
  }

  static async createMatch(organId: number, patientId: number, matchedBy: number) {
    const score = await this.calculateMatchScore(organId, patientId)
    
    return await prisma.matches.create({
      data: {
        organ_id: organId,
        patient_id: patientId,
        match_score: score,
        status: 'pending',
        matched_by: matchedBy
      },
      include: {
        organs: true,
        patients: true,
        users: { select: { id: true, email: true, role: true } }
      }
    })
  }
}
