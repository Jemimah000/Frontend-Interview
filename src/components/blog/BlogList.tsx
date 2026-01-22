import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "@/api/blogs"
import type { Blog } from "@/types/blogs"
import { Card } from "@/components/ui/card"

interface Props {
  onSelect: (id: number) => void
}

export default function BlogList({ onSelect }: Props) {
  const { data, isLoading, isError } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse bg-gray-100" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
        Error loading blogs. Please try again later.
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-600 text-sm text-center">
        No blogs yet. Create one to get started!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Latest Articles</h2>
      {data.map((blog) => (
        <Card
          key={blog.id}
          onClick={() => onSelect(blog.id)}
          className="p-4 cursor-pointer hover:shadow-md hover:bg-blue-50 transition-all border border-gray-200"
        >
          <div className="flex justify-between items-start mb-1">
            <p className="text-xs font-semibold text-blue-600 uppercase">{blog.category}</p>
            <p className="text-xs text-gray-500">{blog.date || "N/A"}</p>
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{blog.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.description}
          </p>
        </Card>
      ))}
    </div>
  )
}