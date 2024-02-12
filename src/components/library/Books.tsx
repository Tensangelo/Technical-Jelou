import { useEffect, useState } from 'react';
// Components
import { GetBooks, Book } from '@/utils/books';
import CardsBooks from '../tools/Cards';
// Icons
import { IoLibrary } from "react-icons/io5";
import FilterSelect from '../tools/SelectFilter';

const Books = () => {

    const [dataBooks, setDataBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [authorFilter, setAuthorFilter] = useState<string | null>(null);
    const [genreFilter, setGenreFilter] = useState<string | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            const data = await GetBooks();
            setDataBooks(data);
        }

        loadBooks();
    }, []);

    // Obtener lista única de autores y géneros
    const authors = Array.from(new Set(dataBooks.map(book => book.author.name)));
    const genres = Array.from(new Set(dataBooks.map(book => book.genre)));

    // Filtrar libros por nombre, autor y género seleccionados
    const filteredBooks = dataBooks.filter(book => (
        (!authorFilter || book.author.name === authorFilter) &&
        (!genreFilter || book.genre === genreFilter) &&
        (!searchQuery || book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ));

    return (
        <>
            <section className='flex justify-center items-center mt-8 flex-wrap 2xl:justify-between'>
                <article className={`flex justify-start items-center text-4xl ml-8 font-bold`}>
                    <IoLibrary className='text-[#23b3a3]' />
                    <p className="mx-2 mr-4 italic unde titleGradient">Biblioteca</p>
                </article>
                <input
                    type="text"
                    placeholder="Buscar por nombre del libro..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-[90%] my-4 py-2 px-4 border rounded-lg border-[#23b3a3] outline-none md:w-[40rem] lg:ml-4 xl:m-0'
                />
                <div className='m-auto xl:m-0 xl:mr-8 flex justify-center items-center'>
                    <FilterSelect
                        options={authors}
                        value={authorFilter}
                        onChange={setAuthorFilter}
                    />
                    <FilterSelect
                        options={genres}
                        value={genreFilter}
                        onChange={setGenreFilter}
                    />
                </div>
            </section>
            <div className='w-[80%] h-[1px] bg-[#1a93a6] my-4 m-auto' />
            <section>
                <div className='flex justify-center items-center my-8 transition ease-in-out flex-row flex-wrap'>
                    {filteredBooks.map(book => (
                        <CardsBooks
                            key={book.ISBN}
                            idBook={book.ISBN}
                            imgBook={book.cover}
                            titleBook={book.title}
                            genreBook={book.genre}
                            resumeBook={book.synopsis}
                            author={book.author}
                            pages={book.pages}
                            year={book.year}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Books;