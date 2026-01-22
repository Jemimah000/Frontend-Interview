import { Card, CardContent } from "@/components/ui/card"
import { Blog } from "@/api/blogs"

export default function BlogCard({
  blog,
  onClick,
}: {
  blog: Blog
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition"
    >
      <CardContent className="p-4 space-y-2">
        <span className="text-xs text-blue-600 font-semibold">
          {blog.category}
        </span>
        <h3 className="font-semibold">{blog.title}</h3>
        <p className="text-sm text-slate-600">{blog.description}</p>
      </CardContent>
    </Card>
  )
}
