import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '@/utils/supabase';
import { useNavigate } from 'react-router-dom';

const PROVIDER = 'github';

export const useLogin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  const onSessionChange = (session: Session | null) => {
    setSession(session);
  };

  const onLoginClick = async () => {
    await supabase.auth.signInWithOAuth({
      provider: PROVIDER,
      options: {
        redirectTo: import.meta.env.VITE_ORIGIN_URL,
      },
    });
  };

  const onLogoutClick = async () => {
    await supabase.auth.signOut();

    return navigate('/');
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      onSessionChange(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      onSessionChange(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    onLoginClick,
    onLogoutClick,
    onSessionChange,
    setSession,
  };
};
