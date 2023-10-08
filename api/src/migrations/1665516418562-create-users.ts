import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsers1665516418562 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'string',
            isUnique: true,
            length: '100'
          },
          {
            name: 'nome',
            type: 'string',
            length: '100'
          },
          {
            name: 'nascimento',
            type: 'string',
            length: '10'
          },
          {
            name: 'senha',
            type: 'string',
            length: '250'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
