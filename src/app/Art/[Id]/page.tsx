"use client"
import styles from './Styles.module.scss'
import Art from '@/components/Art/Art';
import { usePathname } from 'next/navigation'
export default function Home() {
  const str: string = usePathname();
  const numberPattern: RegExp = /\d+$/; // Регулярное выражение для поиска числа в конце строки
  const match: RegExpMatchArray | null = str.match(numberPattern); // Ищем соответствие регулярному выражению в строке
  const Id: number = parseInt(match[0], 10); // Преобразуем найденное число в числовой тип данных
  // console.log(Id); // Выводим найденное число
  return (
    <main >
      <Art id={Id}></Art>
    </main>
  );
}
