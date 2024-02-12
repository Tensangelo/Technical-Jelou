import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
// Redux
import { addToReadingList } from '@/redux/features/countBooksSlice';
import { RootState } from '@/redux/store';
// Hooks
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
// Icons
import { FaUserAlt, FaStar } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

import { GetBooks, Book } from '@/utils/books';
import BackgroundHero from '@/components/tools/BackgroundHero';

const BookDetails = () => {
  const dispatch = useAppDispatch();
  const readingList = useAppSelector((state: RootState) => state.readingList.books);

  const router = useRouter();
  const { ISBN } = router.query;
  const [book, setBook] = useState<Book | null>(null);


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const books = await GetBooks();
        const foundBook = books.find((b: Book) => b.ISBN === ISBN);
        setBook(foundBook || null);
      } catch (error) {
        console.error('Error, el libro no se encuentra disponible', error);
      }
    };

    if (ISBN) {
      fetchBookDetails();
    }
  }, [ISBN]);

  if (!book) {
    return (
      <section>
        <BackgroundHero heigth='5rem' />
        <div className='h-[68.6vh] flex justify-center items-center'>
          <p className='text-5xl text-center titleGradient font-bold'>Estamos buscando tu libro...</p>
          <FcSearch className='animate-pulse text-6xl' />
        </div>
      </section>
    )
  }

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
    <section>
      <BackgroundHero heigth='5rem' />
      <section className='flex justify-center items-start flex-wrap !mt-12 m-auto py-0 sm:py-8 shadow-md max-w-max rounded-lg bg-white relative mb-16'>
        <div className='mx-0 sm:mx-8 flex justify-between flex-wrap xl:block'>
          <Image
            src={book.cover}
            alt={`portada del libro ${book.title}`}
            width={285}
            height={300}
            className='m-auto'
          />
          <article className='text-base rounded-b-lg bg-white border-2 w-[286px] max-h-[auto] overflow-auto py-4 pl-4 shadow-xl m-auto xl:max-h-[22rem]'>
            <p>
              <b>Autor:</b>
              <br />
              <span className='underline mx-2 font-semibold text-[#23b3a3]'>{book.author.name}</span>
            </p>
            <p className='my-1'>
              <b>Género:</b>
              <br />
              <span className='mx-2'>{book.genre}</span>
            </p>
            <p className='my-1'>
              <b>Año de publicación:</b>
              <br />
              <span className='mx-2'>{book.year}</span>
            </p>
            <p className='my-1'>
              <b>N° páginas:</b>
              <br />
              <span className='mx-2'>{book.pages}</span>
            </p>
            <p className='my-1'>
              <b>ISBN:</b>
              <br />
              <span className='mx-2'>{book.ISBN}</span>
            </p>
          </article>
        </div>
        <div className='w-[1px] h-[38rem] bg-[#cfcfcf] rounded-lg hidden xl:block' />
        <div className='mx-0 mt-8 sm:mx-8 xl:mt-0'>
          <article>
            <h1 className='font-bold text-2xl md:text-3xl text-center md:text-start'>
              {book.title}
            </h1>
            <article className='text-xl md:text-2xl flex items-center justify-center md:justify-start mt-1'>
              <h2 className='font-bold text-[#23b3a3] underline underline-offset-2'>
                {book.author.name}
              </h2>
              <p className='font-light mx-2'>
                (Autor)
              </p>
              <FaUserAlt className='text-[#23b3a3]' />
            </article>
            <p className='font-bold text-base md:text-lg text-center lg:text-start mt-6'>
              Este libro se encuentra disponible
            </p>
            <section className='mt-2 sm:my-8 rounded-lg shadow-md p-4 sm:p-8 flex justify-around items-center flex-wrap sm:justify-between'>
              <div className='flex justify-center items-center'>
                {[1,2,3,4,5].map((count) => {
                  return (
                    <FaStar key={count} className='mx-[1px] text-xl text-[#fcc600] transition ease-in-out hover:scale-125 cursor-pointer' />
                  )
                })}
                <p className='ml-2 text-sm font-medium text-[#23b3a3] hover:text-black hover:cursor-pointer'>80 opiniones</p>
              </div>
              <button
                type='button'
                className='px-4 py-2 bg-gradient-to-br from-teal-400 via-teal-600 to-cyan-500 text-white text-lg font-medium flex items-center justify-center rounded-lg transition ease-in-out hover:scale-105 mt-4 sm:mt-0'
                onClick={() => handleAddToReadingList({
                  ISBN: book.ISBN,
                  cover: book.cover,
                  title: book.title,
                  genre: book.genre,
                  synopsis: book.synopsis,
                  author: {
                      name: book.author.name,
                      otherBooks: book.author.otherBooks,
                  },
                  pages: book.pages,
                  year: book.year,
                })}
              >
                <AiOutlineAppstoreAdd className='mx-1' /> Agregar
              </button>
            </section>
            <h3 className='font-bold w-[80%] text-center text-base m-auto sm:m-0 sm:text-start sm:text-lg !mt-8'>Sinopsis del libro &quot;{book.title}&quot; </h3>
            <p className='text-base w-[80%] sm:w-[100%] m-auto mt-4 mb-8'>
              {book.synopsis}
            </p>
          </article>
        </div>
        <div className="overlay-ribbon" />
      </section>
    </section>
  );
};

export default BookDetails;