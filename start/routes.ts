/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const BookmarksController = () => import('#controllers/bookmarks_controller')
const AuthController = () => import('#controllers/auth_controller')
const BooksController = () => import('#controllers/books_controller')

router.on('/').redirect('/v1')

router
  .group(() => {
    // INDEX
    router.get('/', () => {
      return 'Hello world from the home page.'
    })

    // USER
    router
      .group(() => {
        // UNAUTHOURIZED ROUTES
        router.post('/login', [AuthController, 'login'])
        router.delete('/logout', [AuthController, 'logout'])
        router.post('/signup', [AuthController, 'register'])
      })
      .prefix('/auth')

    router
      .group(() => {
        // AUTHOURIZED ROUTES
        router.get('/my-bookmarks', [BookmarksController, 'index'])
        router.post('/:bookId', [BookmarksController, 'store'])
        router.delete('/:bookId', [BookmarksController, 'destroy'])
      })
      .use(middleware.cookieAuth())
      .prefix('/bookmarks')

    router.get('/books', [BooksController, 'index'])
  })
  .prefix('/api/v1')
