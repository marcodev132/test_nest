import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ErrorGeneralModel } from '../general/error.general.model';
import CreateCreditCardDto from '../general/create-credit-card.dto';
import StripeService from 'src/stripe.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly stripeService: StripeService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('apiKey', ['apiKey'])
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Unauthorized`,
    type: ErrorGeneralModel,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-credit-cards')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('apiKey', ['apiKey'])
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Unauthorized`,
    type: ErrorGeneralModel,
  })
  async addCreditCard(@Body() creditCard: CreateCreditCardDto) {
    return this.stripeService.attachCreditCard(creditCard.stripeCustomerId);
  }

  @Get()
  findAll() {
    return this.userService.getUserList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(Number(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('apiKey', ['apiKey'])
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Unauthorized`,
    type: ErrorGeneralModel,
  })
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
