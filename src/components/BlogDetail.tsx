import { Blog } from '@/types/blog';
import { GenreBadge } from './GenreBadge';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogDetailProps {
  blog: Blog | null | undefined;
  isLoading: boolean;
  onBack: () => void;
}

export const BlogDetail = ({ blog, isLoading, onBack }: BlogDetailProps) => {
  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <span className="text-4xl">📖</span>
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Select a Story
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Choose a story from the list to begin your reading journey
        </p>
      </div>
    );
  }

  return (
    <article className="h-full overflow-y-auto animate-fade-in">
      <div className="relative h-72 md:h-96">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-4 left-4 md:hidden bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <GenreBadge genre={blog.genre} className="mb-4" />
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 lg:p-12">
        {/* Author Section */}
        <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border mb-8">
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground">
              {blog.author.name}
            </h4>
            <p className="text-muted-foreground text-sm mt-1">
              {blog.author.bio}
            </p>
          </div>
        </div>
        
        {/* Story Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-lg text-muted-foreground italic mb-8 border-l-4 border-primary pl-6">
            {blog.description}
          </p>
          
          <div className="text-foreground/90 leading-relaxed space-y-6 font-body">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const BlogDetailSkeleton = () => (
  <div className="h-full overflow-y-auto">
    <Skeleton className="h-72 md:h-96 w-full rounded-none" />
    <div className="p-6 md:p-8 lg:p-12 space-y-8">
      <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
    </div>
  </div>
);
