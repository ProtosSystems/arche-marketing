import * as React from "react";

export function ArcheHeroBackground({ id = "arche-hero" }: { id?: string }) {
    // Unique ids per instance (prevents collisions if the hero appears twice)
    const lightFade = `${id}-fade-light`;
    const lightMask = `${id}-mask-light`;
    const lightBase = `${id}-base-light`;
    const lightActive = `${id}-active-light`;

    const darkFade = `${id}-fade-dark`;
    const darkMask = `${id}-mask-dark`;
    const darkBase = `${id}-base-dark`;
    const darkActive = `${id}-active-dark`;

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Light */}
            <svg
                className="absolute inset-0 h-full w-full dark:hidden"
                viewBox="0 0 1200 600"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={lightFade} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="28%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                    <mask id={lightMask}>
                        <rect width="100%" height="100%" fill={`url(#${lightFade})`} />
                    </mask>

                    <pattern id={lightBase} patternUnits="userSpaceOnUse" width="64" height="64">
                        <path d="M-96 112L32 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                        <path d="M-80 112L48 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                        <path d="M-64 112L64 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                        <path d="M-48 112L80 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                    </pattern>

                    <pattern id={lightActive} patternUnits="userSpaceOnUse" width="128" height="128">
                        <path d="M-64 160L160 -64" stroke="#0B1F3B" strokeWidth="1.25" strokeOpacity="0.22" />
                        <path d="M-40 160L184 -64" stroke="#0B1F3B" strokeWidth="1.25" strokeOpacity="0.14" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill={`url(#${lightBase})`} mask={`url(#${lightMask})`} />
                <rect x="62%" width="22%" height="100%" fill={`url(#${lightActive})`} mask={`url(#${lightMask})`} />
            </svg>

            {/* Dark */}
            <svg
                className="absolute inset-0 h-full w-full hidden dark:block"
                viewBox="0 0 1200 600"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={darkFade} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="28%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                    <mask id={darkMask}>
                        <rect width="100%" height="100%" fill={`url(#${darkFade})`} />
                    </mask>

                    <pattern id={darkBase} patternUnits="userSpaceOnUse" width="64" height="64">
                        <path d="M-96 112L32 -16" stroke="rgb(51 65 85 / 0.45)" strokeWidth="1" />
                        <path d="M-80 112L48 -16" stroke="rgb(51 65 85 / 0.45)" strokeWidth="1" />
                        <path d="M-64 112L64 -16" stroke="rgb(51 65 85 / 0.45)" strokeWidth="1" />
                        <path d="M-48 112L80 -16" stroke="rgb(51 65 85 / 0.45)" strokeWidth="1" />
                    </pattern>

                    <pattern id={darkActive} patternUnits="userSpaceOnUse" width="128" height="128">
                        {/* lighter “ink” so it reads on charcoal */}
                        <path d="M-64 160L160 -64" stroke="rgb(147 197 253 / 0.28)" strokeWidth="1.25" />
                        <path d="M-40 160L184 -64" stroke="rgb(147 197 253 / 0.18)" strokeWidth="1.25" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill={`url(#${darkBase})`} mask={`url(#${darkMask})`} />
                <rect x="62%" width="22%" height="100%" fill={`url(#${darkActive})`} mask={`url(#${darkMask})`} />
            </svg>
        </div>
    );
}
