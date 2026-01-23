import { useState } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { useBlog } from '@/hooks/useBlogs';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const { data: selectedBlog, isLoading } = useBlog(selectedBlogId);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Panel - Blog List */}
        <div
          className={cn(
            'w-full md:w-[450px] lg:w-[500px] border-r border-border flex-shrink-0',
            'transition-all duration-300',
            selectedBlogId && 'hidden md:flex md:flex-col'
          )}
        >
          <BlogList
            selectedId={selectedBlogId}
            onSelectBlog={setSelectedBlogId}
          />
        </div>
        
        {/* Right Panel - Blog Detail */}
        <div
          className={cn(
            'flex-1 bg-background',
            !selectedBlogId && 'hidden md:block'
          )}
        >
          <BlogDetail
            blog={selectedBlog}
            isLoading={isLoading}
            onBack={() => setSelectedBlogId(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
