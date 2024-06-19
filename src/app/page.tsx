import Background from '@/components/Background/Background';
import ImgBoard from '@/components/ImgBoard/ImgBoard';
import styles from './Styles.module.scss'
import NavButton from '@/components/NavButton/NavButton';




export default  async function Home() {
  return (
    <main >
      <Background></Background> 
      <ImgBoard/>
      <NavButton></NavButton>
    </main>
  );
}
