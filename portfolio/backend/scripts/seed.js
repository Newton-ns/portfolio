require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Profile = require("../models/Profile");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

const seedData = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("🔗 Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Profile.deleteMany({})
  ]);
  console.log("🗑  Cleared existing data");

  // Seed Profile
  await Profile.create({
    name: "Alex Rivera",
    title: "Full-Stack Developer",
    tagline: "Building products that make a difference",
    bio: "I'm a passionate full-stack developer with 4+ years of experience crafting high-performance web applications. I specialize in React, Node.js, and cloud architecture. When I'm not coding, I'm contributing to open-source or mentoring junior developers.",
    email: "alex@example.com",
    location: "San Francisco, CA",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    resumeUrl: "/resume.pdf",
    social: {
      github: "https://github.com/alexrivera",
      linkedin: "https://linkedin.com/in/alexrivera",
      twitter: "https://twitter.com/alexrivera"
    },
    stats: {
      yearsExperience: 4,
      projectsCompleted: 32,
      happyClients: 18
    }
  });

  // Seed Projects
  await Project.insertMany([
    {
      title: "E-Commerce Platform",
      description: "Full-stack marketplace with real-time inventory, Stripe payments, and admin dashboard.",
      longDescription: "Built with React, Node.js, and PostgreSQL. Features include user authentication, product management, order tracking, and analytics dashboard.",
      techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      githubUrl: "https://github.com/alexrivera/ecommerce",
      liveUrl: "https://shop-demo.vercel.app",
      category: "web",
      featured: true,
      order: 1,
      status: "completed"
    },
    {
      title: "AI Task Manager",
      description: "Smart to-do app that uses NLP to auto-categorize and prioritize tasks.",
      longDescription: "React Native mobile app with Python Flask backend. Integrates OpenAI API for intelligent task suggestions and deadline predictions.",
      techStack: ["React Native", "Python", "Flask", "OpenAI API", "MongoDB"],
      githubUrl: "https://github.com/alexrivera/ai-tasks",
      liveUrl: "https://ai-tasks.netlify.app",
      category: "mobile",
      featured: true,
      order: 2,
      status: "completed"
    },
    {
      title: "DevOps Dashboard",
      description: "Real-time CI/CD pipeline monitoring with Kubernetes cluster visualization.",
      longDescription: "Dashboard built with Vue.js and D3.js that aggregates data from GitHub Actions, Jenkins, and AWS CloudWatch.",
      techStack: ["Vue.js", "D3.js", "Node.js", "Docker", "Kubernetes"],
      githubUrl: "https://github.com/alexrivera/devops-dash",
      category: "devops",
      featured: true,
      order: 3,
      status: "completed"
    },
    {
      title: "Open Source CLI Tool",
      description: "Node.js CLI for scaffolding full-stack projects with 2k+ GitHub stars.",
      techStack: ["Node.js", "Commander.js", "Inquirer", "Handlebars"],
      githubUrl: "https://github.com/alexrivera/scaffold-cli",
      category: "backend",
      featured: false,
      order: 4,
      status: "completed"
    },
    {
      title: "Real-time Chat App",
      description: "WebSocket-based chat with rooms, file sharing, and end-to-end encryption.",
      techStack: ["React", "Socket.io", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/alexrivera/realtime-chat",
      liveUrl: "https://chat-demo.vercel.app",
      category: "web",
      featured: false,
      order: 5,
      status: "completed"
    }
  ]);

  // Seed Skills
  await Skill.insertMany([
    // Frontend
    { name: "React.js", category: "frontend", proficiency: 95, order: 1 },
    { name: "TypeScript", category: "frontend", proficiency: 88, order: 2 },
    { name: "Next.js", category: "frontend", proficiency: 85, order: 3 },
    { name: "Tailwind CSS", category: "frontend", proficiency: 92, order: 4 },
    { name: "Vue.js", category: "frontend", proficiency: 75, order: 5 },
    // Backend
    { name: "Node.js", category: "backend", proficiency: 92, order: 1 },
    { name: "Express.js", category: "backend", proficiency: 90, order: 2 },
    { name: "Python", category: "backend", proficiency: 80, order: 3 },
    { name: "GraphQL", category: "backend", proficiency: 78, order: 4 },
    { name: "REST APIs", category: "backend", proficiency: 95, order: 5 },
    // Database
    { name: "MongoDB", category: "database", proficiency: 88, order: 1 },
    { name: "PostgreSQL", category: "database", proficiency: 85, order: 2 },
    { name: "Redis", category: "database", proficiency: 75, order: 3 },
    { name: "MySQL", category: "database", proficiency: 80, order: 4 },
    // DevOps
    { name: "Docker", category: "devops", proficiency: 82, order: 1 },
    { name: "AWS", category: "devops", proficiency: 78, order: 2 },
    { name: "CI/CD", category: "devops", proficiency: 80, order: 3 },
    { name: "Kubernetes", category: "devops", proficiency: 65, order: 4 },
    // Tools
    { name: "Git", category: "tools", proficiency: 95, order: 1 },
    { name: "Figma", category: "tools", proficiency: 72, order: 2 },
    { name: "Jest", category: "tools", proficiency: 85, order: 3 }
  ]);

  console.log("✅ Database seeded successfully!");
  console.log("   - 1 Profile");
  console.log("   - 5 Projects");
  console.log("   - 21 Skills");
  process.exit(0);
};

seedData().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
