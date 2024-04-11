import type { HttpContext } from '@adonisjs/core/http'

import { createSignupValidator, createLoginValidator } from '#validators/user'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createSignupValidator)

    // Check if User already exists
    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      return response.conflict('User already exists')
    }

    // Create and save the new User
    const user = new User()
    user.username = payload.username
    user.email = payload.email
    user.password = payload.password

    await user.save()

    return response.ok({
      status: 'success',
      message: 'User sucessfully created',
      data: {
        user,
      },
    })
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createLoginValidator)

    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      const token = user.generateAuthCookieToken()
      return response.cookie('auth_token', token)
    } catch (error) {
      console.log(error)
      return response.badRequest('Invalid Credentials')
    }
  }

  async logout({ response }: HttpContext) {
    response.clearCookie('auth_token')
  }
}
