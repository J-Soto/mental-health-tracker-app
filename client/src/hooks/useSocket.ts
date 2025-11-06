import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';

export const useSocket = (event: string, handler: (data: any) => void) => {
  const { socket, isConnected } = useSocketContext();

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [socket, isConnected, event, handler]);

  return { socket, isConnected };
};