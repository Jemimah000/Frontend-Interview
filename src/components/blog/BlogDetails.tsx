import { useQuery } from "@tanstack/react-query"
import { getBlogById } from "../../api/blogs"

export default function BlogDetail({ blogId }: any) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
    enabled: !!blogId,
  })

  if (!blogId) return <p>Select a blog</p>
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading blog</p>

  return (
    <div>
      <img
        src={data.coverImage}
        className="rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-gray-600 mt-2">{data.content}</p>
    </div>
  )
}
