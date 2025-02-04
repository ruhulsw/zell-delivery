import axios from 'axios';
const API_BASE_URL = 'https://books.zell.al/api';

const GetAllCategory = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/category/all?page=1&limit=10`
        );
        return response.data.categories;
    } catch (err) {
        return { message: err.message };
    }
};

export default GetAllCategory;
