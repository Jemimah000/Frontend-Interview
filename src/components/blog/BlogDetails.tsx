import { useQuery } from "@tanstack/react-query"
import { getBlogById } from "@/api/blogs"
import type { Blog } from "@/types/blogs"
import { Card } from "@/components/ui/card"

interface Props {
  blogId: number | null
}

export default function BlogDetail({ blogId }: Props) {
  const { data, isLoading, isError } = useQuery<Blog>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId as number),
    enabled: !!blogId,
  })

  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 border border-gray-200 rounded">
        <p className="text-gray-500 text-center">Select a blog from the list to read its content</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Card className="p-6 space-y-4 animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </Card>
    )
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded text-red-700">
        Error loading blog details. Please try again.
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded text-gray-600">
        Blog not found.
      </div>
    )
  }

  return (
    <Card className="p-6 bg-white border border-gray-200">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      
      <div className="space-y-4">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          {data.category}
        </p>
        
        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{data.date || "N/A"}</span>
        </div>
        
        <p className="text-gray-600 text-sm">{data.description}</p>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {data.content}
          </p>
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}