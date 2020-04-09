import axios from 'axios'

const api = axios.create({
  baseURL: '/api' // express
})

export const insertBook = payload => api.post(`/book`, payload)
export const getAllBooks = () => api.get(`/books`)
export const updateBookById = (_id, payload) => api.put(`/book/${_id}`, payload)
export const deleteBookById = _id => api.delete(`/book/${_id}`)
export const getBookById = _id => api.get(`/book/${_id}`)
// new
export const getBooksByTwitterId = twitterId => api.get(`/books/twitterid/${twitterId}`)

export const insertRequest = payload => api.post(`/request`, payload)
export const getAllRequests = () => api.get(`/requests`)
export const updateRequestById = (_id, payload) => api.put(`/request/${_id}`, payload)
export const deleteRequestById = _id => api.delete(`/request/${_id}`)
export const getRequestById = _id => api.get(`/request/${_id}`)
// new
export const getRequestsByTwitterId = twitterId => api.get(`/requests/twitterid/${twitterId}`)
export const getRequestsByGiveBookId = give_book_id => api.get(`/requests/givebookid/${give_book_id}`)
export const getRequestsByTakeBookId = take_book_id => api.get(`/requests/takebookid/${take_book_id}`)
export const getRequestsByTakeOk = take_ok => api.get(`/requests/takeok/${take_ok}`)
export const deleteRequestByGiveBookId = give_book_id => api.delete(`/requests/givebookid/${give_book_id}`)
export const deleteRequestByTakeBookId = take_book_id => api.delete(`/requests/takebookid/${take_book_id}`)

export const getAllUsersTwitter = () => api.get(`/userstwitter`)
export const updateUserByTwitterId = (twitterId, payload) => api.put(`/usertwitter/${twitterId}`, payload)
export const getUserByTwitterId = twitterId => api.get(`/usertwitter/${twitterId}`)

const apis = {
    insertBook,
    getAllBooks,
    updateBookById,
    deleteBookById,
    getBookById,

    insertRequest,
    getAllRequests,
    updateRequestById,
    deleteRequestById,
    getRequestById,
    getRequestsByTwitterId,
    getRequestsByGiveBookId,
    getRequestsByTakeBookId,
    getRequestsByTakeOk,
    deleteRequestByGiveBookId,
    deleteRequestByTakeBookId,

    getAllUsersTwitter,
    updateUserByTwitterId,
    getUserByTwitterId,
}

export default apis
