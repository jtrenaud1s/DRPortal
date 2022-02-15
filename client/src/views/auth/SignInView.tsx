import React from 'react'
import SignInBox from '../../features/auth/SignInForm';
import FullscreenCenteredLayout from '../../layout/FullscreenCenteredLayout';

const SignInView = () => {
  return (
    <FullscreenCenteredLayout>
      <SignInBox />
    </FullscreenCenteredLayout>
  );
}

export default SignInView