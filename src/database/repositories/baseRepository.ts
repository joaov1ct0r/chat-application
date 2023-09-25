import databaseClient from '@Database/config/data-source'
import { Repository, EntityTarget, FindOptionsWhere } from 'typeorm'

export interface IBaseRepository<S> {
  create(item: Omit<S, 'id'>): Promise<S>
  findOne(key: string, value: string): Promise<S | null>
}

export abstract class BaseRepository<S extends object>
  implements IBaseRepository<S>
{
  private readonly _collection: Repository<S>

  constructor(repository: EntityTarget<S>) {
    this._collection = databaseClient.getRepository(repository)
  }

  public async create(item: S): Promise<S> {
    const result = await this._collection.create({ ...item })
    await this._collection.save(result)

    return result
  }

  public async findOne(key: string, value: string): Promise<S | null> {
    const result = await this._collection.findOne({
      where: {
        [key]: value,
      } as FindOptionsWhere<S>,
    })

    return result
  }
}
