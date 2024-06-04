import request from '@/utils/request'

export const insertWord = (name, trans) => request.post('/insert', { name, trans })

export const getWords = () => request.get('/select')