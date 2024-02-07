"use client"

import { PageNavAndThemeQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

import { FeaturedReading } from "@/components/blog-list"
import { FeatureList } from "@/components/features"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { WelcomeHero } from "@/components/welcome-hero"
import TodosList from "@/components/todos-list"

export function PageComponent(props: {
  data: PageNavAndThemeQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)

  return (
    <>
      <SiteHeader nav={data.nav} theme={data.theme} />
      {data.page.blocks?.map((block, i) => {
        switch (block?.__typename) {
          case "PageBlocksWelcomeHero": {
            return <WelcomeHero {...block} />
          }
          case 'PageBlocksFeatureList': {
            return <FeatureList key={i} {...block} />
          }
          case 'PageBlocksFeaturedReading': {
            // @ts-expect-error something went wrong
            return <FeaturedReading key={i} {...block} />
          }
          case 'PageBlocksTodosList': {
            return <TodosList key={i} {...block} />
          }
        }
      })}
      <Footer />
    </>
  )
}
