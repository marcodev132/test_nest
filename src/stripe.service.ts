import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async createSubscription(priceId: string, customerId: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
      });
    } catch (error) {
      if (error?.code === 'resource_missing') {
        throw new BadRequestException('Credit card missing');
      }
      throw new InternalServerErrorException();
    }
  }

  public async cancelSubscription(subscriptionId: string) {
    try {
      return await this.stripe.subscriptions.del(subscriptionId);
    } catch (error) {
      throw new BadRequestException('Not found subscription');
    }
  }

  createDefaultPaymentMethod() {
    return this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 3,
        exp_year: 2050,
        cvc: '314',
      },
    });
  }

  public async attachCreditCard(stripeCustomerId: string) {
    try {
      const paymentMethod = await this.createDefaultPaymentMethod();
      await this.stripe.paymentMethods.attach(paymentMethod.id, {
        customer: stripeCustomerId,
      });
      return await this.stripe.customers.update(stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });
    } catch (error) {
      console.log(error);
      if (error?.type === 'StripeInvalidRequestError') {
        throw new BadRequestException('Wrong credit card');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listSubscriptions(priceId: string, customerId: string) {
    return this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId,
    });
  }
}
