jest.mock('node-fetch', () => {
    return require('../mocks/fetch')
})

const fetch = require('node-fetch')
const { getBooks, getBookById, addNewBook, updateBookById, updateBookTitle, deleteBookById } = require('../controllers/bookManagement')
const MockExpressRequest = require('mock-express-request')
const MockExpressResponse = require('mock-express-response')

const getReqAndResMock = ({ id, title, isbn, author } = {}) => {
    const req = new MockExpressRequest({
        params: {
            id
        },
        body: {
            title,
            isbn,
            author
        }
    })
    const res = new MockExpressResponse()

    return { req, res }
}
describe('getBooks()', () => {
    it('should return all books when status is 200', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    json: () => 'data',
                    status: 200
                }
            )
        )
        const { res, req } = getReqAndResMock()
        await getBooks(req, res)

        expect(res.statusCode).toEqual(200)
        expect(res._getJSON()).toEqual('data')

    })
    it('should return 404 code when there is an error', async () => {
        fetch.mockRejectedValue(
            Promise.reject(
                new Error('Error')
            )
        )
        const { req, res } = getReqAndResMock()
        try {
            await getBooks(req, res)
        } catch (err) {
            console.log(err)
        }


        expect(res.statusCode).toEqual(404)
    })
})

describe('getBookById()', () => {
    it('should return 200 when a specfic book is found', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    ok: 'ok',
                    json: () => 'data',
                    status: 200
                }
            )
        )
        const { req, res } = getReqAndResMock({ id: '1' })
        await getBookById(req, res)

        expect(res._getJSON()).toEqual('data')
        expect(res.statusCode).toEqual(200)
    })
    it('should return 404 when no book is found', async () => {
        fetch.mockRejectedValue(
            Promise.reject(
                new Error('message')
            )
        )
        const { req, res } = getReqAndResMock({ id: '1' })
        await getBookById(req, res)

        expect(res.statusCode).toEqual(404)

    })
    it('should return 404 when response is not ok', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    statusText: 'Not Found'
                }

            )
        )
        const { req, res } = getReqAndResMock({ id: '1' })
        await getBookById(req, res)
        expect(res.statusCode).toEqual(404)
        expect(res._getJSON()).toEqual('Not Found')

    })
})

describe('addNewBook()', () => {
    it('should return 201 when a new book is added', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    json: () => 'data',
                    status: 201

                }
            )
        )
        const { req, res } = getReqAndResMock()
        await addNewBook(req, res)

        expect(res._getJSON()).toEqual('data')
        expect(res.statusCode).toEqual(201)
    })
    it('should return 404 when there is an error', async () => {
        fetch.mockRejectedValue(
            Promise.reject(
                new Error('Error')
            )
        )
        const { req, res } = getReqAndResMock()
        await addNewBook(req, res)

        expect(res.statusCode).toEqual(404)
    })
})

describe('updateBookById()', () => {
    it('should return 200 when a book is updated', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    json: () => 'data',
                    status: 200
                }
            )
        )
        const { req, res } = getReqAndResMock()
        await updateBookById(req, res)
        expect(res._getJSON()).toEqual('data')
        expect(res.statusCode).toEqual(200)
    })
    it('should return 404 when there is an error', async () => {
        fetch.mockRejectedValue(
            Promise.reject(
                new Error('Error')
            )
        )

        const { req, res } = getReqAndResMock()
        await updateBookById(req, res)
        expect(res.statusCode).toEqual(404)
    })
})

describe('updateBookTitle()', () => {
    it('should return 201 when updating the title of a specific book', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    json: () => 'data',
                    status: 201
                }
            )
        )

        const { req, res } = getReqAndResMock()
        await updateBookTitle(req, res)
        expect(res._getJSON()).toEqual('data')
        expect(res.statusCode).toEqual(201)
    })
    it('should return 404 when there is an error updating a book title', async () => {
        fetch.mockRejectedValue(
            Promise.reject(
                new Error('Error')
            )
        )
        const { req, res } = getReqAndResMock()
        await updateBookTitle(req, res)
        expect(res.statusCode).toEqual(404)
    })
})

describe('deleteBookById()', () => {
    it('should return 200 when deleting a book', async () => {
        fetch.mockResolvedValue(
            Promise.resolve(
                {
                    json: () => 'data',
                    status: 200
                }
            )
        )
        const { req, res } = getReqAndResMock()
        await deleteBookById(req, res)
        expect(res._getJSON()).toEqual('data')
        expect(res.statusCode).toEqual(200)
    })
    it('should return 404 when there is an error', async () => {
        fetch.mockRejectedValue(
            Promise.reject(
                new Error('Error')
            )
        )

        const { req, res } = getReqAndResMock()
        await deleteBookById(req, res)

        expect(res.statusCode).toEqual(404)
    })
})