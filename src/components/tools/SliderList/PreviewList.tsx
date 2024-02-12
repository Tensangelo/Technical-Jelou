import Image from 'next/image';
import Link from 'next/link';
// Hooks redux
import { removeFromReadingList } from '@/pages/redux/features/countBooksSlice';
import { useAppDispatch } from '@/pages/redux/hooks';
// Icons
import { MdBookmarkRemove } from "react-icons/md";
import { FaEye } from "react-icons/fa";

interface PropsBooks {
    idBook: string;
    imgBook: string;
    titleBook: string;
    genreBook: string;
    author: {
        name: string;
    }
}

const PreviewList = (PropsBooks: PropsBooks) => {
    const dispatch = useAppDispatch();

    const {
        idBook,
        imgBook,
        titleBook,
        genreBook,
        author,
    } = PropsBooks;

    const handleRemoveFromReadingList = (ISBN: string) => {
        dispatch(removeFromReadingList(ISBN));
    };

    return (
        <section>
            <div className='relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-4 py-4 transition ease-in-out hover:shadow-[0_3px_10px_#23b3a3]'>
                <div className='flex flex-wrap justify-around items-center'>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={imgBook}
                            alt={`portada del libro ${titleBook}`}
                            className='w-[120px] h-[180px]'
                            width={160}
                            height={150}
                        />
                    </div>
                    <article className='flex justify-around items-center flex-wrap flex-col sm:block'>
                        <p className='text-[#23b3a3] w-[75%] font-bold text-lg text-end whitespace-nowrap text-ellipsis overflow-hidden mt-4'>
                            {titleBook}
                        </p>
                        <p className='font-bold text-base text-end'>{author.name}</p>
                        <p className='text-sm italic text-end'>{genreBook}</p>
                        <div className='flex justify-end items-center'>
                            <button
                                type='button'
                                className='mt-4 mr-4 px-4 py-2 bg-gradient-to-br from-orange-400 via-orange-600 to-yellow-500 text-white text-base font-medium flex items-center justify-center rounded-lg transition ease-in-out hover:scale-105 active:opacity-65'
                                onClick={() => handleRemoveFromReadingList(idBook)}
                                >
                                <MdBookmarkRemove className='mx-1' />
                                Remover
                            </button>
                            <Link
                                href={`/book/${idBook}`}
                                target='_blank'
                                className='mt-4 px-4 py-2 bg-gradient-to-br from-teal-400 via-teal-600 to-cyan-500 text-white text-base font-medium flex items-center justify-center rounded-lg transition ease-in-out hover:scale-105 active:opacity-65'
                            >
                            <FaEye className='mx-1' />
                                Ver
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default PreviewList;