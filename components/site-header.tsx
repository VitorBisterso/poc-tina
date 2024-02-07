import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BasicIcons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageNavAndThemeQuery } from "@/tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"

const social = [
  { handle: "llama-link", platform: "twitter" },
  { handle: "llama-link", platform: "github" },
]

type Props = {
  nav: PageNavAndThemeQuery['nav']
  theme: PageNavAndThemeQuery['theme']
}

export function SiteHeader({ nav, theme }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background"  style={{ backgroundColor: theme.backgroundColorHeader || '' }}>
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
          >
            <Image
              data-tina-field={tinaField(theme, 'defaultLogo')}
              width={150}
              height={32}
              style={{ maxWidth: 150, maxHeight: 32 }}
              alt="Company Logo"
              src={theme.defaultLogo || ''}
            />
          </Link>

          <div className="hidden md:block">
            <ul className="flex items-center gap-3 p-6">
              {nav.links?.map((link) => {
                return (
                  <li data-tina-field={link && tinaField(link, 'label')} key={link?.link} className="row-span-3">
                    <Link href={link?.link || ""}>
                      <Button variant="ghost">{link?.label}</Button>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Dialog>
            <DialogTrigger asChild className="block md:hidden">
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-center py-12 sm:max-w-[425px]">
              {nav.links?.map((link) => {
                return (
                  <Link key={link?.link} href={link?.link || ""}>
                    <Button variant="ghost" className="w-full text-lg">
                      {link?.label}
                    </Button>
                  </Link>
                )
              })}
              <DialogFooter>
                <SecondaryMenu className="flex w-full justify-center md:hidden" />
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SecondaryMenu className="hidden md:flex" />
        </div>
      </div>
    </header>
  )
}

export function SecondaryMenu(props: { className?: string }) {
  return (
    <nav className={`${props.className} items-center space-x-1`}>
      {social.map((item) => {
        const platformName = item?.platform as unknown as "github" | "twitter"
        const platformLinks = {
          github: "https://github.com",
          twitter: "https://twitter.com",
        }
        const platformLink = platformLinks[platformName]
        const Icon = BasicIcons[platformName]
        return (
          <Link
            key={`${platformLink}/${item?.handle}`}
            href={`${platformLink}/${item?.handle}`}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              <Icon className="h-5 w-5 fill-current" />
              <span className="sr-only">{item?.platform}</span>
            </div>
          </Link>
        )
      })}
      <ThemeToggle />
    </nav>
  )
}
