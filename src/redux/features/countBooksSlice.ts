import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useQuery } from '@tanstack/react-query';
import { Book } from '@/utils/books';

interface ReadingListState {
    books: Book[];
}

const initialState: ReadingListState = {
    books: [],
}

const readingListSlice = createSlice({
    name: 'readingList',
    initialState,
    reducers: {
        addToReadingList(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        removeFromReadingList(state, action: PayloadAction<string>) {
            state.books = state.books.filter(book => book.ISBN !== action.payload)
        }
    },
})

export const usePersistedReadingList = () => {
    const { data } = useQuery<Book[]>({
        queryKey: ['readingList'],
        queryFn: () => {
            const storedReadingList = localStorage.getItem('readingList');
            return storedReadingList ? JSON.parse(storedReadingList) : [];
        },
    });

    return data || [];
};

export const { addToReadingList, removeFromReadingList } = readingListSlice.actions;
export default readingListSlice.reducer;