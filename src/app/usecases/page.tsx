import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import UseCaseFinancialTruthOverTime from "@/components/sections/financial-truth";


export default function Page() {
    return (
        <>
            <SiteHeader />

            <Main>
                <UseCaseFinancialTruthOverTime />

            </Main>

            <SiteFooter />
        </>
    )
}
