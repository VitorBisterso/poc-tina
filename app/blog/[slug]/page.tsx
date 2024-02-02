import { BlogPageComponent } from "@/components/app/blog-page"
import client from "@/tina/__generated__/client"

export default async function BlogPage({
  params,
}: {
  params: { slug: string }
}) {
  const result = await client.queries.postAndNav({ relativePath: `${params.slug}.md` })

  return <BlogPageComponent {...result} />
}
