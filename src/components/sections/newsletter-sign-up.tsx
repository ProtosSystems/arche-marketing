export default function NewsletterSignUp() {
    return (
        <div className="bg-[var(--header-bg)] py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <h2 className="max-w-xl text-3xl tracking-tight text-balance text-primary sm:text-4xl lg:col-span-7 dark:text-slate-100">
                    Want product news and updates? Sign up for our newsletter.
                </h2>
                <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
                    <div className="flex gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-mist-950 outline-1 -outline-offset-1 outline-mist-300 placeholder:text-mist-500 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-slate-500 dark:focus:outline-mist-300"
                        />
                        <button
                            type="submit"
                            className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30 dark:bg-[#3A4F7A] dark:text-white dark:hover:bg-[#4D6391] dark:focus-visible:outline-[#3A4F7A]"
                        >
                            Subscribe
                        </button>
                    </div>
                    <p className="mt-4 text-sm/6 text-mist-950 dark:text-slate-300">
                        We care about your data. Read our{' '}
                        <a
                            href="#"
                            className="font-semibold whitespace-nowrap text-accent hover:text-primary dark:text-mist-300 dark:hover:text-white"
                        >
                            privacy policy
                        </a>
                        .
                    </p>
                </form>
            </div>
        </div>
    )
}
