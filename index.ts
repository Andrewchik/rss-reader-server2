import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import articleRoutes from './routes/articleRoutes';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from './config';

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3001', credentials: true })); 
app.use(cookieParser());

mongoose.connect('mongodb+srv://andrew:qwerty123@cluster0.hvhfelv.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/articles', articleRoutes);

app.get('/api/check-auth', (req, res) => {
    const token = req.cookies.token;
    
    if (token) {
      try {
        jwt.verify(token, config.secretKey);
        res.status(200).json({ isAuthenticated: true });
      } catch (error) {
        res.status(401).json({ isAuthenticated: false });
      }
    } else {
      res.status(401).json({ isAuthenticated: false });
    }
  });

  app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
  
    if (login === 'admin' && password === 'admin') {
      const token = jwt.sign({ user: login }, config.secretKey, {
        expiresIn: '1h'
      });
  
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: false,
        secure: false,
      });
  
      res.json({ message: 'Login successful!' });
      console.log(token);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});