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

    // USERS
    // router
    //   .group(() => {
    //     // GET ALL
    //     router.get("/", [UsersController, "all"]);
    //     // GET BY ID
    //     router.get("/:id", [UsersController, "show"]);
    //     // CREATE
    //     router.post("/", [UsersController, "store"]);
    //     // EDIT
    //     router.put("/:id", [UsersController, "putProfile"]);
    //     // DELETE
    //     router.delete("/:id", [UsersController, "destroy"]);
    //   })
    //   .prefix("/users")
    //   .use(
    //     middleware.cookieAuth({
    //       roles: [UserRole.ADMIN],
    //     })
    //   );

    // USER
    router
      .group(() => {
        // UNAUTH ACCOUNT
        router.post('/login', [AuthController, 'login'])
        router.delete('/logout', [AuthController, 'logout'])
        router.post('/signup', [AuthController, 'register'])
      })
      .prefix('/auth')

    router
      .group(() => {
        // AUTH ACCOUNT
        router.get('/my-bookmarks', [BookmarksController, 'index'])
        router.post('/:bookId', [BookmarksController, 'store'])
        router.delete('/:bookId', [BookmarksController, 'destroy'])
      })
      .use(middleware.cookieAuth())
      .prefix('/bookmarks')

    router.get('/books', [BooksController, 'index'])
  })
  .prefix('/api/v1')
