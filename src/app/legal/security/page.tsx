import type { Metadata } from 'next'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { LegalPageSection } from '@/components/legal/LegalPageSection'

const LAST_UPDATED = 'March 3, 2026'

export const metadata: Metadata = {
  title: 'Security | Arche API Legal',
  description:
    'Review Arche API security practices for encryption, access controls, monitoring, incident response, and vulnerability reporting.',
  alternates: {
    canonical: '/legal/security',
  },
}

const features = [
  {
    name: 'Encryption',
    description: 'Data is protected in transit and encrypted at rest where applicable in managed infrastructure.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Access controls',
    description: 'Operational access follows least-privilege practices with key management and auditability controls.',
    icon: LockClosedIcon,
  },
  {
    name: 'Monitoring',
    description: 'Security and reliability telemetry is monitored to detect anomalies and support incident response.',
    icon: ServerIcon,
  },
]

export default function SecurityPage() {
  return (
    <LegalPageSection
      label="Security"
      title="Security"
      subtitle="Arche applies practical, risk-based security controls to protect customer data and maintain dependable API operations."
      lastUpdated={LAST_UPDATED}
      features={features}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Security overview</h2>
      <p>
        Security at Arche is designed around protecting developer credentials, service integrity, and data confidentiality while
        supporting deterministic, audit-grade data delivery workflows.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Encryption</h2>
      <p>
        Arche API traffic is encrypted in transit using modern TLS. Data is encrypted at rest where supported by underlying
        managed services and storage systems.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Access controls</h2>
      <p>
        Internal access is limited by role and business need. We apply least-privilege access principles, maintain key and
        secret management practices, and retain audit logs to support review and investigation.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">
        Monitoring and incident response
      </h2>
      <p>
        We maintain service and security monitoring for anomalous behavior, operational failures, and potential abuse. Incident
        response processes are designed to triage, contain, remediate, and communicate material issues in a timely manner.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Vulnerability reporting</h2>
      <p>
        If you identify a potential vulnerability, contact us through our support channel with reproduction details and impact
        context. Please do not perform intrusive testing against Arche systems without prior written authorization.{' '}
        {/* TODO(security): Add a dedicated security reporting email or intake form URL. */}
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Subprocessors</h2>
      <p>
        Arche uses third-party providers for infrastructure, observability, and billing operations where needed. A
        subprocessors list can be provided through customer support for applicable agreements.{' '}
        {/* TODO(legal): Add public subprocessors page link if published. */}
      </p>
    </LegalPageSection>
  )
}
