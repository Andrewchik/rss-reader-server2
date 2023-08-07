import parser from 'rss-parser';
import Article from '../models/Article';

export const fetchAndSaveArticles = async (feedUrls: string[]) => {
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