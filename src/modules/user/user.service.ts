import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import StripeService from 'src/stripe.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const stripeCustomer = await this.stripeService.createCustomer(
        data.name,
        data.email,
      );
      if (stripeCustomer) {
        return await this.prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            stripeCustomerId: stripeCustomer.id,
          },
        });
      }
      throw new BadRequestException('Can not create new user on striple');
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        }
      }
      throw new BadRequestException('Can not create new user');
    }
  }

  async getUserList() {
    return this.prisma.user.findMany();
  }

  async findOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('No user with id:' + id);
    }
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
