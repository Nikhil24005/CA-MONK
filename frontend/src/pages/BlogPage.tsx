import { useState } from 'react';
import { useBlogs, useBlog, useDeleteBlog } from '@/hooks/useBlogs';
import { BlogCard } from '@/components/BlogCard';
import { BlogDetail } from '@/components/BlogDetail';
import { BlogForm } from '@/components/BlogForm';
import { BlogListSkeleton, BlogDetailSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Plus, Menu, X } from 'lucide-react';

// Main blog app - displays articles, handles creation and deletion
export const BlogPage = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load all blogs
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useBlogs();

  // Load selected blog details
  const { data: selectedBlog, isLoading: blogLoading } = useBlog(selectedBlogId);

  // Delete blog
  const { mutate: deleteBlogMutation, isPending: isDeleting } = useDeleteBlog();

  // Delete blog and clear selection
  const handleDeleteBlog = (blogId: string) => {
    deleteBlogMutation(blogId, {
      onSuccess: () => {
        setSelectedBlogId(null);
      },
    });
  };

  // Toggle blog selection - open or close
  const handleBlogClick = (blogId: string) => {
    // Close if already selected, otherwise open
    if (selectedBlogId === blogId) {
      setSelectedBlogId(null);
    } else {
      setSelectedBlogId(blogId);
      setShowCreateForm(false);
    }
  };

  // Show new blog form
  const handleCreateClick = () => {
    setShowCreateForm(true);
    setSelectedBlogId(null);
  };

  // Close form after successful creation
  const handleCreateSuccess = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-brrom-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => {
                setSelectedBlogId(null);
                setShowCreateForm(false);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <span className="text-white font-bold text-xs md:text-sm">CM</span>
              </div>
              <span className="font-bold text-lg md:text-xl bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CA MONK</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Tools</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Practice</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Events</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Job Board</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Points</a>
              <Button className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105" size="sm">Profile</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-in slide-in-from-top">
              <div className="flex flex-col gap-4">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2">Tools</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2">Practice</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2">Events</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2">Job Board</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2">Points</a>
                <Button className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all duration-300 w-full" size="sm">Profile</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-white drop-shadow-2xl">CA Monk Blog</h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light px-4">
            ✨ Discover insights on finance, accounting, and career growth
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12 flex-1">
        {/* Create Form Section */}
        {showCreateForm && (
          <div className="mb-6">
            <BlogForm onSuccess={handleCreateSuccess} />
          </div>
        )}

        {!showCreateForm && (
          <>
            {/* MOBILE/TABLET VIEW - Articles with inline details */}
            <div className="lg:hidden">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Latest Articles</h2>
                <Button onClick={handleCreateClick} size="sm" className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 gap-2 transition-all duration-300 hover:scale-105">
                  <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">New</span>
                </Button>
              </div>

              {blogsLoading && <BlogListSkeleton />}

              {blogsError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  <p className="font-semibold">Error loading blogs</p>
                  <p className="text-sm">{blogsError.message}</p>
                </div>
              )}

              {blogs && blogs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No blogs found. Create your first blog post!</p>
                </div>
              )}

              {/* Articles with inline details for mobile/tablet */}
              <div className="space-y-4">
                {blogs?.map((blog) => (
                  <div key={blog.id}>
                    <BlogCard
                      blog={blog}
                      isSelected={selectedBlogId === blog.id}
                      onClick={() => handleBlogClick(blog.id)}
                    />
                    
                    {/* Show detail right after the selected card on mobile */}
                    {selectedBlogId === blog.id && (
                      <div className="mt-4 animate-in slide-in-from-top">
                        {blogLoading && <BlogDetailSkeleton />}
                        {selectedBlog && <BlogDetail blog={selectedBlog} onDelete={handleDeleteBlog} isDeleting={isDeleting} />}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!selectedBlogId && blogs && blogs.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-gray-100 mt-6">
                  <p className="text-gray-600 text-base">Click on any article to read</p>
                </div>
              )}
            </div>

            {/* DESKTOP VIEW - Sidebar + Detail layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Left Sidebar - Latest Articles */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Latest Articles</h2>
                    <Button onClick={handleCreateClick} size="sm" className="bg-linear-to-rrom-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 gap-2 transition-all duration-300 hover:scale-105">
                      <Plus className="h-4 w-4" />
                      New
                    </Button>
                  </div>

                  {blogsLoading && <BlogListSkeleton />}

                  {blogsError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                      <p className="font-semibold">Error loading blogs</p>
                      <p className="text-sm">{blogsError.message}</p>
                    </div>
                  )}

                  {blogs && blogs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No blogs found. Create your first blog post!</p>
                    </div>
                  )}

                  {/* Blog List */}
                  <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                    {blogs?.map((blog) => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        isSelected={selectedBlogId === blog.id}
                        onClick={() => handleBlogClick(blog.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="lg:col-span-7">
                {selectedBlogId && (
                  <>
                    {blogLoading && <BlogDetailSkeleton />}
                    {selectedBlog && <BlogDetail blog={selectedBlog} onDelete={handleDeleteBlog} isDeleting={isDeleting} />}
                  </>
                )}

                {!selectedBlogId && blogs && blogs.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center shadow-xl border border-gray-100">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-linear-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-5xl">📰</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Welcome to CA Monk Blog</h3>
                      <p className="text-gray-600 mb-2 text-lg">Click on any article to read</p>
                      <p className="text-gray-500 text-lg">or click "New" to create a new post</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-linear-to-br from-gray-900 via-indigo-950 to-purple-950 text-gray-300 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
          {/* Mobile layout - 2 column */}
          <div className="md:hidden grid grid-cols-2 gap-6 mb-6">
            {/* Left Column - Brand & Follow */}
            <div className="space-y-4">
              {/* Brand - Phone */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-linear-to-br from-indigo-500 to-purple-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CM</span>
                  </div>
                  <span className="font-bold text-sm bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CA MONK</span>
                </div>
                <p className="text-xs leading-relaxed text-gray-400">
                  Empowering the next generation.
                </p>
              </div>

              {/* Connect - Phone */}
              <div className="text-center border-t border-gray-800 pt-4">
                <h3 className="font-bold text-white mb-2 text-xs tracking-wider">FOLLOW US</h3>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-gray-400 hover:text-white text-xs">in</a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-gray-400 hover:text-white text-xs">𝕏</a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-gray-400 hover:text-white text-xs">📷</a>
                </div>
              </div>
            </div>

            {/* Right Column - Resources & Platform */}
            <div className="space-y-4">
              {/* Resources - Phone */}
              <div className="text-center">
                <h3 className="font-bold text-white mb-2 text-xs tracking-wider">RESOURCES</h3>
                <ul className="space-y-1 text-xs">
                  <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-all duration-300">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-all duration-300">Webinars</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-all duration-300">Case Studies</a></li>
                </ul>
              </div>

              {/* Platform - Phone */}
              <div className="text-center border-t border-gray-800 pt-4">
                <h3 className="font-bold text-white mb-2 text-xs tracking-wider">PLATFORM</h3>
                <ul className="space-y-1 text-xs">
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300">Job Board</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300">Practice Tests</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300">Mentorship</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop layout - grid */}
          <div className="hidden md:grid grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CM</span>
                </div>
                <span className="font-bold text-white">CA MONK</span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold text-white mb-4">PLATFORM</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-white mb-4">CONNECT</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-4">
            <p>© 2026 CA Monk. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
