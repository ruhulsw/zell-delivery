import axios from 'axios';
const API_BASE_URL = 'https://books.zell.al/api';

const GetBook = async ({ BookId }) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/books/SingleBook/${BookId}`
        );
        const apiData = response.data;

        const bookData = {
            bookName: apiData.title || 'Unknown Book',
            bookId: apiData.id || 'Unknown ID',
            updatedAt: apiData.updatedAt || null,
            data: apiData.pages.map((pageContent, index) => ({
                page: index,
                content: pageContent,
            })),
        };

        return bookData;
    } catch (err) {
        console.log('Error fetching book:', err.response?.data || err.message);
        return { message: err.message };
    }
};

export default GetBook;
