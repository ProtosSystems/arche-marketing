export default function Contact() {
    return (
        <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-transparent">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl tracking-tight text-balance text-primary sm:text-5xl dark:text-slate-100">
                    Request Access to Arche
                </h2>
                <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
                    Arche is currently available to a small number of design partners while we pressure-test the canonical data model. We grant access to teams working with financial statements where restatements, provenance, and temporal correctness matter.
                </p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                            Name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Alex Morgan"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary dark:bg-white/5 dark:text-slate-100 dark:outline-white/10 dark:placeholder:text-slate-500 dark:focus:outline-mist-300"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                            Work email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="name@company.com"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary dark:bg-white/5 dark:text-slate-100 dark:outline-white/10 dark:placeholder:text-slate-500 dark:focus:outline-mist-300"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                            Company
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="company"
                                name="company"
                                type="text"
                                autoComplete="organization"
                                placeholder="Protos Systems"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary dark:bg-white/5 dark:text-slate-100 dark:outline-white/10 dark:placeholder:text-slate-500 dark:focus:outline-mist-300"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="role" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                            Role
                        </label>
                        <div className="mt-2.5">
                            <select
                                id="role"
                                name="role"
                                className="block w-full appearance-none rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary dark:bg-white/5 dark:text-slate-100 dark:outline-white/10 dark:focus:outline-mist-300"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select a role
                                </option>
                                <option>Founder / Executive</option>
                                <option>Engineering</option>
                                <option>Research / Quant</option>
                                <option>Data / Analytics</option>
                                <option>Finance / FP&A</option>
                                <option>Product</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">
                            Prefer free text? Choose “Other” and include it in the use case below.
                        </p>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="use-case" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                            Intended use case
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="use-case"
                                name="use-case"
                                rows={5}
                                placeholder="2–3 sentences about the workflows or systems you want to power with Arche."
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary dark:bg-white/5 dark:text-slate-100 dark:outline-white/10 dark:placeholder:text-slate-500 dark:focus:outline-mist-300"
                                defaultValue=""
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30 dark:bg-[#3A4F7A] dark:text-white dark:hover:bg-[#4D6391] dark:focus-visible:outline-[#3A4F7A]"
                    >
                        Request access
                    </button>
                    <p className="mt-4 text-center text-sm/6 text-slate-600 dark:text-slate-400">
                        Just want to explore the model?{' '}
                        <a href="#" className="font-semibold text-slate-900 hover:opacity-80 dark:text-slate-100">
                            → Read the golden path
                        </a>
                    </p>
                </div>
            </form>
        </div>
    )
}
