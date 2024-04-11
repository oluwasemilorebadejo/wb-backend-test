import type { HttpContext } from '@adonisjs/core/http'
import Bookmark from '#models/bookmark'

export default class BookmarksController {
  // GET ALL MY BOOKMARKS
  async index({ request, response, user }: HttpContext) {
    if (!user) {
      return response.unauthorized('You must be logged in to view bookmarks')
    }

    // Get pagination parameters from the request and set defaults
    const page = request.input('page', 1) // Default to page 1
    const limit = request.input('limit', 10) // Default to 10 items per page

    const bookmarks = await Bookmark.query().where('userId', user.id).paginate(page, limit)

    return response.ok({
      status: 'success',
      message: 'Bookmarks retrieved successfully',
      bookmarks,
    })
  }

  async create({}: HttpContext) {}

  // CREATE A BOOKMARK
  async store({ response, params, user }: HttpContext) {
    if (!user) {
      return 'You must be logged in to perform this operation'
    }

    // Validate request data
    const bookId = params.bookId
    if (!bookId) {
      return response.badRequest('Missing bookId')
    }

    // Check if the bookmark already exists for the user
    const existingBookmark = await Bookmark.query()
      .where('userId', user.id)
      .andWhere('bookId', bookId)
      .first()

    if (existingBookmark) {
      return response.conflict('Bookmark already exists for this user')
    }

    // Create and save the new bookmark
    const bookmark = new Bookmark()
    bookmark.userId = user.id
    bookmark.bookId = bookId
    await bookmark.save()

    return response.ok({
      status: 'success',
      message: 'Bookmark added successfully',
      data: {
        bookmark,
      },
    })
  }

  // DELETE BOOKMARK USING ID
  async destroy({ response, user, params }: HttpContext) {
    // Ensure the user is logged in
    if (!user) {
      return response.unauthorized('You must be logged in to perform this operation')
    }

    const bookId = params.bookId // Assuming 'bookId' is the route parameter
    if (!bookId) {
      return response.badRequest('Missing bookId, Kindly enter a book id to delete the bookmark')
    }

    try {
      // Fetch the bookmark to ensure it exists and belongs to the currently logged-in user
      const bookmark = await Bookmark.query()
        .where('userId', user.id)
        .andWhere('bookId', bookId)
        .first()

      if (!bookmark) {
        // Bookmark not found or does not belong to the user
        return response.notFound('Bookmark not found or not owned by the user')
      }

      // Delete the bookmark
      await bookmark.delete()

      return response.ok({ message: 'Bookmark deleted successfully' })
    } catch (error) {
      console.error('Error deleting bookmark:', error)
      return response.internalServerError('Unable to delete bookmark')
    }
  }
}
