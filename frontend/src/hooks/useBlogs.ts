import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlogs, fetchBlogById, createBlog, deleteBlog } from '@/api/blogs';
import type { CreateBlogInput } from '@/api/blogs';

// Fetch all blogs from server
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Fetch single blog by ID (only if ID exists)
export const useBlog = (id: string | null) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id, // Skip if no ID
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Create new blog and refresh list
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: CreateBlogInput) => createBlog(blog),
    onSuccess: () => {
      // Refresh blog list after creation
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

// Delete blog and refresh list
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: (_, id) => {
      // Clear cache and refresh list
      queryClient.removeQueries({ queryKey: ['blog', id] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
