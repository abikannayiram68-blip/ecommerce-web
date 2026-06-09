import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    return user.update(data);
  }

  async findAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.userModel.findAndCountAll({
      attributes: { exclude: ['googleId'] },
      offset, limit,
      order: [['createdAt', 'DESC']],
    });
    return { customers: rows, total: count, page, totalPages: Math.ceil(count / limit) };
  }
}
