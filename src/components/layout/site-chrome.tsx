import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ChevronIcon } from '@/components/icons/chevron-icon'
// import { GitHubIcon } from '@/components/icons/social/github-icon'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
// import { XIcon } from '@/components/icons/social/x-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'

export function SiteHeader() {
  return (
    <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      links={
        <>
          <NavbarLink href="/usecases">Use Case</NavbarLink>
          <NavbarLink href="/pricing">Pricing</NavbarLink>
          <NavbarLink href="https://docs.arche.fi">Docs</NavbarLink>
          <NavbarLink href="/about">About</NavbarLink>
          {/* <NavbarLink href="https://app.arche.fi" className="sm:hidden">
            Log in
          </NavbarLink> */}
        </>
      }
      logo={
        <NavbarLogo href="/">
          <span className="h3 text-2xl font-regular tracking-tight text-primary dark:text-white">
            <span className="mr-[1px]">⍺</span>rche
          </span>
        </NavbarLogo>
      }
      actions={
        <>
          {/* <PlainButtonLink href="https://app.arche.fi" className="max-sm:hidden">
            Log in
          </PlainButtonLink> */}
          {/* <ButtonLink href="#">Get started</ButtonLink> */}
          <ButtonLink href="/request-access">Request access</ButtonLink>
        </>
      }
    />
  )
}

export function SiteFooter() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      topCta={
        <div className="flex flex-col items-center gap-6 pb-10 text-center">
          <div className="flex max-w-3xl flex-col gap-2">
            <p className="text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
              Evaluate Arche on your own terms
            </p>
          </div>
          <p className="max-w-2xl text-lg/8 text-slate-700 dark:text-slate-300">
            Arche is designed to be inspected, not pitched. The documentation walks through ingestion, versioning,
            reconciliation and query semantics in detail.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="#" size="lg">
              Request access
            </ButtonLink>

            <PlainButtonLink href="https://docs.arche.fi" size="lg">
              View the API documentation <ChevronIcon />
            </PlainButtonLink>
          </div>
        </div>
      }
      cta={
        <NewsletterForm
          headline="Stay in the loop"
          subheadline={
            <p>
              Get customer support tips, product updates and customer stories that you can archive as soon as they
              arrive.
            </p>
          }
          action="#"
        />
      }
      links={
        <>
          <FooterCategory title="Product">
            <FooterLink href="#">Use Case</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">About Arche</FooterLink>
          </FooterCategory>
          <FooterCategory title="Company">
            <FooterLink href="https://protos.fi">Protos Systems</FooterLink>
          </FooterCategory>
          <FooterCategory title="Resources">
            <FooterLink href="https://docs.arche.fi">API Docs</FooterLink>
            {/* <FooterLink href="#">Status</FooterLink> */}
            <FooterLink href="/request-access">Request Access</FooterLink>
          </FooterCategory>
          <FooterCategory title="Legal">
            <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/legal/terms">Terms of Service</FooterLink>
            <FooterLink href="/legal/security">Security</FooterLink>
          </FooterCategory>
        </>
      }
      fineprint="© 2026 Protos Systems LLC."
      socialLinks={
        <>
          <SocialLink href="https://www.linkedin.com/company/protos-sys/" name="LinkedIn">
            <LinkedInIcon />
          </SocialLink>
          {/* <SocialLink href="" name="GitHub"></SocialLink> */}
          {/* <SocialLink href="" name="X"></SocialLink> */}
        </>
      }
    />
  )
}
