import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(
    value: T,
    delay: number,
    enabled: boolean = true,
): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        if (!enabled) {
            setDebounced(value);
            return;
        }

        const timer = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay, enabled]);

    return debounced;
}
