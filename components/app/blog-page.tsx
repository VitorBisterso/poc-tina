'use client'

import Image from "next/image"

import { FeaturedReadingAlt } from "@/components/blog-list"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { PostAndNavQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

export function BlogPageComponent(props: {
  data: PostAndNavQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)

  return (
    <>
      <SiteHeader {...data.nav} />
      <div className="relative bg-muted">
        <div className="container relative z-10 flex flex-col py-8">
          <FeaturedReadingAlt post={data.post} />
        </div>
        <div className="absolute -inset-24 blur-lg">
          <Image
            fill={true}
            className="object-cover"
            alt=""
            src={data.post.image || ""}
          />
        </div>
      </div>
      <div className="relative bg-muted py-8 lg:py-24">
        <div className="mx-auto max-w-5xl px-8">
          <div className="prose max-w-none dark:prose-invert">
            <div data-tina-field={tinaField(data.post, 'author')}>
              <TinaMarkdown
                content={data.post.body}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
