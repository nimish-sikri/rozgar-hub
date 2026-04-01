// Common technical and professional skills for resume matching
export const SKILLS_DICTIONARY = new Set([
  // Programming Languages
  "javascript", "typescript", "python", "java", "c++", "c#", "go", "golang",
  "rust", "ruby", "php", "swift", "kotlin", "scala", "perl", "r", "matlab",
  "dart", "lua", "haskell", "elixir", "clojure", "objective-c", "assembly",
  "bash", "shell", "powershell", "sql", "html", "css", "sass", "less",

  // Frontend Frameworks & Libraries
  "react", "reactjs", "angular", "vue", "vuejs", "svelte", "nextjs", "next.js",
  "nuxt", "gatsby", "remix", "ember", "backbone", "jquery", "bootstrap",
  "tailwind", "tailwindcss", "material-ui", "chakra", "styled-components",
  "redux", "mobx", "zustand", "webpack", "vite", "rollup", "babel",

  // Backend Frameworks
  "node", "nodejs", "express", "nestjs", "fastify", "django", "flask",
  "fastapi", "spring", "spring boot", "rails", "ruby on rails", "laravel",
  "symfony", "asp.net", ".net", "gin", "fiber", "actix", "rocket",

  // Databases
  "postgresql", "postgres", "mysql", "mongodb", "redis", "elasticsearch",
  "cassandra", "dynamodb", "firebase", "firestore", "supabase", "sqlite",
  "oracle", "sql server", "mariadb", "couchdb", "neo4j", "prisma",
  "sequelize", "typeorm", "mongoose", "drizzle",

  // Cloud & DevOps
  "aws", "amazon web services", "azure", "gcp", "google cloud", "heroku",
  "vercel", "netlify", "digitalocean", "cloudflare", "docker", "kubernetes",
  "k8s", "terraform", "ansible", "puppet", "chef", "jenkins", "github actions",
  "gitlab ci", "circleci", "travis ci", "nginx", "apache", "linux", "ubuntu",
  "centos", "devops", "ci/cd", "microservices", "serverless", "lambda",

  // Data & AI/ML
  "machine learning", "deep learning", "artificial intelligence", "ai", "ml",
  "tensorflow", "pytorch", "keras", "scikit-learn", "pandas", "numpy",
  "data science", "data analysis", "data engineering", "big data",
  "spark", "hadoop", "airflow", "kafka", "etl", "data pipeline",
  "nlp", "natural language processing", "computer vision", "opencv",
  "tableau", "power bi", "looker", "data visualization",

  // Mobile
  "react native", "flutter", "ios", "android", "swiftui", "jetpack compose",
  "xamarin", "ionic", "cordova", "mobile development",

  // Testing
  "jest", "mocha", "cypress", "selenium", "playwright", "puppeteer",
  "testing", "unit testing", "integration testing", "e2e", "tdd", "bdd",
  "pytest", "junit", "testng", "rspec",

  // Tools & Practices
  "git", "github", "gitlab", "bitbucket", "jira", "confluence", "slack",
  "figma", "sketch", "adobe xd", "postman", "swagger", "graphql",
  "rest", "restful", "api", "websocket", "grpc", "oauth", "jwt",
  "agile", "scrum", "kanban", "waterfall",

  // Security
  "cybersecurity", "penetration testing", "ethical hacking", "owasp",
  "encryption", "ssl", "tls", "firewall", "soc", "siem",

  // Concepts & Architecture
  "system design", "software architecture", "design patterns", "solid",
  "oop", "functional programming", "event driven", "message queue",
  "rabbitmq", "sqs", "pub/sub", "caching", "load balancing",
  "distributed systems", "high availability", "scalability",

  // Soft Skills & Management
  "leadership", "communication", "problem solving", "teamwork",
  "project management", "product management", "stakeholder management",
  "mentoring", "technical writing", "documentation", "presentation",
  "strategic planning", "budgeting", "risk management",

  // Industry Domains
  "fintech", "healthcare", "e-commerce", "saas", "blockchain",
  "cryptocurrency", "web3", "iot", "embedded systems", "robotics",
  "ar", "vr", "augmented reality", "virtual reality", "gaming",
  "erp", "crm", "salesforce", "sap",

  // Certifications & Standards
  "aws certified", "azure certified", "pmp", "scrum master",
  "itil", "iso", "gdpr", "hipaa", "sox", "compliance",
]);

// Common stop words to filter out during text extraction
export const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "as", "is", "was", "are", "were", "been",
  "be", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "shall", "can", "need", "dare",
  "ought", "used", "this", "that", "these", "those", "i", "me", "my",
  "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
  "he", "him", "his", "she", "her", "hers", "it", "its", "they",
  "them", "their", "theirs", "what", "which", "who", "whom", "where",
  "when", "why", "how", "all", "each", "every", "both", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "just", "because", "about",
  "between", "through", "during", "before", "after", "above", "below",
  "up", "down", "out", "off", "over", "under", "again", "further",
  "then", "once", "here", "there", "also", "new", "year", "years",
  "work", "working", "worked", "using", "use", "used", "including",
  "include", "experience", "experienced", "responsible", "responsibilities",
  "strong", "ability", "knowledge", "skills", "skill", "required",
  "requirements", "preferred", "etc", "e.g", "i.e", "per", "via",
]);
