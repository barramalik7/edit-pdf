import { useEffect, useState, RefObject } from 'react';

export function useIntersectionObserver(
    ref: RefObject<Element | null>,
    { threshold, root, rootMargin }: IntersectionObserverInit = {}
): boolean {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
        }, { threshold, root, rootMargin });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, threshold, root, rootMargin]);

    return isIntersecting;
}
