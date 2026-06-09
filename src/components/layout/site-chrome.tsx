import type { ReactNode } from 'react'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
// import { GitHubIcon } from '@/components/icons/social/github-icon'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
// import { XIcon } from '@/components/icons/social/x-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { NewsletterSignupForm } from '@/components/sections/newsletter-signup-form'
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
          <NavbarLink href="/case_study">Case Study</NavbarLink>
          <NavbarLink href="/pricing">Pricing</NavbarLink>
          <NavbarLink href="https://docs.arche.fi">
            Docs <span aria-hidden="true">↗</span>
          </NavbarLink>
          <NavbarLink href="/about">About</NavbarLink>
          {/* <NavbarLink href="https://app.arche.fi" className="sm:hidden">
            Log in
          </NavbarLink> */}
        </>
      }
      logo={
        <NavbarLogo href="/" aria-label="Arche home">
          <span className="h3 text-2xl font-regular tracking-tight text-[var(--header-fg)]">
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
          <ButtonLink href="/request-access" color="light">Request Early Access</ButtonLink>
        </>
      }
    />
  )
}

export function SiteFooter({
  topCta,
  cta,
}: {
  topCta?: ReactNode
  cta?: ReactNode
} = {}) {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      topCta={
        topCta !== undefined ? topCta : (
        <div className="flex flex-col items-center gap-6 pb-10 text-center">
          <div className="flex max-w-3xl flex-col gap-2">
            <p className="text-4xl font-normal tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
              Evaluate Arche on your own terms
            </p>
          </div>
          <p className="max-w-2xl text-lg/8 text-slate-700 dark:text-slate-300">
            Arche is designed to be inspected, not pitched. The documentation walks through ingestion, versioning,
            reconciliation and query semantics in detail.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/request-access" size="lg">
              Request Early Access
            </ButtonLink>

            <PlainButtonLink href="https://docs.arche.fi" size="lg">
              View the API documentation <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
          </div>
        )
      }
      cta={cta !== undefined ? cta : <NewsletterSignupForm />}
      links={
        <>
          <FooterCategory title="Product">
            <FooterLink href="/case_study">Case Study</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/about">About Arche</FooterLink>
          </FooterCategory>
          <FooterCategory title="Company">
            <FooterLink href="https://protos.fi">Protos Systems</FooterLink>
          </FooterCategory>
          <FooterCategory title="Resources">
            <FooterLink href="https://docs.arche.fi">API Docs</FooterLink>
            {/* <FooterLink href="#">Status</FooterLink> */}
            <FooterLink href="/request-access">Request Early Access</FooterLink>
          </FooterCategory>
          <FooterCategory title="Legal">
            <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/legal/terms">Terms of Service</FooterLink>
            <FooterLink href="/refund-policy">Refund Policy</FooterLink>
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
