export interface ArticleProps {
  title: string;
  excerpt: string;
  content: string[];
  bodyHtml?: string;
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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  bgColor?: string;
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
  content?: string[];
  bodyHtml?: string;
}
