import { randomUUID } from 'node:crypto';
import { prisma } from '@config/database';
import { CreateUserDto } from './dtos/create-user';

class UserRepository {
  constructor(private readonly users = prisma.user) {}

  async findAll() {
    return await this.users.findMany();
  }

  async create(createUserDto: CreateUserDto) {
    return await this.users.create({
      data: {
        ...createUserDto,
        external_id: randomUUID(),
        created_at: new Date()
      }
    });
  }
}

const userRepository = new UserRepository();

export { userRepository };
