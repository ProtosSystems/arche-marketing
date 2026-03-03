import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <Main>{children}</Main>
      <SiteFooter />
    </>
  )
}
