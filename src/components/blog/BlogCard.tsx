import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogCard({ blog, onClick }: any) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md"
      onClick={() => onClick(blog.id)}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex gap-2">
          {blog.category.map((cat: string) => (
            <Badge key={cat}>{cat}</Badge>
          ))}
        </div>

        <h3 className="font-semibold">{blog.title}</h3>
        <p className="text-sm text-muted-foreground">
          {blog.description}
        </p>
      </CardContent>
    </Card>
  )
}
