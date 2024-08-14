import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 300) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timeOut);
    }, [value, delay]);

    return debounced;
};
