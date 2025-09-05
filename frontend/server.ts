// server.ts - Custom Next.js server with integrated Socket.IO
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server as SocketIOServer } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

// Initialize Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Socket.IO Manager Class
class SocketManager {
  private io: SocketIOServer | null = null
  private static instance: SocketManager

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager()
    }
    return SocketManager.instance
  }

  initialize(httpServer: any) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "*",
        methods: ["GET", "POST"],
        credentials: true
      },
      path: '/socket.io'
    })

    this.setupEventHandlers()
  }

  private setupEventHandlers() {
    if (!this.io) return

    this.io.on('connection', (socket) => {
      console.log('🔌 User connected:', socket.id)

      // Join hospital-specific room
      socket.on('join_hospital', (hospitalId: number) => {
        socket.join(`hospital_${hospitalId}`)
        console.log(`🏥 User ${socket.id} joined hospital_${hospitalId}`)
        
        socket.emit('joined_hospital', {
          hospitalId,
          message: 'Connected to hospital notifications'
        })
      })

      // Join user-specific room
      socket.on('join_user', (userId: number) => {
        socket.join(`user_${userId}`)
        console.log(`👤 User ${socket.id} joined user_${userId}`)
      })

      // Subscribe to organ match updates
      socket.on('subscribe_organ_matches', (organId: number) => {
        socket.join(`organ_${organId}`)
        console.log(`🫀 User ${socket.id} subscribed to organ_${organId} matches`)
      })

      // Subscribe to patient updates
      socket.on('subscribe_patient_updates', (patientId: number) => {
        socket.join(`patient_${patientId}`)
        console.log(`🏥 User ${socket.id} subscribed to patient_${patientId} updates`)
      })

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id)
      })

      // Handle ping for connection testing
      socket.on('ping', () => {
        socket.emit('pong', { timestamp: Date.now() })
      })
    })
  }

  // Emit to specific hospital
  emitToHospital(hospitalId: number, event: string, data: any) {
    if (this.io) {
      this.io.to(`hospital_${hospitalId}`).emit(event, data)
      console.log(`📡 Emitted ${event} to hospital_${hospitalId}`)
    }
  }

  // Emit to specific user
  emitToUser(userId: number, event: string, data: any) {
    if (this.io) {
      this.io.to(`user_${userId}`).emit(event, data)
      console.log(`📡 Emitted ${event} to user_${userId}`)
    }
  }

  // Emit to organ subscribers
  emitToOrganSubscribers(organId: number, event: string, data: any) {
    if (this.io) {
      this.io.to(`organ_${organId}`).emit(event, data)
      console.log(`📡 Emitted ${event} to organ_${organId} subscribers`)
    }
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data)
      console.log(`📢 Broadcasted ${event} to all clients`)
    }
  }

  // Get connection statistics
  getStats() {
    if (!this.io) return { connected: 0, rooms: [] }

    return {
      connected: this.io.engine.clientsCount,
      rooms: Array.from(this.io.sockets.adapter.rooms.keys()).filter(room => 
        room.startsWith('hospital_') || room.startsWith('user_') || room.startsWith('organ_')
      )
    }
  }
}

// Export socket manager for use in API routes
export const socketManager = SocketManager.getInstance()

app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  // Initialize Socket.IO
  socketManager.initialize(httpServer)

  // Health check endpoint
  httpServer.on('request', (req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        socket_stats: socketManager.getStats()
      }))
      return
    }
  })

  httpServer.listen(port, () => {
    console.log(`🚀 Organa server ready on http://${hostname}:${port}`)
    console.log(`🔄 Socket.IO ready`)
    console.log(`🏥 Environment: ${process.env.NODE_ENV}`)
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully')
    httpServer.close(() => {
      console.log('✅ Server closed')
      process.exit(0)
    })
  })
})
