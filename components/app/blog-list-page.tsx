'use client'

import { BlogList } from "@/components/blog-list"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { PostAndNavConnectionQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

export function BlogIndexPageComponent(props: {
  data: PostAndNavConnectionQuery
  variables: {}
  query: string
}) {
  const { data } = useTina(props)
  return (
    <>
      <SiteHeader nav={data.nav} theme={data.theme} />
      <div className="bg-muted">
        <div className="container flex flex-col gap-8 py-8">
          <BlogList {...data} />
        </div>
      </div>
      <Footer />
    </>
  )
}
