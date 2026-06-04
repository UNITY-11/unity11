export interface ArticleProps {
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  bgColor?: string;
}
