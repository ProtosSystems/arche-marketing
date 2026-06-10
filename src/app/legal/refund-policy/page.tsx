import type { Metadata } from 'next'
import { ClockIcon, CreditCardIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { LegalPageSection } from '@/components/legal/LegalPageSection'

const LAST_UPDATED = 'March 13, 2026'

export const metadata: Metadata = {
  title: 'Refund Policy | Arche API Legal',
  description:
    'Review Arche subscription trial, annual billing, cancellation timing and the limited circumstances where refund requests may be considered.',
  alternates: {
    canonical: '/legal/refund-policy',
  },
}

const features = [
  {
    name: '7-day free trial',
    description: 'You can evaluate Arche for seven days without being charged.',
    icon: ClockIcon,
  },
  {
    name: 'Automatic annual billing',
    description: 'Subscriptions convert to a paid annual license when the free trial ends unless cancelled first.',
    icon: CreditCardIcon,
  },
  {
    name: 'Limited refund exceptions',
    description: 'Refund requests are considered only for duplicate payments, billing errors or specific legal requirements.',
    icon: ExclamationCircleIcon,
  },
]

export default function RefundPolicyPage() {
  return (
    <LegalPageSection
      label="Billing"
      title="Refund Policy"
      subtitle="This Refund Policy explains how Arche handles free trials, subscription conversion, cancellations and limited refund exceptions."
      lastUpdated={LAST_UPDATED}
      features={features}
    >
      <p>By starting a free trial or purchasing a subscription, you agree to this Refund Policy.</p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Free trial</h2>
      <p>
        Arche offers a 7-day free trial. During the trial period, you may evaluate the service without being charged.
      </p>
      <p>If you cancel before the trial period ends, you will not be billed.</p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Subscription billing</h2>
      <p>
        At the end of the trial period, the subscription automatically converts to a paid annual license unless cancelled
        before the trial period ends.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Refunds</h2>
      <p>
        Because Arche provides immediate access to proprietary financial data infrastructure, all purchases are final and
        non-refundable once the trial period has ended and billing has occurred.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">Exceptions</h2>
      <p>Refunds may be issued only in limited circumstances such as:</p>
      <ul role="list" className="list-disc space-y-2 pl-6">
        <li>Duplicate payments</li>
        <li>Billing errors</li>
        <li>Legal requirements in specific jurisdictions</li>
      </ul>
      <p>Requests will be reviewed at our discretion.</p>

      <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-white">How to cancel</h2>
      <p>
        Subscriptions can be cancelled at any time before the trial ends through the account dashboard or by contacting
        support.
      </p>
    </LegalPageSection>
  )
}
