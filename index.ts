import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import articleRoutes from './routes/articleRoutes';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import parser from 'rss-parser';
import cron from 'node-cron'; 
import Article from './models/Article'; 

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


app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort('-createdAt');
    res.json(articles);
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

  app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
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


 // Parse RSS feeds and save articles
 const feedUrls = [
  'https://feeds.bbci.co.uk/news/rss.xml', // BBC News
];

const fetchAndSaveArticles = async () => {
  const parserInstance = new parser();
  for (const feedUrl of feedUrls) {
    try {
      const feed = await parserInstance.parseURL(feedUrl);
      for (const item of feed.items) {
        const article = new Article({
          title: item.title || '',
          content: item.content || '',
        });

        console.log(article);
        
        await article.save(); 
      }
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
    }
  }
};

cron.schedule('0 0 * * *', fetchAndSaveArticles);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});