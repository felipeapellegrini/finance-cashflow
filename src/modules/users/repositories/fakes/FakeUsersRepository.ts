import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 } from 'uuid';
import IUsersRepository from '../IUsersRepository';
import User from '../../infra/typeorm/entities/Users';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(key => key.email === email);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(key => key.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
