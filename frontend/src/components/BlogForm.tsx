import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBlog } from '@/hooks/useBlogs';
import type { CreateBlogInput } from '@/api/blogs';
import { Plus, X } from 'lucide-react';

interface BlogFormProps {
  onSuccess?: () => void;
}

// Form to create new blog articles
export const BlogForm = ({ onSuccess }: BlogFormProps) => {
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    category: [],
    description: '',
    coverImage: '',
    content: '',
  });
  const [categoryInput, setCategoryInput] = useState('');

  const createBlogMutation = useCreateBlog();

  // Update form fields as user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add category tag
  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, categoryInput.trim().toUpperCase()],
      }));
      setCategoryInput('');
    }
  };

  // Remove category tag
  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat !== categoryToRemove),
    }));
  };

  // Submit form and create blog
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.description || !formData.content || formData.category.length === 0) {
      alert('Please fill in all required fields and add at least one category');
      return;
    }

    // Submit the blog post
    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          title: '',
          category: [],
          description: '',
          coverImage: '',
          content: '',
        });
        onSuccess?.();
      },
      onError: (error) => {
        console.error('Error creating blog:', error);
        alert('Failed to create blog post. Please try again.');
      },
    });
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
        <p className="text-sm text-muted-foreground">Share your insights with the CA Monk community</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Article Title *
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              required
              className="text-lg"
            />
          </div>

          {/* Category Input */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold mb-2">
              Categories *
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                id="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="e.g., FINANCE, TECH, CAREER"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <Button type="button" onClick={handleAddCategory} size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {/* Display added categories */}
            <div className="flex flex-wrap gap-2">
              {formData.category.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 flex items-center gap-2"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Brief Description *
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A short summary that will appear in the blog list..."
              rows={3}
              required
            />
          </div>

          {/* Cover Image URL Input */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-semibold mb-2">
              Cover Image URL
            </label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended size: 1200x600px for best results
            </p>
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold mb-2">
              Article Content *
            </label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your full article content here... Use double line breaks for paragraphs."
              rows={15}
              required
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tip: Use clear paragraphs and section headings for better readability
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              disabled={createBlogMutation.isPending}
            >
              {createBlogMutation.isPending ? 'Publishing...' : 'Publish Article'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (confirm('Are you sure you want to discard this draft?')) {
                  setFormData({
                    title: '',
                    category: [],
                    description: '',
                    coverImage: '',
                    content: '',
                  });
                  onSuccess?.();
                }
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
