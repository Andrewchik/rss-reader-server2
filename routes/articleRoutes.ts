import express from 'express';
import { getArticles, createArticle } from '../controllers/articleController';

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);

export default router;