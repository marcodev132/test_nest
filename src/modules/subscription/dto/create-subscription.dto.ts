import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionPlan } from 'src/enums/subscription-plan.enum';
import CreateCreditCardDto from 'src/modules/general/create-credit-card.dto';

export class CreateSubscriptionDto extends CreateCreditCardDto {
  @ApiPropertyOptional({
    type: String,
    enum: Object.values(SubscriptionPlan),
    required: false,
  })
  subscriptionPlan: SubscriptionPlan;
}
