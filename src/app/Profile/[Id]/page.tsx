"use client"
import Background from '@/components/Background/Background';
import ImgBoard from '@/components/ImgBoard/ImgBoard';
import ProfileImgBoard from '@/components/ProfileImgBoard/ProfileImgBoard';
import { usePathname } from 'next/navigation'
import Profile from '@/components/Profile/Profile'
export default async function ProfilePage() {
    const str: string = usePathname();
    const numberPattern: RegExp = /\d+$/; // Регулярное выражение для поиска числа в конце строки
    const match: RegExpMatchArray = str.match(numberPattern) as RegExpMatchArray; // Ищем соответствие регулярному выражению в строке
    if (match === null) { return }
    const Id: number = parseInt(match[0], 10); // Преобразуем найденное число в числовой тип данных
    // console.log("Id ",Id);
    return (
        <main >
            <Profile Id={Id}></Profile>
        </main>
    );
}
