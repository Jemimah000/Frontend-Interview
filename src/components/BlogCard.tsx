import type { Blog } from '@/types/blog';
import { GenreBadge } from './GenreBadge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
  isSelected?: boolean;
  onClick: () => void;
}

export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
  return (
    <article
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-lg overflow-hidden bg-card transition-all duration-300 card-glow',
        'border border-border hover:border-primary/30',
        isSelected && 'ring-2 ring-primary border-primary'
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <GenreBadge genre={blog.genre} />
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {blog.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-border"
            />
            <span className="text-sm text-muted-foreground">{blog.author.name}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{blog.readTime} min</span>
          </div>
        </div>
      </div>
    </article>
  );
};
