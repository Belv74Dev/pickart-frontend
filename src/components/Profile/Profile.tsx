import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileImgBoard from '@/components/ProfileImgBoard/ProfileImgBoard';
import Backgrounde from '@/components/Background/Background';

interface Profile {
    Name: string;
    Avatar: string;
    Information_about_yourself: string;
}

const AvatarPath = "http://localhost:3001/Avatars/";

export default function Profile({ Id }: { Id: number }) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    useEffect(() => {
        if (isInitialLoad) {
            setFetching(true);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        if (fetching) {
            axios.get<Profile>(`http://localhost:3001/Profile/?Id=${Id}`)
                .then(response => {
                    setProfile(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
        }
    }, [fetching]);

    if (!profile) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Backgrounde Title={profile.Name} Logo={profile.Avatar ?  AvatarPath+profile.Avatar : "/Login_Black.png"} Description={profile.Information_about_yourself ? profile.Information_about_yourself : "Profile"}></Backgrounde>
                <ProfileImgBoard ProfileId={Id}></ProfileImgBoard>
            </>
        );
    }
}