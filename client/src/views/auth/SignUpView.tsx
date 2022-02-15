import React from "react";
import SignUpForm from "../../features/auth/SignUpForm";
import FullscreenCenteredLayout from "../../layout/FullscreenCenteredLayout";

const SignUpView = () => {
  return (
    <FullscreenCenteredLayout>
      <SignUpForm />
    </FullscreenCenteredLayout>
  );
};

export default SignUpView;
