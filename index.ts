import express, { Application } from 'express';
import bodyParser from 'body-parser';
import articleRoutes from './routes/articleRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cron from 'node-cron'; 
import { connectDB } from './db';
import authRoutes from './routes/authRoutes';
import { fetchAndSaveArticles } from './services/articleService';

const app: Application = express();
const PORT: number = 3000;
const feedUrls: Array<string> = [
  'https://feeds.bbci.co.uk/news/rss.xml', // BBC News
];

app.use(cors({ origin: 'http://localhost:3001', credentials: true })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

connectDB();

cron.schedule('0 0 * * *', () => {
  fetchAndSaveArticles(feedUrls);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});