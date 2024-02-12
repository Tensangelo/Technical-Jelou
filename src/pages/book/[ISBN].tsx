import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaUserAlt, FaStar } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

import { GetBooks, Book } from '@/utils/books';
import BackgroundHero from '@/components/tools/BackgroundHero';

const BookDetails = () => {
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
        <div className='h-[50vh] flex justify-center items-center'>
          <p className='text-5xl text-center titleGradient font-bold'>Estamos buscando tu libro...</p>
        </div>
        <div className='flex justify-center items-center relative'>
          <FcSearch className='animate-pulse absolute text-9xl' />
        </div>
      </section>
    )
  }

  return (
    <section>
      <BackgroundHero heigth='5rem' />
      <section className='flex justify-center items-start !mt-12 m-auto py-8 pr-8 shadow-md max-w-max rounded-lg bg-white h-[44rem] relative'>
        <div className='mx-8'>
          <Image
            src={book.cover}
            alt={`portada del libro ${book.title}`}
            width={285}
            height={300}
          />
          <article className='text-base rounded-b-lg bg-white border-2 w-[286px] max-h-[13rem] overflow-auto py-4 pl-4 shadow-xl'>
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
        <div className='w-[1px] h-[38rem] bg-[#cfcfcf] rounded-lg' />
        <div className='mx-8'>
          <article>
            <h1 className='font-bold text-3xl'>{book.title}</h1>
            <article className='text-2xl flex items-center mt-1'>
              <h2 className='font-bold text-[#23b3a3] underline underline-offset-2'>
                {book.author.name}
              </h2>
              <p className='font-light mx-2'>
                (Autor)
              </p>
              <FaUserAlt className='text-[#23b3a3]' />
            </article>
            <p className='font-bold text-lg mt-6'>
              Este libro se encuentra disponible
            </p>
            <section className='my-8 rounded-lg shadow-md p-8 flex justify-between items-center'>
              <div className='flex justify-center items-center'>
                {[1,2,3,4,5].map((count) => {
                  return (
                    <FaStar key={count} className='mx-[1px] text-xl text-[#fcc600] transition ease-in-out hover:scale-110 cursor-pointer' />
                  )
                })}
                <p className='ml-2 text-sm font-medium text-[#23b3a3] hover:text-black hover:cursor-pointer'>80 opiniones</p>
              </div>
              <button
                type='button'
                className='px-4 py-2 bg-gradient-to-br from-teal-400 via-teal-600 to-cyan-500 text-white text-lg font-medium flex items-center justify-center rounded-lg transition ease-in-out hover:scale-105'
              >
                <AiOutlineAppstoreAdd className='mx-1' /> Agregar
              </button>
            </section>
            <h3 className='font-bold text-lg mt-8'>Sinopsis del libro &quot;{book.title}&quot; </h3>
            <p className='text-base max-w-[32rem] mt-4'>
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