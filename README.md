# Resume ↔ JD Match Analyzer

## Problem

Job seekers often apply blindly to jobs, sending generic resumes. Manually tailoring a resume for each job description is time-consuming and tedious.

## Features

- **Match Scoring**: Get an instant match score (0-100) based on skills, keyword coverage, and experience relevance.
- **Skill Extraction**: Automatically extracts matched skills and missing skills.
- **Concrete Bullet Rewrites**: Provides specific suggestions to reframe your existing resume bullets using job description language—without inventing any new experience.
- **Privacy-First**: Stateless architecture with no resume storage.

## Screenshot

_(screenshot pending — run locally and take one)_

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **LLM Engine**: AWS Bedrock (\`us.moonshotai.kimi-k3\`)
- **PDF Extraction**: pdf-parse

## Local Setup

1. **Clone the repo**
   \`\`\`bash
   git clone <repo-url>
   cd resume-jd-matcher
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Variables**
   Create a \`.env.local\` file in the root directory and add your AWS credentials:
   \`\`\`
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Test

Run the unit test suite with:
\`\`\`bash
npm test
\`\`\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Limitations

- **Stateless**: Does not store or track resumes over time.
- **LLM Dependence**: Output quality and latency depend on the availability and performance of the AWS Bedrock model.
- **PDF Extraction**: Complex resume formatting (e.g., heavily stylized columns or image-based text) may not be extracted perfectly.
