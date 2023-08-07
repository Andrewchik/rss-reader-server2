import { Request, Response } from 'express';
import ArticleModel from '../models/Article';
import Article from '../models/Article';

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

export const updateArticle = async (req: Request, res: Response) => {
  const articleId = req.params.id;
    const { title, content } = req.body;
  
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { title, content },
        { new: true }
      );
  
      if (!updatedArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      res.json(updatedArticle);
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const articleId = req.params.id;
  
  
  try {
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (deletedArticle) {
      res.status(200).json({ message: 'Article deleted successfully' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};