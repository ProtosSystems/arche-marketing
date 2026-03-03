import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import { RequestAccessForm } from '@/components/sections/request-access-form'

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <RequestAccessForm />
      </Main>

      <SiteFooter />
    </>
  )
}
