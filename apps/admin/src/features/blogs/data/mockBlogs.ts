import { Blog } from "../types";

export const initialBlogs: Blog[] = [
  {
    id: "understanding-ai",
    title: "Understanding AI in 2024",
    author: "Alice Smith",
    category: "AI",
    tags: ["Tech", "Future"],
    description: "A deep dive into how artificial intelligence is shaping the software industry.",
    image: "/images/blog/blog2.png",
    bg: "bg-gradient-to-t from-purple-600 to-blue-300",
    date: "2024-05-10T10:00:00Z",
    status: "Published",
    views: 12500,
    likes: 850
  },
  {
    id: "modern-ui-design",
    title: "Principles of Modern UI Design",
    author: "John Doe",
    category: "Design",
    tags: ["UX", "UI"],
    description: "Learn the fundamentals of creating beautiful, user-centric interfaces.",
    image: "/images/blog/blog1.png",
    bg: "bg-gradient-to-tl from-gray-700 to-gray-300",
    date: "2024-06-01T08:30:00Z",
    status: "Draft",
    views: 0,
    likes: 0
  },
  {
    id: "nextjs-optimization",
    title: "Optimizing Next.js Applications",
    author: "Jane Foster",
    category: "Development",
    tags: ["React", "Performance"],
    description: "Tips and tricks to make your Next.js apps blazing fast.",
    image: "/images/blog/blog3.png",
    bg: "bg-gradient-to-t from-white to-blue-700",
    date: "2024-04-22T14:15:00Z",
    status: "Published",
    views: 3200,
    likes: 210
  },
  {
    id: "startup-growth",
    title: "Bootstrapping Your Startup",
    author: "Bob Martin",
    category: "Business",
    tags: ["Startup", "Growth"],
    description: "A realistic guide to starting and growing a business without VC funding.",
    image: "/images/home/heroImg1.png",
    bg: "bg-gradient-to-tl from-teal-700 to-teal-300",
    date: "2024-03-12T09:00:00Z",
    status: "Published",
    views: 8900,
    likes: 450
  },
  {
    id: "remote-work",
    title: "The Future of Remote Work",
    author: "Alice Smith",
    category: "Business",
    tags: ["Culture"],
    description: "How companies are adapting to a fully remote or hybrid workforce.",
    image: "/images/home/heroImg3.png",
    bg: "bg-gradient-to-t from-indigo-900 to-indigo-400",
    date: "2024-06-10T11:45:00Z",
    status: "Draft",
    views: 0,
    likes: 0
  }
];
