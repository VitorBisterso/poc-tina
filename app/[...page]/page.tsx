'use client'

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import client from "@/tina/__generated__/client"

import { PageComponent } from "@/components/app/page"

export default function GenericPage() {
   const [pageDetails, setPageDetails] = useState()
   const [hasError, setHasError] = useState(false)
   const pathname = usePathname()
   useEffect(() => {
      const fetchPage = async () => {
         client
            .queries
            .pageNavAndTheme({ relativePath: `${pathname.replaceAll('/', '')}.md` })
            .then((result) => setPageDetails(result as any))
            .catch(() => setHasError(true))
      }

      fetchPage()
   }, [pathname])


   if (hasError) {
      return <p>404</p>
   }

   return pageDetails ? <PageComponent {...pageDetails as any} /> : 'Loading'
}