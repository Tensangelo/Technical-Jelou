import Link from "next/link";
import { IoLibrary } from "react-icons/io5";

const Hero = () => {
    return (
        <div className="h-[35rem]">
            <div className={`bg-[url(https://wallpapercave.com/wp/wp12063315.jpg)] bg-[center_top_-4rem] bg-cover absolute w-full h-[39rem] top-0 z-[-1] brightness-75`} />
            <article className='text-center flex justify-center items-center h-full flex-col'>
                <p className="text-white font-bold my-4 text-4xl sm:text-5xl lg:text-6xl">Dale vida a los libros</p>
                <p className="text-white text-xl sm:text-2xl">Descubre historias fascinantes a través de este sitio</p>
                <Link
                    className="text-white my-8 flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-600 to-cyan-500 rounded-lg px-4 py-2 transition ease-in-out hover:scale-110 text-base md:text-lg"
                    href={'/Library'}
                >
                    <IoLibrary />
                    <p className="mx-2">Ver biblioteca</p>
                </Link>
            </article>
        </div>
    )
}

export default Hero;