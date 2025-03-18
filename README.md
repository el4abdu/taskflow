# TaskFlow - Smart Task Management System

TaskFlow is a modern web application for task management with AI-powered scheduling and intelligent organization features.

![TaskFlow Dashboard Preview](https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

## Features

- **Task Creation & Categorization**: Create, organize, and categorize tasks with priorities
- **Smart Scheduling**: AI-powered scheduling suggestions for optimal productivity
- **Reminders & Notifications**: Never miss a deadline with custom notifications
- **Task Progress Tracking**: Visualize your productivity with insightful analytics
- **Drag & Drop Task Board**: Organize your tasks visually like Trello
- **Recurring Tasks**: Set up repeating tasks on daily, weekly, or monthly schedules
- **Team Collaboration**: Share tasks with teammates (coming soon)
- **AI Productivity Insights**: Get personalized recommendations to improve your workflow
- **Dark Mode & Responsive Design**: Beautiful UI that works on any device

## Tech Stack

- **Frontend**: Next.js with TypeScript, React, and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js with JWT
- **AI Integration**: Google's Gemini AI for smart scheduling
- **State Management**: React Context API and Hooks
- **Charts**: Chart.js for analytics visualizations
- **Styling**: Tailwind CSS with dark mode support

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB database (local or MongoDB Atlas)
- Gemini AI API key (for smart scheduling features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following environment variables:
   ```
   # MongoDB connection string
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Optional OAuth providers
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret

   # Gemini AI API Key (for smart scheduling)
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
taskflow/
├── app/                  # App Router for pages
│   ├── api/              # API routes (backend)
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard page
│   ├── tasks/            # Task management pages
│   └── ...               # Other pages
├── components/           # React components
│   ├── dashboard/        # Dashboard-specific components
│   └── ...               # Other components
├── lib/                  # Utility libraries
├── models/               # MongoDB models
├── public/               # Static assets
├── styles/               # Global styles
└── utils/                # Utility functions
```

## Deployment

TaskFlow is optimized for deployment on platforms like Vercel, Netlify, or any other service that supports Next.js applications.

Example deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel
3. Configure your environment variables in the Vercel dashboard
4. Deploy your application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Google's Gemini AI](https://ai.google.dev/) for smart scheduling
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for drag-and-drop functionality
- [Chart.js](https://www.chartjs.org/) for data visualization 