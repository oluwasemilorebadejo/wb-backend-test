import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Bookmark from './bookmark.js'
import JWTService from '#services/jwt_service'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Bookmark)
  declare bookmarks: HasMany<typeof Bookmark>

  // @beforeSave()
  // static async hashPassword(user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await hash.make(user.password)
  //   }
  // }

  // static async verifyCredentials(email: string, password: string) {
  //   const user = await this.query().where('email', email).first()
  //   if (!user) {
  //     throw new Error('Invalid user credentials')
  //   }
  //   const isValid = await hash.verify(user.password, password)
  //   if (!isValid) {
  //     throw new Error('Invalid user credentials')
  //   }
  //   return user
  // }

  generateAuthCookieToken() {
    return JWTService.encodeAuthCookie({
      id: this.id,
      email: this.email,
    })
  }
}
