import Link from 'next/link';
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui';
import { supabase } from '../../utils/supabaseClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Index = () => {
  const { user, session } = Auth.useUser();
  const router = useRouter();

  const [authView, setAuthView] = useState('sign_in');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password');
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000);

        // Send session to /api/auth route to set the auth cookie.
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const View = () => {
    if (!user)
      return (
        <Space direction="vertical" size={8}>
          <div>
            <Image
              src="https://app.supabase.io/img/supabase-light.svg"
              width="96"
              height="20"
              alt="supabase icon"
            />
            <Typography.Title level={3} className="mt-7 mb-7 font-bold">
              Welcome to Supabase Auth
            </Typography.Title>
          </div>
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github', 'twitter', 'facebook']}
            view={authView}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
            socialColors={true}
          />
        </Space>
      );

    return (
      <Space direction="vertical" size={6}>
        {authView === 'forgotten_password' && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <div className="flex justify-center items-center overflow-hidden">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
          </div>
        )}
      </Space>
    );
  };

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <View />
      </Card>
    </div>
  );
};

export default Index;
