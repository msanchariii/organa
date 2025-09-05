// lib/socket.ts - Frontend WebSocket client
import { io, Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null
  private static instance: SocketService

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }
    return SocketService.instance
  }

  connect(userId?: number, hospitalId?: number) {
    if (this.socket?.connected) return

    this.socket = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', {
      path: '/socket.io',
      transports: ['websocket', 'polling']
    })

    this.socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket server')
      
      // Join user and hospital rooms
      if (userId) {
        this.socket?.emit('join_user', userId)
      }
      if (hospitalId) {
        this.socket?.emit('join_hospital', hospitalId)
      }
    })

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server')
    })

    // Set up event listeners
    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (!this.socket) return

    // New notifications
    this.socket.on('new_notification', (data) => {
      console.log('📢 New notification:', data.message)
      // Show toast notification
      this.showNotification(data.message, data.type || 'info')
    })

    // Match found
    this.socket.on('match_found', (data) => {
      console.log('🫀 Match found:', data)
      this.showNotification(
        `New organ match: ${data.organ_type} for ${data.patient_name}`,
        'success'
      )
    })

    // Match approved
    this.socket.on('match_approved', (data) => {
      console.log('✅ Match approved:', data)
      this.showNotification(data.message, 'success')
    })

    // Organ expiring
    this.socket.on('organ_expiring', (data) => {
      console.log('⏰ Organ expiring:', data)
      this.showNotification(data.message, 'urgent')
    })
  }

  subscribeToOrganMatches(organId: number) {
    this.socket?.emit('subscribe_organ_matches', organId)
  }

  subscribeToPatientUpdates(patientId: number) {
    this.socket?.emit('subscribe_patient_updates', patientId)
  }

  private showNotification(message: string, type: string) {
    // Integrate with your notification system (toast, etc.)
    if (typeof window !== 'undefined') {
      // Example with browser notification
      if (Notification.permission === 'granted') {
        new Notification('Organa Alert', {
          body: message,
          icon: '/favicon.ico'
        })
      }
    }
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}

export const socketService = SocketService.getInstance()
