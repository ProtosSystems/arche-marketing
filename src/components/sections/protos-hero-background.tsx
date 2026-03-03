import * as React from "react";

export function ProtosHeroBackground({ id = "protos-hero" }: { id?: string }) {
    const fade = `${id}-fade`;
    const mask = `${id}-mask`;
    const base = `${id}-base`;
    const active = `${id}-active`;

    return (
        <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="28%" stopColor="white" stopOpacity="1" />
                </linearGradient>
                <mask id={mask}>
                    <rect width="100%" height="100%" fill={`url(#${fade})`} />
                </mask>

                {/* light mode base */}
                <pattern id={base} patternUnits="userSpaceOnUse" width="64" height="64">
                    <path d="M-96 112L32 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                    <path d="M-80 112L48 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                    <path d="M-64 112L64 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                    <path d="M-48 112L80 -16" stroke="rgb(226 232 240 / 0.65)" strokeWidth="1" />
                </pattern>

                {/* active band: navy */}
                <pattern id={active} patternUnits="userSpaceOnUse" width="128" height="128">
                    <path d="M-64 160L160 -64" stroke="#0B1F3B" strokeWidth="1.25" strokeOpacity="0.18" />
                    <path d="M-40 160L184 -64" stroke="#0B1F3B" strokeWidth="1.25" strokeOpacity="0.10" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill={`url(#${base})`} mask={`url(#${mask})`} />
            <rect x="58%" width="26%" height="100%" fill={`url(#${active})`} mask={`url(#${mask})`} />

            {/* Dark mode overlay (kept in SVG to avoid duplicate nodes) */}
            <rect
                className="hidden dark:block"
                width="100%"
                height="100%"
                fill="rgb(2 6 23 / 0.65)"
            />
        </svg>
    );
}
