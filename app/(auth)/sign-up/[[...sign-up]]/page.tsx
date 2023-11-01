import { SignUp } from "@clerk/nextjs";
import * as React from "react";

export interface SignUpProps {}

export default function SignUpPage(props: SignUpProps) {
  return (
    <div>
      <SignUp />
    </div>
  );
}
