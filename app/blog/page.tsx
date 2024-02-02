import { BlogIndexPageComponent } from "@/components/app/blog-list-page"
import client from "@/tina/__generated__/client"

export default async function BlogIndexPage() {
  const result = await client.queries.postAndNavConnection()
  return <BlogIndexPageComponent {...result} />
}
