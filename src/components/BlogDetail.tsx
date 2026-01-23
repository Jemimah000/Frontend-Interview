import type { Blog } from '@/types/blog';
import { GenreBadge } from './GenreBadge';
import { Clock, Calendar, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
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

  // 👇 UPDATED: Professional Empty State Design
  if (!blog) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md">
          {/* Stylized Icon Container */}
          <div className="mb-10 relative mx-auto w-24 h-24">
            {/* Glowing blur behind */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            
            {/* Main Book Icon Card */}
            <div className="relative w-full h-full bg-card border border-border rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-6 transition-transform hover:rotate-0 duration-700">
              <BookOpen className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            
            {/* Floating Sparkle Icon */}
            <div className="absolute -right-3 -top-3 w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center shadow-lg transform rotate-12 animate-bounce delay-100">
              <Sparkles className="w-5 h-5 text-yellow-500/80" strokeWidth={1.5} />
            </div>
          </div>

          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Welcome to StoryVault
          </h3>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Your escape into worlds unknown. Select a story from the sidebar to begin your reading journey.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium animate-pulse">
            <ArrowLeft className="w-4 h-4" />
            <span>Browse stories on the left</span>
          </div>
        </div>
      </div>
    );
  }

  // 👇 Existing Blog Content Layout
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