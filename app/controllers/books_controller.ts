import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class BooksController {
  async index({ request, response }: HttpContext) {
    // Check if query q is provided
    const query = request.input('q')
    if (!query) {
      return response.status(400).json({
        status: 'error',
        message: 'Input the search query.',
      })
    }

    // Pagination parameters from the client
    const page = Number(request.input('page', 1)) // Default to 1 if not provided
    const pageSize = Number(request.input('pageSize', 10)) // Default to 10 if not provided

    // Calculate startIndex for Google Books API
    const startIndex = (page - 1) * pageSize

    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: query,
          startIndex: startIndex,
          maxResults: pageSize,
        },
      })

      const books = res.data.items
      const totalItems = res.data.totalItems
      const totalPages = Math.ceil(totalItems / pageSize)

      return response.status(200).json({
        status: 'success',
        message: 'Books retrieved successfully',
        data: {
          currentPage: page,
          pageSize,
          totalPages,
          totalItems,
          books,
        },
      })
    } catch (error) {
      console.error(error)
      return response.status(error.response?.status || 500).json({
        status: 'error',
        message: 'Failed to retrieve books',
      })
    }
  }
}
