import Link from 'next/link';
import Image from 'next/image';
// Redux
import { addToReadingList, removeFromReadingList } from '@/redux/features/countBooksSlice';
import { RootState } from '@/redux/store';
// Hooks
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// Components
import { Book } from '@/utils/books';
// Icons
import { AiOutlineAppstoreAdd } from "react-icons/ai";

type Props = {
    children: React.ReactNode;
}

interface PropsBooks {
    idBook: string;
    imgBook: string;
    titleBook: string;
    genreBook: string;
    resumeBook: string;
    author: {
        name: string;
        otherBooks: string[];
    }
    pages: number;
    year: number,
}

export const ContainerCards = ({ children }: Props) => {
    return (
        <div className='flex justify-center items-center my-8 transition ease-in-out flex-row flex-wrap'>
            {children}
        </div>
    )
}

export const Cards = (PropsBooks: PropsBooks) => {

    const dispatch = useAppDispatch();
    const readingList = useAppSelector((state: RootState) => state.readingList.books);

    const {
        idBook,
        imgBook,
        titleBook,
        genreBook,
        resumeBook,
        author,
        pages,
        year,
    } = PropsBooks;

    const handleAddToReadingList = (book: Book) => {
        const isBookInList = readingList.some(item => item.ISBN === book.ISBN);
        if (!isBookInList) {
            dispatch(addToReadingList(book));

            // Almacenamiento en almacenamiento local del navegador
            localStorage.setItem('readingList', JSON.stringify([...readingList, book]));
        } else {
            // Pendiente por crear este aviso en interfaz
            console.log('El libro ya está en la lista de lectura');
        }
    };

    return (
        <div className='max-w-[16rem] relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-4 mx-8 p-4 transition ease-in-out hover:scale-105 min-h-[34rem] hover:shadow-[0_3px_10px_#23b3a3]'>
            <Link
                href={`/book/${idBook}`}
                target='_blank'
            >
                <div className='flex justify-center items-center'>
                    <Image
                        src={imgBook}
                        alt={`portada del libro ${titleBook}`}
                        className='w-[256px] h-[384px]'
                        width={160}
                        height={150}
                    />
                </div>
                <article>
                    <p className='text-[#23b3a3] font-bold text-lg whitespace-nowrap text-ellipsis overflow-hidden mt-4'>{titleBook}</p>
                    <p className='font-bold text-base'>{author.name}</p>
                    <p className='text-sm italic'>{genreBook}</p>
                    <p className='text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-[90%]'>{resumeBook}</p>
                </article>
            </Link>
            <div className='flex justify-end items-center'>
                <button
                    type='button'
                    className='mt-4 px-4 py-2 bg-gradient-to-br from-teal-400 via-teal-600 to-cyan-500 text-white text-base font-medium flex items-center justify-center rounded-lg transition ease-in-out hover:scale-105 active:opacity-65'
                    onClick={() => handleAddToReadingList({
                        ISBN: idBook,
                        cover: imgBook,
                        title: titleBook,
                        genre: genreBook,
                        synopsis: resumeBook,
                        author: {
                            name: author.name,
                            otherBooks: author.otherBooks,
                        },
                        pages: pages,
                        year: year,
                    })}
                >
                    <AiOutlineAppstoreAdd className='mx-1' />
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default Cards;