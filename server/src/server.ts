import 'dotenv/config';
import http from 'http';
import app from './app';
import { configureSocket } from './config/socket';

const port = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const io = configureSocket(httpServer);

app.set('io', io);

httpServer.listen(port, () => {
  console.log(`HTTP Server running at http://localhost:${port}`);
  console.log(`WebSocket ready at ws://localhost:${port}`);
});