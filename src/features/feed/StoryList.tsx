import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const genreColors: Record<string, string> = {
  HORROR: "bg-red-100 text-red-700",
  COMEDY: "bg-yellow-100 text-yellow-700",
  ROMANCE: "bg-pink-100 text-pink-700",
  SUSPENSE: "bg-purple-100 text-purple-700",
};

export function StoryList({ onSelect, activeId }: any) {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: () => axios.get('http://localhost:3000/blogs').then(res => res.data)
  });

  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading library...</div>;

  return (stories.map((story: any) => (
    <div 
      key={story.id}
      onClick={() => onSelect(story.id)}
      className={`p-6 border-b cursor-pointer transition-all hover:bg-slate-50 ${activeId === story.id ? 'bg-indigo-50/50 border-r-4 border-r-indigo-500' : ''}`}
    >
      <div className="flex gap-2 mb-3">
        {story.category.map((cat: string) => (
          <span key={cat} className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${genreColors[cat] || 'bg-gray-100'}`}>
            {cat}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-bold mb-1 leading-tight">{story.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 italic">"{story.description}"</p>
      <div className="mt-4 flex items-center text-xs text-slate-400 gap-3 font-sans">
        <span>{story.readTime || '3 min'} read</span>
        <span>•</span>
        <span>{new Date(story.date).toLocaleDateString()}</span>
      </div>
    </div>
  )));
}