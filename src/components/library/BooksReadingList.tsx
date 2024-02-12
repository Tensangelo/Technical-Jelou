// Redux
import { RootState } from '@/pages/redux/store';
// Hooks
import { useAppSelector } from '@/pages/redux/hooks';
// Icons
import { GiOpenBook } from "react-icons/gi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
// Components
import PreviewList from '@/components/tools/SliderList/PreviewList';
// utils
import { Book } from '@/utils/books';

const BooksReadingList = () => {
    const readingList = useAppSelector((state: RootState) => state.readingList.books);

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-[#23b3a3]">
                <GiOpenBook className='mx-1' />
                Lista de Lectura
            </h2>
            <div className='w-[85%] h-[1px] bg-[#1a93a6] m-auto !mt-4' />
            {readingList.length === 0 ? (
                <div className='flex justify-center items-center flex-col h-[75vh]'>
                    <p className='text-center text-2xl' >No hay libros en tu lista de lectura.</p>
                    <MdOutlineBookmarkAdd className='text-3xl mt-4' />
                </div>
            ) : (
                <>
                    {readingList.map((book: Book) => (
                    <PreviewList
                        key={book.ISBN}
                        idBook={book.ISBN}
                        imgBook={book.cover}
                        titleBook={book.title}
                        genreBook={book.genre}
                        author={book.author}
                    />
                    ))}
                </>
            )}
        </>
    )
}

export default BooksReadingList;