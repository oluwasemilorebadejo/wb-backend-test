/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

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
    router.get('/', async () => {
      return {
        bookmarks: ['bookmark1', '2', 'bookmark3'],
      }
    })

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

router.post('/api/v1/auth/signup', async () => {})

router.get('/api/v1/auth/login', async () => {})
