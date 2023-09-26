import CreateUserController from '@Controllers/CreateUserController'
import User from '@Database/entities/User'
import UserRepository from '@Database/repositories/userRepository'
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
    }
  }
}
