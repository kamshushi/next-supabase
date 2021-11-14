import { useState } from 'react';
import Container from '../../components/Container';
import { Auth } from '@supabase/ui';
import { supabase } from '../../utils/supabaseClient';
export default function Login() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'github', 'twitter']}
        />
      </Container>
    </Auth.UserContextProvider>
  );
}
