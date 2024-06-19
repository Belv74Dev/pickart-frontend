"use client"
import Background from '@/components/Background/Background';
import SearchImgBoard from '@/components/SearchImgBoard/SearchImgBoard';
import NavButton from '@/components/NavButton/NavButton';
import { usePathname } from 'next/navigation';

export default function SearchPage() {
    const str: string = usePathname();
    const words: string[] = str.split('/'); // Разбиваем строку на массив слов
    const SearchData: string = words[words.length - 1]; // Получаем последнее слово

    return (
        <main>
            <Background isSearch={true} />
            <SearchImgBoard SearchData={SearchData} />
            <NavButton />
        </main>
    );
}