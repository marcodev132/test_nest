import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ErrorGeneralModel } from '../general/error.general.model';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Post('plan')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('apiKey', ['apiKey'])
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Unauthorized`,
    type: ErrorGeneralModel,
  })
  async createMonthlySubscriptionWithPlan(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.createMonthlySubscriptionWithPlan(
      createSubscriptionDto,
    );
  }
  @Post('monthly-plan')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('apiKey', ['apiKey'])
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Unauthorized`,
    type: ErrorGeneralModel,
  })
  async getMonthlySubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.getMonthlySubscriptionWithPlan(
      createSubscriptionDto,
    );
  }

  @Patch('')
  @UseGuards(AuthGuard('api-key'))
  @ApiSecurity('apiKey', ['apiKey'])
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Unauthorized`,
    type: ErrorGeneralModel,
  })
  cancelSubscriptionPlan(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.cancelSubscriptionPlan(
      createSubscriptionDto,
    );
  }
}
