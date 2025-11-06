import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { verifyAuthToken } from '../services/auth.service';

/**
 * Configures and returns the Socket.io instance
 * Handles authentication and user-based rooms
 */
export const configureSocket = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling']
  });

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    const user = verifyAuthToken(token);
    
    if (!user) {
      return next(new Error('Authentication error: Invalid token'));
    }

    socket.data.user = user;
    next();
  });

  io.on('connection', (socket: Socket) => {
    const user = socket.data.user;
    
    console.log(`✅ User connected via WebSocket: ${user.displayName} (${user.id})`);
    
    socket.join(user.id);
    
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${user.displayName} (${user.id})`);
    });

    socket.on('requestRefresh', () => {
      socket.emit('refreshLogs');
    });
  });

  return io;
};

export const emitToUser = (io: SocketIOServer, userId: string, event: string, data: any) => {
  io.to(userId).emit(event, data);
};