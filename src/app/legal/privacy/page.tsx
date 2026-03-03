import type { Metadata } from 'next'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { LegalPageSection } from '@/components/legal/LegalPageSection'

const LAST_UPDATED = 'March 3, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy | Arche API Legal',
  description:
    'Learn how Arche API collects, uses, retains, and safeguards personal and technical information for accounts, billing, and API usage.',
}

const features = [
  {
    name: 'Data minimization',
    description: 'We collect only the information needed to operate accounts, deliver API services, and support customers.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Usage telemetry',
    description: 'Request metadata is logged to secure, monitor, and improve reliability across Arche API endpoints.',
    icon: LockClosedIcon,
  },
  {
    name: 'Processor-based billing',
    description: 'Payment data is handled by our billing processor rather than stored directly on Arche systems.',
    icon: ServerIcon,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPageSection
      label="Privacy"
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how Arche handles personal data associated with account administration and developer use of the Arche API."
      lastUpdated={LAST_UPDATED}
      features={features}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Overview</h2>
      <p>
        Arche API is a developer-first financial data platform focused on deterministic, audit-grade EDGAR and normalized XBRL
        data. This Privacy Policy describes how we collect, use, and share information when you use our website, API, and
        support channels.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Information we collect</h2>
      <p>
        We collect account information such as name, work email, organization, role, and authentication details when you
        register for access. For billing, we process subscription and transaction details through a third-party payment
        processor.
      </p>
      <p>
        We collect API telemetry to operate and secure the service, including timestamps, endpoint path, request volume,
        response status, IP address, and user-agent. We also collect information you provide through support communications and
        may use cookies or analytics tools on the marketing site to understand page performance and traffic trends.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">How we use information</h2>
      <p>
        We use information to provide and maintain the Arche API, authenticate users, enforce usage policies, process billing,
        respond to support requests, detect abuse, and improve product reliability and documentation quality.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">How we share information</h2>
      <p>
        We may share information with service providers that support hosting, observability, communications, and payment
        operations. We may also disclose information when required by law, legal process, or to protect the rights and safety
        of Arche, our users, or others. If Arche is involved in a merger, acquisition, or asset transfer, information may be
        transferred as part of that transaction.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Retention</h2>
      <p>
        We retain information for as long as needed to provide services, maintain security and audit logs, resolve disputes,
        and satisfy legal, accounting, or contractual obligations. Retention periods vary by data category and operational
        need.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Security</h2>
      <p>
        We use administrative, technical, and organizational safeguards designed to protect information. No system can guarantee
        absolute security, but we continuously evaluate controls based on risk and service requirements.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Your choices and rights</h2>
      <p>
        Depending on applicable law, you may have rights to access, correct, delete, or restrict use of certain personal
        information. We evaluate and respond to verified requests as required by law and consistent with platform security and
        business recordkeeping obligations.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Changes</h2>
      <p>
        We may update this Privacy Policy periodically. Material updates will be reflected by revising the last updated date on
        this page.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Contact</h2>
      <p>
        Contact us through our support channel. {/* TODO(legal): Add dedicated legal/privacy contact email when finalized. */}
      </p>
    </LegalPageSection>
  )
}
