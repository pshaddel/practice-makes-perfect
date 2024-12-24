'use client'
import React, { useState, useEffect, Suspense } from 'react';
import Typed from 'typed.js';
const AnimatedText = ({ texts }: { texts: string[] }) => {
    const el = React.useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const typed = new Typed(el.current!, {
            strings: texts,
            typeSpeed: 45,
            backSpeed: 45,
            loop: true,
        });
        return () => {
            typed.destroy();
        };
    }, [texts]);
    return <span ref={el} />;
};

export default function ({ texts }: { texts: string[] }) {
    return <Suspense>
        <AnimatedText texts={texts} />
    </Suspense>
}