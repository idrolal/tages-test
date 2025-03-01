import axios from 'axios';

export const $api = axios.create({
	// тут можно вставить адрес бэка
	baseURL: import.meta.env.VITE_BASE_URL
});


