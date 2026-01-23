import type { Blog } from '@/types/blog';
import { useBlogs } from '@/hooks/useBlogs'; // 1. Import the hook
import { GenreBadge } from './GenreBadge';
import { Clock, Calendar, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogDetailProps {
  blog: Blog | null | undefined;
  isLoading: boolean;
  onBack: () => void;
  onSelect: (id: string) => void; // 2. New prop to handle selection
}

export const BlogDetail = ({ blog, isLoading, onBack, onSelect }: BlogDetailProps) => {
  // 3. Fetch blogs to find the first one
  const { data: blogs } = useBlogs();

  // 4. Function to navigate to the first story
  const handleBrowseClick = () => {
    if (blogs && blogs.length > 0) {
      onSelect(blogs[0].id);
    }
  };

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  // Welcome Screen
  if (!blog) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden bg-slate-950">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient from-primary/5 to-transparent blur-3xl pointer-events-none" />


        <div className="relative z-10 max-w-md">
          
          {/* Animated Icon */}
          <div className="mb-10 relative mx-auto w-24 h-24 group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-transparent via-primary/80 to-transparent opacity-75 blur-sm animate-spin-slow" />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-bl from-transparent via-primary/40 to-transparent opacity-50 blur-md animate-spin-slow duration-500" />
            <div className="relative w-full h-full bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl flex items-center justify-center shadow-2xl z-10">
              <BookOpen className="w-10 h-10 text-primary drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" strokeWidth={1.5} />
            </div>
            <div className="absolute -right-3 -top-3 w-10 h-10 bg-background/80 backdrop-blur border border-border rounded-xl flex items-center justify-center shadow-lg transform rotate-12 animate-bounce delay-100 z-20">
              <Sparkles className="w-5 h-5 text-yellow-500/80" strokeWidth={1.5} />
            </div>
          </div>

          <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight drop-shadow-lg">
             Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">StoryVault</span>
          </h3>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed italic max-w-sm mx-auto">
            "Between these pages, entire worlds are waiting to be discovered."
          </p>

          <Button 
            onClick={handleBrowseClick} // 5. Attach the click handler
            variant="outline" 
            className="rounded-full px-8 py-6 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 group text-white hover:text-white"
          >
             <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
             Browse stories on the left
          </Button>
        </div>
      </div>
    );
  }

  // Existing Blog Content Layout
  return (
    <article className="h-full overflow-y-auto animate-fade-in custom-scrollbar">
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