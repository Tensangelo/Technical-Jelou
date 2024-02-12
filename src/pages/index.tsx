import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
// Components
import { GetBooks, Book } from '@/utils/books';
import Hero from "@/components/Hero";

import { IoLibrary } from "react-icons/io5";
import CardsBooks, { ContainerCards } from "@/components/tools/Cards";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dataBooks, setDataBooks] = useState<Book[]>([]);

    useEffect(() => {
        const loadBooks = async () => {
            const data = await GetBooks();
            setDataBooks(data);
        }

        loadBooks();
    }, []);

  return (
    <>
      <Hero />
      <section>
        <article className={`flex justify-start items-center text-4xl ml-8 mt-8 font-bold`}>
            <IoLibrary className='text-[#23b3a3]' />
            <p className="mx-2 italic unde titleGradient">Novedades</p>
        </article>
        <div className='w-[85%] h-[1px] bg-[#1a93a6] m-auto !mt-4' />
        <ContainerCards>
          {dataBooks.slice(0, 10).map((listBooks) => {
            return (
              <CardsBooks
                key={listBooks.ISBN}
                idBook={listBooks.ISBN}
                imgBook={listBooks.cover}
                titleBook={listBooks.title}
                genreBook={listBooks.genre}
                resumeBook={listBooks.synopsis}
                author={listBooks.author}
                pages={listBooks.pages}
                year={listBooks.year}
              />
            )
          })}
        </ContainerCards>
      </section>
    </>
  );
}