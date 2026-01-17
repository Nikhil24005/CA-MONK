import axios from 'axios';

// JSON Server running locally
const API_BASE_URL = 'http://localhost:3001';

// API client setup
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Blog data structure
export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

// Data for creating new blog
export interface CreateBlogInput {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}

// Get all blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await apiClient.get<Blog[]>('/blogs');
  return response.data;
};

// Get single blog by ID
export const fetchBlogById = async (id: string): Promise<Blog> => {
  const response = await apiClient.get<Blog>(`/blogs/${id}`);
  return response.data;
};

// Create new blog post
export const createBlog = async (blog: CreateBlogInput): Promise<Blog> => {
  // Add current date
  const newBlog = {
    ...blog,
    date: new Date().toISOString(),
  };
  
  const response = await apiClient.post<Blog>('/blogs', newBlog);
  return response.data;
};

// Delete blog by ID
export const deleteBlog = async (id: string): Promise<void> => {
  await apiClient.delete(`/blogs/${id}`);
};
