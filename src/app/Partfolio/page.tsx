import Background from '@/components/Background/Background';
import ImgBoard from '@/components/ImgBoard/ImgBoard';
import ProfileImgBoard from '@/components/ProfileImgBoard/ProfileImgBoard';
import { usePathname } from 'next/navigation'
import PartfolioPage from '@/components/Partfolio/PartfolioPage'
export default  function Partfolio() {
    return (
        <main >
            <PartfolioPage></PartfolioPage>
        </main>
    );
}
