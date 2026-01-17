import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Blog } from '@/api/blogs';
import { TrendingUp, Briefcase, FileText, Brain } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
}

// Article preview card shown in sidebar
export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
  // Convert date to human-readable format (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffDays === 0 && diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return '1 week ago';
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    return date.toLocaleDateString();
  };

  // Get icon for category
  const getCategoryIcon = () => {
    const category = blog.category[0]?.toLowerCase();
    if (category?.includes('finance') || category?.includes('tech')) return TrendingUp;
    if (category?.includes('career')) return Briefcase;
    if (category?.includes('regulation')) return FileText;
    return Brain;
  };

  // Get tag label
  const getTagLabel = () => {
    const category = blog.category[0]?.toLowerCase();
    if (category?.includes('finance')) return 'Featured';
    if (category?.includes('career')) return 'Study Tips';
    if (category?.includes('regulation')) return 'Taxation';
    return 'Development';
  };

  const Icon = getCategoryIcon();

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 border-2 group ${
        isSelected 
          ? 'border-indigo-500 bg-linear-to-br from-indigo-50 to-purple-50 shadow-xl shadow-indigo-500/30' 
          : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-indigo-300'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        {/* Category icon and time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-indigo-600 uppercase font-bold">
            <div className="p-1.5 bg-linear-to-br from-indigo-500 to-purple-500 rounded-lg shadow-md">
              <Icon className="w-3.5 h-3.5 text-white" />
            </div>
            <span>{blog.category[0]}</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">{getRelativeTime(blog.date)}</span>
        </div>
        
        {/* Blog title */}
        <CardTitle className="text-lg font-bold leading-tight mb-3 group-hover:text-indigo-600 transition-colors">
          {blog.title}
        </CardTitle>
        
        {/* Blog description */}
        <CardDescription className="text-sm leading-relaxed line-clamp-2">
          {blog.description}
        </CardDescription>
      </CardHeader>

      {/* Tag */}
      <CardContent className="pt-0">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md">
          {getTagLabel()}
        </span>
      </CardContent>
    </Card>
  );
};
