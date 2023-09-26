import User from '@Database/entities/User'
import { BaseRepository } from '@Database/repositories/baseRepository'

export default class UserRepository<S extends User> extends BaseRepository<S> {}
