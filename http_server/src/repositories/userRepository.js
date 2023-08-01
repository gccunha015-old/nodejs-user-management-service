import { prisma } from "../config/database.js"

class UserRepository {
  constructor(users = prisma.user) {
    this.users = users
  }

  async findAll() {
    return await this.users.findMany()
  }

  async create(user) {
    return await this.users.create({data: user})
  }
}

const userRepository = new UserRepository()

export { userRepository }