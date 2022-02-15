import React from 'react'
import SignInForm from '../../components/SignInForm';
import FullscreenCenteredLayout from '../../layout/FullscreenCenteredLayout';

const SignInView = () => {
  return (
    <FullscreenCenteredLayout>
      <SignInForm />
    </FullscreenCenteredLayout>
  );
}

export default SignInView