/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BookmarksController = () => import('#controllers/bookmarks_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router.where('id', {
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
})

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/', async () => {
      return {
        books: ['chiamaka', 'chiamanda', 'chiamaka'],
      }
    })
  })
  .prefix('api/v1/books')

router
  .group(() => {
    router.get('/', [BookmarksController, 'index'])

    router.delete('/:id', async ({ params }) => {
      return {
        bookmark: `deleted ${params.id}`,
      }
    })
  })
  .prefix('api/v1/bookmarks')

// router.get('/bookmarks/:id', async ({ params }) => {
//   return {
//     id: `${params.id}`,
//     type: typeof params.id,
//   }
// })

router
  .group(() => {
    router.post('/signup', [AuthController, 'register'])

    router.post('/login', [AuthController, 'login'])
  })
  .prefix('api/v1/auth')
