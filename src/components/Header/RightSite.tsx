"use client";
import styles from './Header.module.scss'
import IPT from '../ImgPlusText/IPT'
import Image from 'next/image'
import ImgButton from './ImgButton'
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';




export default function RightSite() {
    const session = useSession();
    const [isHide, setIsHide] = useState(true);

    const SignInClick = () => {
        setIsHide(!isHide);
        console.log(isHide)
    };

    return (
        <>
            <div className={styles.RightSite}>
                <input id='Search' placeholder="Search"></input>
                {/* {session?.data && (<ImgButton img={"/Loading_Wite.png"} ></ImgButton>)} */}
                {session?.data ? (
                    <>
                        <ImgButton img={"/Loading_Wite.png"} ></ImgButton>
                        <div onClick={() => signOut({ callbackUrl: "/" })}>
                            <IPT title={"Sign Out"} img={session.data.user?.image}  ></IPT>
                        </div>
                        <ImgButton img={"/BM.png"}></ImgButton>
                    </>
                ) : (
                    <div onClick={SignInClick}>
                        <IPT title={"Sign In"} img='/Login_White.png'  ></IPT>
                    </div>
                )}
            </div >
        </>
    )
}