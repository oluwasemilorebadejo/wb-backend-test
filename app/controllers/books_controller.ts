import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import redis from '@adonisjs/redis/services/main'

export default class BooksController {
  async index({ request, response }: HttpContext) {
    const query = request.input('q')
    if (!query) {
      return response.status(400).json({
        status: 'error',
        message: 'Input the search query.',
      })
    }

    const page = Number(request.input('page', 1))
    const pageSize = Number(request.input('pageSize', 10))
    const startIndex = (page - 1) * pageSize

    // Generate a unique redis key
    const cacheKey = `books-search:${query}:page:${page}:size:${pageSize}`

    try {
      // Try to get cached data
      const cachedData = await redis.get(cacheKey)
      if (cachedData) {
        return response.ok(JSON.parse(cachedData))
      }

      // If no redis, make API request
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: { q: query, startIndex, maxResults: pageSize },
      })

      const booksData = {
        status: 'success',
        message: 'Books retrieved successfully',
        data: {
          currentPage: page,
          pageSize,
          totalPages: Math.ceil(res.data.totalItems / pageSize),
          totalItems: res.data.totalItems,
          books: res.data.items,
        },
      }

      // cache the new data
      await redis.set(cacheKey, JSON.stringify(booksData), 'EX', 1800) // 1800 seconds = 30 minutes

      return response.ok(booksData)
    } catch (error) {
      console.error(error)
      return response.status(error.response?.status || 500).json({
        status: 'error',
        message: 'Failed to retrieve books',
      })
    }
  }
}
