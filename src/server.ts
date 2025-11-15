import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import teamRoutes from './routes/teamRoutes';
import noteRoutes from './routes/noteRoutes';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

dotenv.config();
connectDB();

const app = express();
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Demasiados intentos, inténtelo más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use('/api/auth/login', loginLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', taskRoutes);
app.use('/api/projects', teamRoutes);
app.use('/api/projects', noteRoutes);

export default app