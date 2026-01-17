import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Blog } from '@/api/blogs';
import { Share2, ThumbsUp, Bookmark, Trash2 } from 'lucide-react';

interface BlogDetailProps {
  blog: Blog;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

// Full article display with content, metadata, and actions
export const BlogDetail = ({ blog, onDelete, isDeleting = false }: BlogDetailProps) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      onDelete?.(blog.id);
    }
  };
  // Format date nicely
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Estimate read time (200 words/min)
  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 p-4 md:p-8 lg:p-12">
      {/* Cover Image */}
      <div className="w-full overflow-hidden rounded-xl md:rounded-2xl mb-6 md:mb-8 shadow-xl relative group">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 sm:h-64 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Category and read time */}
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 flex-wrap">
        <span className="text-xs md:text-sm font-bold text-white bg-linear-to-rrom-indigo-600 to-purple-600 px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/30">
          {blog.category[0]}
        </span>
        <span className="text-xs md:text-sm text-gray-600 font-medium">⏱️ {readTime} min read</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-8 leading-tight bg-linear-to-rrom-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        {blog.title}
      </h1>

      {/* Share Button */}
      <Button className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 mb-8 md:mb-10 gap-2 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
        <Share2 className="w-4 h-4" />
        Share Article
      </Button>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
        <div className="bg-linear-to-br from-indigo-50 to-purple-50 p-4 md:p-5 rounded-xl border border-indigo-100 shadow-md">
          <p className="text-xs text-indigo-600 uppercase mb-2 font-bold tracking-wide">CATEGORY</p>
          <p className="font-bold text-gray-900 text-sm md:text-base">{blog.category.join(' & ')}</p>
        </div>
        <div className="bg-linear-to-br from-purple-50 to-pink-50 p-4 md:p-5 rounded-xl border border-purple-100 shadow-md">
          <p className="text-xs text-purple-600 uppercase mb-2 font-bold tracking-wide">READ TIME</p>
          <p className="font-bold text-gray-900 text-sm md:text-base">{readTime} Mins</p>
        </div>
        <div className="bg-linear-to-br from-pink-50 to-rose-50 p-4 md:p-5 rounded-xl border border-pink-100 shadow-md">
          <p className="text-xs text-pink-600 uppercase mb-2 font-bold tracking-wide">DATE</p>
          <p className="font-bold text-gray-900 text-sm md:text-base">{formattedDate}</p>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 md:mb-12">
        {blog.content.split('\n\n').map((section, index) => {
          // Check if it's a heading (simple heuristic)
          if (section.length < 100 && !section.includes('.')) {
            return (
              <h2 key={index} className="text-xl sm:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4">
                {section}
              </h2>
            );
          }
          
          // Check if it's a quote (starts with quotation mark)
          if (section.startsWith('"') || section.startsWith('"')) {
            return (
              <blockquote key={index} className="border-l-4 border-indigo-600 pl-6 py-5 my-8 italic bg-linear-to-br from-indigo-50 to-purple-50 rounded-r-xl shadow-lg">
                <p className="text-gray-800 text-lg">{section}</p>
              </blockquote>
            );
          }

          // Regular paragraph
          return (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {section}
            </p>
          );
        })}
      </div>

      {/* Author Section */}
      <Card className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-100 shadow-xl">
        <CardContent className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 text-center sm:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-lg shadow-indigo-500/50">
                AM
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base md:text-lg">Written by Arjun Mehta</p>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Senior Financial Analyst</p>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3">
              <Button variant="outline" size="icon" className="hover:bg-linear-to-br hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:scale-110 shadow-md">
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-linear-to-br hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 transition-all duration-300 hover:scale-110 shadow-md">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleDelete}
                disabled={isDeleting}
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 hover:scale-110 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
