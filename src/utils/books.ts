export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: {
    name: string;
    otherBooks: string[];
  };
}

interface LibraryItem {
  book: Book;
}

interface ApiResponse {
  library: LibraryItem[];
}

interface DefaultApiResponse {
  default: ApiResponse;
}

export const GetBooks = async (): Promise<Book[]> => {
  try {

    const response = await fetch('https://jelou-prueba-tecnica1-frontend.rsbmk.workers.dev', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Error al encontrar libros');
    }

    const data: DefaultApiResponse = await response.json();

    const books = data.default.library.map(item => item.book);
    return books;

  } catch (error) {

    console.error('Error de datos:', error);
    return [];
  }
};