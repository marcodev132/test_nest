import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import StripeService from 'src/stripe.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, StripeService, ConfigService],
})
export class SubscriptionModule {}
