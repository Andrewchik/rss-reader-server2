import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config';
import AuthUser from '../models/AuthUser';

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const authUser = await AuthUser.findOne({ login, password });
    if (authUser) {
      const token = jwt.sign({ user: authUser.login }, config.secretKey, {
        expiresIn: '1h',
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
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logOut = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

export const checkAuth = async (req: Request, res: Response) => {
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
};