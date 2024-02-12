import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Components
import ModalListBooks from '../tools/SliderList/Modal';
import BooksReadingList from '@/components/library/BooksReadingList';
//  Icons
import { FaBars, FaClipboardList } from 'react-icons/fa';

const Navbar = () => {

  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`text-white p-4 flex justify-between items-center h-[5rem] transition duration-300 ease-in-out ${isSticky ? 'sticky top-0 left-0 right-0 z-50 bg-[#2f565f]' : 'bg-transparent'}`}>
      <div className="text-lg font-semibold">
        <Link className='flex justify-center items-center' href="/">
          <Image
            src='https://jelou.ai/_ipx/w_128,q_75/%2F_next%2Fstatic%2Fmedia%2Fjelou-logo.1c356d8a.png?url=%2F_next%2Fstatic%2Fmedia%2Fjelou-logo.1c356d8a.png&w=128&q=75'
            alt='Logo jelou'
            width={100}
            height={32}
          />
          <p className="text-3xl font-bold mx-2"><em>Library</em></p>
        </Link>
      </div>
      <nav className="hidden md:block">
        <ul className="flex justify-center items-center space-x-10 mr-10">
          <li>
            <Link href="/Library">
              <p className="text-2xl transition ease-in-out hover:italic hover:underline hover:scale-110">Biblioteca</p>
            </Link>
          </li>
          <li>
            <Link href="/">
              <p className="text-2xl transition ease-in-out hover:italic hover:underline hover:scale-110">GitHub</p>
            </Link>
          </li>
          <li>
            <ModalListBooks nameBtn='Lista' IconBtn={FaClipboardList}>
              <BooksReadingList />
            </ModalListBooks>
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          <FaBars className="text-3xl" />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[5rem] left-0 right-0 bg-[#2f565f] text-white">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/Library">
                <p className="text-2xl transition ease-in-out hover:italic hover:underline hover:scale-110">Biblioteca</p>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/Tensangelo/Technical-Jelou/tree/main">
                <p className="text-2xl transition ease-in-out hover:italic hover:underline hover:scale-110">GitHub</p>
              </Link>
            </li>
            <li>
              <ModalListBooks nameBtn='Lista' IconBtn={FaClipboardList}>
                <BooksReadingList />
              </ModalListBooks>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;