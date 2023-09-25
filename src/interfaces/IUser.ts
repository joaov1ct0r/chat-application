import User from '../database/entities/User'

export default interface IUser extends User {
  id: number
  name: string
  email: string
  dateBirth: string
  password: string
}
