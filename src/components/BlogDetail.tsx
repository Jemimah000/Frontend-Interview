import type { Blog } from '@/types/blog';
import { useBlogs } from '@/hooks/useBlogs';
import { GenreBadge } from './GenreBadge';
import { Clock, Calendar, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogDetailProps {
  blog: Blog | null | undefined;
  isLoading: boolean;
  onBack: () => void;
  onSelect: (id: string) => void;
}

export const BlogDetail = ({ blog, isLoading, onBack, onSelect }: BlogDetailProps) => {
  const { data: blogs } = useBlogs();

  const handleBrowseClick = () => {
    if (blogs && blogs.length > 0) {
      onSelect(blogs[0].id);
    }
  };

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  // --- WELCOME SCREEN (NO BLOG SELECTED) ---
  if (!blog) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden bg-[#020617]">
        
        {/* Background Decorative Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(#38bdf8 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
          />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-md">
          {/* Rotating Logo Border */}
          <div className="mb-10 relative mx-auto w-28 h-28 group">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-transparent to-cyan-400 animate-spin-slow opacity-80 blur-[2px]" />
            <div className="absolute inset-[2px] bg-slate-950 rounded-[22px] flex items-center justify-center z-10">
              <BookOpen className="w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]" strokeWidth={1.2} />
            </div>
            <div className="absolute -right-2 -top-2 w-10 h-10 bg-slate-900 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-lg transform rotate-12 animate-bounce z-20">
              <Sparkles className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
            </div>
          </div>

          <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
              Hidden <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Ink</span>
          </h3>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed italic max-w-sm mx-auto font-serif">
            "Every secret has a story, and every story leaves a mark."
          </p>

          <Button 
            onClick={handleBrowseClick}
            variant="outline" 
            className="rounded-full px-10 py-7 border-blue-500/30 bg-blue-500/5 backdrop-blur-md transition-all duration-500 group text-white hover:text-white hover:bg-blue-500/20 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
          >
             <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform text-blue-400" />
             Begin the Journey
          </Button>
        </div>
      </div>
    );
  }

  // --- ACTUAL BLOG CONTENT VIEW ---
  return (
    <article className="h-full overflow-y-auto animate-fade-in custom-scrollbar bg-[#020617] text-slate-200">
      {/* Hero Header */}
      <div className="relative h-80 md:h-[500px]">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-6 left-6 md:hidden bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto w-full">
          <GenreBadge genre={blog.genre} className="mb-6 genre-badge-thriller" />
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-sans uppercase tracking-widest font-semibold">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{blog.readTime} MIN READ</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Author Card */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 mb-12 shadow-xl">
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/20"
          />
          <div>
            <h4 className="font-sans text-lg font-bold text-white">
              {blog.author.name}
            </h4>
            <p className="text-slate-400 text-sm italic">
              {blog.author.bio}
            </p>
          </div>
        </div>
        
        {/* Story Text */}
        <div className="prose prose-invert prose-blue max-w-none">
          {/* Summary Quote */}
          <p className="text-xl text-blue-100/80 italic mb-12 border-l-4 border-blue-500 pl-8 py-2 bg-blue-500/5 rounded-r-lg">
            {blog.description}
          </p>
          
          <div className="text-slate-300 leading-[1.8] space-y-8 font-serif text-lg md:text-xl whitespace-pre-wrap">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-blue-400 first-letter:mr-3 first-letter:float-left first-letter:mt-1">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* The End Decoration */}
        <div className="mt-20 flex flex-col items-center gap-4 opacity-30">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <span className="font-serif italic text-sm tracking-widest">Fin</span>
        </div>
      </div>
    </article>
  );
};

const BlogDetailSkeleton = () => (
  <div className="h-full bg-[#020617] overflow-y-auto">
    <Skeleton className="h-80 md:h-[500px] w-full rounded-none bg-slate-900" />
    <div className="max-w-3xl mx-auto p-8 md:p-16 space-y-8">
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
        <Skeleton className="w-14 h-14 rounded-full bg-slate-800" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32 bg-slate-800" />
          <Skeleton className="h-4 w-full bg-slate-800" />
        </div>
      </div>
      <Skeleton className="h-6 w-full bg-slate-900" />
      <Skeleton className="h-6 w-5/6 bg-slate-900" />
      <Skeleton className="h-6 w-full bg-slate-900" />
    </div>
  </div>
);