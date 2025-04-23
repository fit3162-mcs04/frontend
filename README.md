# **Classification of Gene Expression Profiles Using Machine Learning Approaches**

## **Table of Contents**
- **[Introduction](#introduction)**
- **[Project Overview](#project-overview)**
- **[Technology Stack](#technology-stack)**
- **[Project Structure](#project-structure)**
- **[Getting Started](#getting-started)**

## **Introduction**

We're students from **[Monash University](https://www.monash.edu/)**. Our team is working on a project to classify gene expression profiles using machine learning approaches. Our goal is to develop a robust and accurate model that can classify or predict whether someone has had an ischemic stroke disease. This repository contains the web application dashboard for visualizing and analyzing gene expression data. Our machine learning/algorithms development is handled in a separate repository.

### **Team Members**

| Name | Role | Responsibilities | Contact |
|------|------|------------------|---------|
| Lee Kay Chyuan | Project Manager | Project coordination, Timeline management, Documentation | klee0136@student.monash.edu |
| Zhu Kuiyuan | Full-stack Developer | Frontend development, API integration | kzhu0018@student.monash.edu |
| Tan Kok Wei | ML Engineer | Model integration, Data pipeline | ktan0149@student.monash.edu |
| Akito Hasegawa | Tech Lead | System architecture, Code review, CI/CD | ahas0037@student.monash.edu |

## **Project Overview**

This dashboard provides:
- Secure **user authentication** and **data management**
- **CSV file upload** and validation for gene expression profiles
- **Data visualization tools** for exploratory analysis
- Integration with our ML pipeline (via API)
- Results interpretation and reporting

## **Technology Stack**

- **[Next.js](https://nextjs.org/)**: version 15
- **[React](https://reactjs.org/)**: version 19
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Shadcn/ui](https://ui.shadcn.com/)** for reusable ui components
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[Hono](https://hono.dev/)** for server APIs
- **[Better Auth](https://www.better-auth.com/)** for authentication and authorization
- **[Drizzle ORM](https://orm.drizzle.team/)** for database operations
- **[Sqlite](https://www.sqlite.org/index.html)** for data storage
- **[GitHub Actions](https://docs.github.com/en/actions)** for CI/CD

## **Project Structure**
```
web/
├── .github/            # GitHub Actions
├── app/                # Main application (Next.js app router)
│   ├── (main)/        # Application routes
│   ├── (site)/        # Site routes
│   ├── styles/        # CSS modules
│   ├── api/           # Server API routes
│   └── favicon.ico    # Favicon
│   └── layout.tsx     # Root layout
│   └── not-found.tsx  # Not found page
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and libraries
├── providers/         # Context providers
├── db/                # Database configuration
├── store/             # State management
├── public/            # Static assets (images, fonts, etc.)
├── server/            # Server side routes
├── components.json    # Shadcn UI configuration
├── middleware.ts      # Middleware on edge runtime
├── .env.sample        # Environment variables example
├── biome.json         # Biome configuration
├── .gitignore         # Git ignore file
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies and scripts
├── bun.lock           # Project dependencies and versions
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## **Getting Started**

### Prerequisites

- Bun v1.1.0 or higher
- Node.js v20.0.0 or higher

### Installation

1. Install dependencies using [bun](https://bun.sh/)
```bash
bun install
```

2. Copy and paste the environment variables from `.env.example` into `.env.local` and fill the values.

3. Initialize the database. Run the following command:
```bash
bun run db:migrate
```

4. Sync the Git hooks using LeftHook:
```bash
bun run hook:sync
```

### Development

1. Start the development server:
```bash
bun run dev
```
2. Open your browser and navigate to `http://localhost:3000`.
