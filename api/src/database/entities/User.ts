import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    unique: true,
    length: 100,
    nullable: false,
  })
  email!: string

  @Column({
    length: 100,
    nullable: false,
  })
  name!: string

  @Column({
    length: 10,
    nullable: false,
  })
  dateBirth!: string

  @Column({
    length: 250,
    nullable: false,
  })
  password!: string
}

export default User
