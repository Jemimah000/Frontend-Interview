import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "../../api/blogs"
import BlogCard from "./BlogCard"
import LoadingSkeleton from "./LoadingSkeleton"

export default function BlogList({ onSelect }: any) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })

  if (isLoading) return <LoadingSkeleton />
  if (error) return <p className="text-red-500">Error loading blogs</p>

  return (
    <div className="space-y-4">
      {data.map((blog: any) => (
        <BlogCard key={blog.id} blog={blog} onClick={onSelect} />
      ))}
    </div>
  )
}
