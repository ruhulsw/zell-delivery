import axios from 'axios';
const API_BASE_URL = 'https://books.zell.al/api';

const GetBooks = async ({ subCategoryId }) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/books/subCategory/${subCategoryId}`
        );
        return response.data.books;
    } catch (err) {
        console.log('Error fetching books:', err.response.data);
        return { message: err.message };
    }
};

export default GetBooks;
