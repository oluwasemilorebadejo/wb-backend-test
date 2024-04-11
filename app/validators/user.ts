import vine from '@vinejs/vine'

/**
 * Validates the create user validator
 */
export const createSignupValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)

export const createLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim().minLength(8),
  })
)
