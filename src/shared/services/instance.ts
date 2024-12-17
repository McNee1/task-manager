import ky from 'ky';

const url = 'http://localhost:5173' as string;

export const api = ky.create({ prefixUrl: url });
