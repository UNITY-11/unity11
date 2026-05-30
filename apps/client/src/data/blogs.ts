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
    author?: {
        name: string;
        avatar: string;
        role: string;
    };
    content?: string[];
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
        bgColor: "from-[#0E18E4] to-white",
        author: {
            name: "Alex Rivera",
            avatar: "/images/testimonials/testimonial-1.png",
            role: "Principal Engineer"
        },
        content: [
            "When building modern web applications, the architecture you choose early on can dictate the success of your product. A scalable architecture is not just about handling more traffic; it's about maintaining developer velocity and system reliability as your user base expands.",
            "In this guide, we dive deep into the key principles of scalable web architecture. We'll explore microservices vs monoliths, the importance of decoupling components, and how serverless technologies are changing the landscape.",
            "Database scaling is often the bottleneck. We recommend starting with a robust relational database like PostgreSQL, and introducing caching layers (Redis or Memcached) only when read operations become a performance issue.",
            "By following these patterns, you ensure your application is resilient, fault-tolerant, and ready for whatever growth comes its way."
        ]
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
        bgColor: "from-[#606871] to-white",
        author: {
            name: "Samantha Lee",
            avatar: "/images/testimonials/testimonial-2.png",
            role: "AI Researcher"
        },
        content: [
            "Artificial Intelligence is no longer just a buzzword; it's actively reshaping the way software engineering teams operate. From intelligent code completion to automated testing, AI is augmenting human capabilities.",
            "One of the biggest shifts we've seen is in the review process. LLM-powered tools can now analyze pull requests for security vulnerabilities and stylistic inconsistencies faster than any human reviewer.",
            "However, this doesn't mean developers are becoming obsolete. Instead, the role of a developer is shifting from 'code writer' to 'system architect'. The focus is now on assembling intelligent workflows and ensuring the AI tools are properly guided.",
            "In the coming years, we expect to see even tighter integration between AI models and IDEs, making the software development lifecycle faster and more secure."
        ]
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
        bgColor: "from-[#5F55AD] to-white",
        author: {
            name: "Jordan Smith",
            avatar: "/images/testimonials/testimonial-3.png",
            role: "UX Director"
        },
        content: [
            "A well-crafted design system is the backbone of any large-scale application. It bridges the gap between design and engineering, ensuring visual consistency across every user touchpoint.",
            "But what makes a design system truly empowering? It's not just a Figma file with buttons. It requires a shared language: Design Tokens. By abstracting colors, spacing, and typography into variables, both designers and developers speak the same language.",
            "Component libraries built on top of these tokens allow teams to ship features exponentially faster. When an update is needed, changing a token propagates the change across the entire product suite.",
            "Ultimately, a design system should be treated as a product itself, with its own roadmap, maintainers, and documentation."
        ]
    },
];
