import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton } from './BlogCardSkeleton';
import { CreateBlogForm } from './CreateBlogForm';
import type { Genre } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { AlertCircle, PenTool } from 'lucide-react'; // Changed to PenTool

interface BlogListProps {
  selectedId: string | null;
  onSelectBlog: (id: string) => void;
}

const genres: { value: Genre | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'suspense', label: 'Suspense' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'action', label: 'Action' },
  { value: 'horror', label: 'Horror' },
];

export const BlogList = ({ selectedId, onSelectBlog }: BlogListProps) => {
  const { data: blogs, isLoading, error } = useBlogs();
  const [activeGenre, setActiveGenre] = useState<Genre | 'all'>('all');

  const filteredBlogs = blogs?.filter(
    (blog) => activeGenre === 'all' || blog.genre === activeGenre
  );

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header with New Branding */}
      <div className="p-8 border-b border-border bg-gradient-to-b from-background to-card">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary rounded-xl shadow-glow">
              <PenTool className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black tracking-tighter uppercase leading-none">
                Hidden <span className="text-primary">Ink.</span>
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium mt-1">
                The Untold Stories
              </p>
            </div>
          </div>
          <CreateBlogForm />
        </div>
        
        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre.value}
              variant={activeGenre === genre.value ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveGenre(genre.value)}
              className={`rounded-full px-4 transition-all duration-300 ${
                activeGenre === genre.value ? 'shadow-glow' : 'hover:bg-accent/20'
              }`}
            >
              {genre.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Scrollable Story Feed */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Failed to retrieve the ink. Please try again.</p>
          </div>
        )}
        
        <div className="grid gap-6">
          {isLoading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            filteredBlogs?.map((blog, index) => (
              <div
                key={blog.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard
                  blog={blog}
                  isSelected={blog.id === selectedId}
                  onClick={() => onSelectBlog(blog.id)}
                />
              </div>
            ))
          )}
          
          {!isLoading && filteredBlogs?.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                 <PenTool className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="text-muted-foreground italic font-serif">No ink has been spilled in this genre yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};