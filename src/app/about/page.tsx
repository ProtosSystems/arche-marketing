import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import AboutSection from "@/components/sections/about-section";

export default function Page() {
  return (
    <>
        <SiteHeader />

      <Main>
        <AboutSection />
      </Main>

      <SiteFooter />
    </>
  )
}
