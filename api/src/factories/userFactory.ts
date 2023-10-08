import AuthenticateUserController from '@Controllers/AuthenticateUserController'
import CreateUserController from '@Controllers/CreateUserController'
import User from '@Database/entities/User'
import UserRepository from '@Database/repositories/userRepository'
import AuthenticateUserService from '@Services/AuthenticateUserService'
import CreateUserService from '@Services/CreateUserService'
import Validator from '@Validators/validator'

export default class UserFactory {
  create(name: string) {
    switch (name) {
      case 'create':
        return new CreateUserController(
          new CreateUserService(new UserRepository(User)),
          new Validator(),
        )
      case 'authenticate':
        return new AuthenticateUserController(
          new AuthenticateUserService(new UserRepository(User)),
          new Validator(),
        )
      default:
        return new CreateUserController(
          new CreateUserService(new UserRepository(User)),
          new Validator(),
        )
    }
  }
}
