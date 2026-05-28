interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    slug: string;
    bgColor?: string;
}


export const posts: BlogPost[] = [
    
    {
        id: 1,
        title: "Scalable Architecture for Modern Web Apps",
        excerpt:
            "Key principles you need when building products that grow without falling apart.",
        image: "/images/blog/blog3.png",
        category: "Engineering",
        date: "Oct 2025",
        readTime: "7 min",
        slug: "scalable-web-architecture",
        bgColor: "from-[#0E18E4] to-white"
    },
    {
        id: 2,
        title: "How AI Is Transforming Software Development",
        excerpt:
            "A breakdown of how automation, LLMs, and new workflows are reshaping engineering teams.",
        image: "/images/blog/blog1.png",
        category: "AI & Innovation",
        date: "Nov 2025",
        readTime: "5 min",
        slug: "ai-transforming-software-dev",
        bgColor: "from-[#606871] to-white"
    },
    {
        id: 3,
        title: "Design Systems That Actually Empower Teams",
        excerpt:
            "A deep dive into design tokens, component libraries, and productivity.",
        image: "/images/blog/blog2.png",
        category: "Design",
        date: "Sep 2025",
        readTime: "4 min",
        slug: "modern-design-systems",
        bgColor: "from-[#5F55AD] to-white"

    },
];