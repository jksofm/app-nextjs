import { SignIn, SignUp } from "@clerk/nextjs";
import * as React from "react";

export interface SignInProps {}

export default function SignInPage(props: SignInProps) {
  return (
    <div>
      <SignIn />
    </div>
  );
}
