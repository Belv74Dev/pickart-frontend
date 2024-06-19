
"use client";
import styles from './GoogleButton.module.scss'
import { signIn } from "next-auth/react";
import { useSearchParams, usePathname } from "next/navigation";

import { useRouter } from 'next/navigation';


const GoogleButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const callbackUrl = searchParams.get("callbackUrl") || pathname;

  const router = useRouter();
  return (
    <div className={styles.Button} onClick={async() => {
      signIn("google", { callbackUrl })
      // router.push('/Loading')
      }}>
      Sign in with Google
    </div>
  );
};

export { GoogleButton };
