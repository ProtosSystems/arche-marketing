import type { Metadata } from 'next'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { LegalPageSection } from '@/components/legal/LegalPageSection'

const LAST_UPDATED = 'March 3, 2026'

export const metadata: Metadata = {
  title: 'Terms of Service | Arche API Legal',
  description:
    'Read the terms governing access to and use of the Arche API, including account security, billing, acceptable use, and service limitations.',
  alternates: {
    canonical: '/legal/terms',
  },
}

const features = [
  {
    name: 'API key responsibility',
    description: 'You are responsible for safeguarding credentials and all activity performed under your account.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Acceptable use',
    description: 'Use must remain lawful and must not interfere with platform security, availability, or other users.',
    icon: LockClosedIcon,
  },
  {
    name: 'Billing and usage',
    description: 'Service access is subject to your plan terms, payment status, and documented usage boundaries.',
    icon: ServerIcon,
  },
]

export default function TermsOfServicePage() {
  return (
    <LegalPageSection
      label="Terms"
      title="Terms of Service"
      subtitle="These Terms govern your use of the Arche API, including operational responsibilities, billing obligations, and permitted use."
      lastUpdated={LAST_UPDATED}
      features={features}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Acceptance and eligibility</h2>
      <p>
        By accessing or using Arche API, you agree to these Terms of Service. You represent that you have authority to bind the
        company or organization using the service and that you will use the service only in compliance with applicable laws and
        regulations.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Accounts and API keys</h2>
      <p>
        You must maintain accurate account information and keep API keys confidential. You are responsible for all activity
        under your credentials, including usage caused by unauthorized access resulting from your failure to secure keys.
      </p>
      <p>
        Arche may apply rate limits, traffic shaping, or access restrictions to protect reliability and prevent abuse. You may
        not attempt to bypass limits or interfere with service operation.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Fees and billing</h2>
      <p>
        Arche API is offered under usage-based or contract-based pricing, as specified in your order form or plan details.
        Payment processing is handled by a third-party processor. Fees are generally non-refundable except where required by law
        or expressly stated in a written agreement.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Acceptable use</h2>
      <p>
        You may not use Arche API for unlawful activity, attempts to gain unauthorized access, disruption of service operation,
        reverse engineering except where legally protected, or security testing without prior written permission from Arche.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Service availability and changes</h2>
      <p>
        We work to maintain reliable service, but availability is not guaranteed. We may update, modify, or discontinue
        features, endpoints, or data fields over time, including for security, legal, or operational reasons.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Disclaimers</h2>
      <p>
        Arche API data and services are provided on an “as is” and “as available” basis. Arche API provides financial data
        infrastructure and does not provide investment, legal, accounting, or tax advice.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Intellectual property</h2>
      <p>
        Arche and its licensors retain all rights in the service, software, and related materials. Subject to these Terms and
        any applicable agreement, you receive a limited, non-exclusive, non-transferable right to access and use the service.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Termination</h2>
      <p>
        Either party may terminate service access as permitted by the applicable agreement. Arche may suspend or terminate
        access for non-payment, security risk, legal compliance reasons, or material breach of these Terms.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">
        Limitation of liability and warranty disclaimer
      </h2>
      <p>
        To the maximum extent permitted by law, Arche disclaims implied warranties and is not liable for indirect, incidental,
        special, consequential, or punitive damages, or for lost profits, revenues, data, or goodwill arising from use of the
        service.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Governing law</h2>
      <p>
        These Terms are governed by the laws of the Commonwealth of Virginia, without regard to conflict-of-laws rules.
        The parties consent to exclusive jurisdiction and venue in the state and federal courts located in Virginia.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Contact</h2>
      <p>
        Contact us through our support channel for legal or contractual questions.{' '}
        {/* TODO(legal): Add a dedicated legal contact address if adopted. */}
      </p>
    </LegalPageSection>
  )
}
