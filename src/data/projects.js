export const projects = [
    {
        id: 1,
        title: "PandoAI",
        subtitle: "AI-Powered Mental Wellness Platform",
        description: "A comprehensive mental wellness web application built with Next.js 14, featuring AI-powered conversations, mood tracking, mindfulness exercises, and personalized insights.",
        image: "https://placehold.co/1920x1080/262626/E3FB29/png?text=PandoAI",
        video: "", // Placeholder for video
        link: "https://pando-ai-iota.vercel.app/dashboard",
        features: [
            "AI Chat Companion: Intelligent conversations with crisis detection",
            "Mood Tracking: Daily mood check-ins with trend analysis",
            "Mindfulness Exercises: Guided breathing and meditation",
            "Wellness Games: Interactive games for focus and anxiety",
            "Journal & Reflection: Digital journaling with mood correlation",
            "Personal Insights: Analytics and progress tracking",
            "Guest & Authenticated Modes"
        ],
        techStack: {
            Frontend: ["Next.js 14", "React 19", "Tailwind CSS 4", "Framer Motion", "Lucide React", "Recharts"],
            Backend: ["Next.js API Routes", "MongoDB", "Mongoose", "Clerk", "OpenRouter API"],
            State: ["Zustand", "React Query"],
            Development: ["TypeScript", "ESLint", "Turbopack"]
        }
    },
    {
        id: 2,
        title: "Lystré",
        subtitle: "Fashion E-Commerce Platform",
        description: "A modern, full-featured fashion e-commerce platform featuring a neobrutalism-inspired admin dashboard and an elegant customer portal.",
        image: "https://placehold.co/1920x1080/262626/E3FB29/png?text=Lystre",
        video: "", // Placeholder
        link: "", // No link provided in prompt, or maybe implicit?
        features: [
            "Customer Portal: Product catalog, cart, wishlist, reviews",
            "Size Guide & AI Fit: Interactive charts and AI outfit recommendations",
            "Admin Dashboard: Revenue metrics, inventory management",
            "Order & Invoice Management",
            "Neobrutalism UI Design"
        ],
        techStack: {
            Framework: ["Next.js 15"],
            Language: ["TypeScript"],
            Styling: ["TailwindCSS", "Custom RetroUI"],
            Database: ["PostgreSQL", "Prisma 6"],
            State: ["Zustand"],
            Auth: ["JWT"]
        }
    },
    {
        id: 3,
        title: "Mojito Website",
        subtitle: "Client Website",
        description: "A custom website built for a client using GSAP animations.",
        image: "https://placehold.co/1920x1080/262626/E3FB29/png?text=Mojito",
        video: "",
        link: "https://mojito-website-gsap-five.vercel.app/",
        features: [
            "GSAP Animations",
            "Custom Design",
            "Responsive Layout"
        ],
        techStack: {
            Frontend: ["React", "GSAP", "Vercel"]
        }
    },
    {
        id: 4,
        title: "Rocarios",
        subtitle: "AI Size Prediction & Virtual Try-On",
        description: "Predict shoulder width, chest, and waist measurements from height to recommend clothing sizes via an API or web app.",
        image: "https://placehold.co/1920x1080/262626/E3FB29/png?text=Rocarios",
        video: "",
        link: "https://www.rocarios.com/",
        features: [
            "AI-driven size predictions",
            "3D product models for visualization",
            "AR-based virtual try-ons",
            "AI chatbots for assistance"
        ],
        techStack: {
            Stack: ["TypeScript", "Python (AI)", "NextJS", "AR"]
        }
    }
];
