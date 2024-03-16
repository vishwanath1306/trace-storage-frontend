import * as React from 'react';
import { useEventListener } from 'primereact/hooks';

export const useCookie = (initialValue, key) => {
    const cookieAvailable = typeof document !== 'undefined';
    const [bindWindowCookieListener, unbindWindowCookieListener] = useEventListener({
        target: 'document',
        type: 'cookie',
        listener: (event) => {
            if (event.key === key) {
                setStoredValue(event.value);
            }
        }
    });
    let cookieValue = initialValue;
    if (cookieValue === null) {
        if (cookieAvailable) {
            const item = document.cookie.split(';').find(c => c.trim().startsWith(key));
            const value = item ? item.split('=')[1] : null;
            cookieValue = value;

        }
    }
    const [storedValue, setStoredValue] = React.useState(cookieValue);

    const setValue = (value) => {
        try {
            setStoredValue(value);
            if (cookieAvailable) {
                document.cookie = `${key}=${value}; SameSite=Lax; Secure`;
            }
        }
        catch (error) {
            throw new Error(`Hooks useCookie: Failed to serialize the value at key: ${key}`);
        }
    }

    React.useEffect(() => {
        if (!cookieAvailable) {
            setStoredValue(initialValue);
        }
        try {
            const item = document.cookie.split(';').find(c => c.trim().startsWith(key));
            setStoredValue(item ? item.split('=')[1] : initialValue);
        } catch (error) {
            // If error also return initialValue
            setStoredValue(initialValue);
        }

        bindWindowCookieListener();
        return () => unbindWindowCookieListener();
    }, []);

    return [storedValue, setValue];
}

