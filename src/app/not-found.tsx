import { Link } from '@/components/elements/link'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <HeroSimpleCentered
          headline="Page not found"
          subheadline={<p>Sorry, but the page you were looking for could not be found.</p>}
          cta={
            <Link href="/">
              Go back home <ArrowNarrowRightIcon />
            </Link>
          }
        />
      </Main>

      <SiteFooter />
    </>
  )
}
