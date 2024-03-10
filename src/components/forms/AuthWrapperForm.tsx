"use client";

import React, { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";

function AuthWrapperForm() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginForm setIsLogin={setIsLogin} />
  ) : (
    <SignupForm setIsLogin={setIsLogin} />
  );
}

export default AuthWrapperForm;
