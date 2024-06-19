import IPT from '../ImgPlusText/IPT';
import SubButton from '../SubButton/SubButton';
import styles from './Art.module.scss'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import Link from 'next/link';

import Comments from './Comment';
// import CommentInput from './CommentInput';
import ArtTitle from './ArtTitle';
import Tegs from './Tegs';

export default function ArtInfo({ ArtWorkId, Title, Name, AuthorId, AuthorImg, Description="This work does not have a description of it." }: { ArtWorkId: number, Title: string, Name: string, AuthorId: number, AuthorImg: string,Description?: string }) {
    if(Description==null){
        Description="This work does not have a description of it.";
    }
    return (
        <>
            <div className={styles.ArtInfo}>
                <div className={styles.AuthorInfo}>
                    <Link href={`/Profile/${AuthorId}`} className={styles.Link}>
                        <IPT title={Name} img={AuthorImg} size='L'></IPT>
                    </Link>
                    <SubButton AuthorId={AuthorId} ></SubButton>
                </div>
                <ArtTitle ArtWorkId={ArtWorkId} Title={Title}></ArtTitle>
                <div className={styles.Conteiner}>
                    <div className={styles.ConteinerTop}>
                        <p>Description:</p>
                    </div>
                    <div className={styles.ConteinerInside}>
                        <p>{Description}</p>
                    </div>
                </div>
                <div className={styles.Conteiner}>
                    <div className={styles.ConteinerTop}>
                        <p>Comments:</p>
                    </div>
                    <div className={styles.Comments}>
                        <Comments ArtWorkId={ArtWorkId}></Comments>
                    </div>
                </div>
                <div className={styles.Conteiner}>
                    <div className={styles.ConteinerTop}>
                        <p>Tegs:</p>
                    </div>
                    <div className={styles.ConteinerInside}>
                        <Tegs ArtWorkId={ArtWorkId}></Tegs>
                    </div>
                </div>
                {/* <div className={styles.Conteiner}>
                    <div className={styles.ConteinerTop}>
                        <p>Add to group:</p>
                    </div>
                    <div className={styles.ConteinerInside}>
                    </div>
                </div> */}
            </div>
        </>
    )
}