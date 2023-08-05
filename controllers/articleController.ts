import { Request, Response } from 'express';
import ArticleModel from '../models/Article';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await ArticleModel.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  try {
    const newArticle = new ArticleModel({ title, content });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
};