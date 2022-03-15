import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SubscriptionPlan } from 'src/enums/subscription-plan.enum';
import StripeService from 'src/stripe.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService,
  ) {}

  public async createMonthlySubscriptionWithPlan(
    createSubscription: CreateSubscriptionDto,
  ) {
    const priceId = this.getApiID(createSubscription.subscriptionPlan);

    const subscriptions = await this.stripeService.listSubscriptions(
      priceId,
      createSubscription.stripeCustomerId,
    );
    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }
    return this.stripeService.createSubscription(
      priceId,
      createSubscription.stripeCustomerId,
    );
  }

  public async getMonthlySubscriptionWithPlan(
    createSubscription: CreateSubscriptionDto,
  ) {
    const subscriptions = await this.stripeService.listSubscriptions(
      this.getApiID(createSubscription.subscriptionPlan),
      createSubscription.stripeCustomerId,
    );

    if (!subscriptions.data.length) {
      throw new NotFoundException();
    }
    return subscriptions.data[0];
  }

  public async cancelSubscriptionPlan(
    createSubscription: CreateSubscriptionDto,
  ) {
    const subscriptionPlan = await this.getMonthlySubscriptionWithPlan(
      createSubscription,
    );
    if (subscriptionPlan) {
      return this.stripeService.cancelSubscription(subscriptionPlan.id);
    }
  }

  getApiID(subscriptionPlan: string) {
    switch (subscriptionPlan) {
      case SubscriptionPlan.PLAN_A:
        return this.configService.get('STRIPE_PLAN_A_API_ID');
      case SubscriptionPlan.PLAN_B:
        return this.configService.get('STRIPE_PLAN_B_API_ID');
      default:
        return this.configService.get('STRIPE_PLAN_A_API_ID');
    }
  }
}
