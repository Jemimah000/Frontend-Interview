export interface Blog {
  id: number
  title: string
  category: string
  description: string
  content: string
  image: string
  date?: string
  tags?: string[]
}