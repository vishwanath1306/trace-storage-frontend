import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useCookie } from '@/utils/hooks/useCookie';
import { useLocalStorage } from 'primereact/hooks';
import { getDetails } from '@/utils/api/session';
import { PageContainer } from '@/layout/Containers';
import Logo from '@/components/Logo';

export default function Session() {
    const toast = useRef(null);
    const router = useRouter();
    const [data, setData] = useState({});
    const [sessionIdLocalStorage, setSessionIdLocalStorage] = useLocalStorage('0', 'session_id');
    const [sessionIdCookie, setSessionIdCookie] = useCookie(null, 'session_id');
    const [sessionId, setSessionId] = useState(router.query.session_id);

    const updatePage = async () => {
        const response = await getDetails(sessionId);
        setData(response);
    }
    useEffect(() => {
        updatePage();
    }, []);

    return (
        <div>
            <PageContainer>
                <Logo />
                <h1>Session</h1>
                <p>Session ID: {sessionId}</p>
                <p>Status: {data.status}</p>
                <p>Details: {data.details}</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </PageContainer>
        </div>
    );
}
