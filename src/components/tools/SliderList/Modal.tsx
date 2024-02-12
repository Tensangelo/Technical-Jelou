import { useState } from 'react';
// Redux
import { RootState } from '@/redux/store';
// Hooks
import { useAppSelector } from '@/redux/hooks';
// Icons
import { IoMdCloseCircle } from "react-icons/io";
import { IconType } from 'react-icons';

type Props = {
  children?: React.ReactNode;
  nameBtn: string;
  IconBtn: IconType;
}

const Modal = ({ children, nameBtn, IconBtn }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const readingList = useAppSelector((state: RootState) => state.readingList.books);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section>
      <button
        onClick={toggleModal}
        type='button'
        className='px-4 py-2 bg-gradient-to-br from-teal-400 via-teal-600 to-cyan-500 text-white text-base font-medium flex items-center justify-center rounded-lg transition ease-in-out hover:scale-105 active:opacity-65 my-2'
      >
        <IconBtn className='mx-1' />
        {nameBtn} ({readingList.length})
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleModal}></div>
          <div className={`absolute right-0 top-0 h-full bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${isOpen ? '' : '-translate-x-full'} w-[90%] lg:w-[35rem]`}>
            <div className="flex justify-end p-2">
              <button onClick={toggleModal} className="text-gray-600 hover:text-gray-800">
                <IoMdCloseCircle className='text-[#23b3a3] text-3xl' />
              </button>
            </div>
            <div className="noneScroll p-4 text-black h-[95%] overflow-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Modal;