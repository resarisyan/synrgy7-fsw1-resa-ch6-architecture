import { Model } from 'objection';

interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>;
}

type BaseRepository<T extends Model> = Reader<T>;

export abstract class KnexRepository<T extends Model>
  implements BaseRepository<T>
{
  constructor(public readonly modelClass: typeof Model & { new (): T }) {}

  public async find(item: Partial<T>): Promise<T[]> {
    return this.modelClass.query().where(item) as unknown as Promise<T[]>;
  }

  public async insert(item: Partial<T>): Promise<T> {
    const inserted = await this.modelClass.query().insert(item);
    return inserted as T;
  }
}
