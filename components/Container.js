import { Auth, Typography, Button } from '@supabase/ui';

const Container = (props) => {
  const { user } = Auth.useUser();
  if (user) {
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  }

  return props.children;
};
export default Container;
