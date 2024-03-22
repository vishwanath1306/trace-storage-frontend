import { SessionChat } from '@/components/SessionChat';
import { SessionProvider } from '@/components/SessionProvider';
import { useRouter } from 'next/router';

const SessionPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  return (
    <SessionProvider>
      <SessionChat sessionId={sessionId as string} />
    </SessionProvider>
  );
};

export default SessionPage;
