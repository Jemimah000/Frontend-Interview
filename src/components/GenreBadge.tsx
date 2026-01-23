import type { Genre } from '@/types/blog';
import { cn } from '@/lib/utils';

interface GenreBadgeProps {
  genre: Genre;
  className?: string;
}

const genreLabels: Record<Genre, string> = {
  suspense: 'Suspense',
  romance: 'Romance',
  thriller: 'Thriller',
  action: 'Action',
  horror: 'Horror',
};

export const GenreBadge = ({ genre, className }: GenreBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border uppercase tracking-wider',
        `genre-badge-${genre}`,
        className
      )}
    >
      {genreLabels[genre]}
    </span>
  );
};
