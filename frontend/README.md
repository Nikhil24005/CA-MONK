# CA Monk Blog Application

A modern, responsive blog application built with React, Vite, and TanStack Query. Features a beautiful UI with Tailwind CSS and shadcn/ui components, paired with a JSON Server backend for data management.

## Features

- **Article Listing**: Browse all blog posts with preview cards showing title, category, and description
- **Article Details**: Click any article to view full content with cover image, metadata, and author information
- **Create Articles**: Add new blog posts with title, description, content, categories, and cover image
- **Delete Articles**: Remove articles with a confirmation dialog to prevent accidental deletion
- **Responsive Design**: Fully optimized for mobile and desktop screens
- **Real-time Updates**: Uses TanStack Query for efficient data fetching and automatic cache updates
- **Modern UI**: Gradient backgrounds, smooth animations, and clean card-based layout

## Tech Stack

- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.3.1
- **State Management**: TanStack Query 5.90.18
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React
- **Backend**: JSON Server 1.0.0-beta.3
- **Development**: Prettier for code formatting

## Installation

1. Clone or extract the project:
```bash
cd Frontend-Interview
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

The project requires two servers running simultaneously:

### Start the Frontend (Port 5173)
```bash
npm run dev
```

### Start the Backend (Port 3001) - In a separate terminal
```bash
npm run server
```

Once both servers are running, open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── blogs.ts              # API service for blog operations
├── components/
│   ├── BlogCard.tsx          # Article preview card component
│   ├── BlogDetail.tsx        # Full article view component
│   ├── BlogForm.tsx          # Form for creating new articles
│   └── LoadingSkeleton.tsx   # Loading placeholder animations
├── hooks/
│   └── useBlogs.ts           # Custom React hooks for data fetching
├── pages/
│   └── BlogPage.tsx          # Main page with layout and state management
├── App.tsx                   # Root app component
├── index.css                 # Global styles
└── main.tsx                  # Application entry point
```

## How to Use

### View Articles
- Open the app to see all blog articles in a responsive layout
- On mobile, articles stack vertically
- On desktop, articles appear in a sidebar with detail view on the right

### Read an Article
- Click any article card to view its full content
- See the cover image, author info, publication date, and full article text
- View estimated read time and article category

### Create a New Article
- Click the "Write New Article" button in the navigation
- Fill in the article details:
  - Title (required)
  - Description (required)
  - Content (required)
  - Categories (add multiple tags)
  - Cover image URL (optional)
- Click "Publish" to save the article

### Delete an Article
- While viewing an article, click the "Delete" button
- Confirm the deletion when prompted
- The article is immediately removed and the view updates

## Assignment Requirements

This project meets all assignment requirements:

- ✅ Create responsive web application with React
- ✅ Use Vite as build tool
- ✅ Implement TanStack Query for data fetching
- ✅ Style with Tailwind CSS
- ✅ Use shadcn/ui components
- ✅ Create API layer with Axios
- ✅ Display blog articles with listing view
- ✅ Show article details with full content
- ✅ Implement create article functionality
- ✅ Implement delete article functionality
- ✅ Responsive design for all screen sizes
- ✅ Use TypeScript throughout
- ✅ Proper state management with React hooks

## Development

### Code Style
The project uses Prettier for consistent code formatting. All comments are human-friendly and clear.

### Building for Production
```bash
npm run build
```

Output will be generated in the `dist/` folder.

### Viewing the Project
- Frontend: http://localhost:5173
- API: http://localhost:3001

## Notes

- The JSON Server uses `db.json` as the database file
- Sample blog data is included in `db.json` for testing
- All API calls are made to `http://localhost:3001`
- The frontend expects both servers to be running for full functionality

## License

This project is created for educational purposes as part of the CA Monk Frontend Interview assignment.
