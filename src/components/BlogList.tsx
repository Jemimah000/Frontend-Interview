import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton } from './BlogCardSkeleton';
import { CreateBlogForm } from './CreateBlogForm';
import { Genre } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Story<span className="text-gradient">Vault</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Discover captivating short stories
            </p>
          </div>
          <CreateBlogForm />
        </div>
        
        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre.value}
              variant={activeGenre === genre.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveGenre(genre.value)}
              className="rounded-full"
            >
              {genre.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Blog Cards */}
      <div className="flex-1 overflow-y-auto p-6">
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Failed to load stories. Please try again later.</p>
          </div>
        )}
        
        <div className="grid gap-6">
          {isLoading && (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          )}
          
          {filteredBlogs?.map((blog, index) => (
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
          ))}
          
          {!isLoading && filteredBlogs?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No stories found in this genre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
