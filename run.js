// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input) {
  const targets = input.cart.lines
    .filter((line) => {
      if (line.merchandise.__typename === "ProductVariant") {
        const hasLimitedEditionTag = line.merchandise.product.hasAnyTag;
        return hasLimitedEditionTag === false;
      }
      return false;
    })
    .map((line) => {
      return {
        productVariant: {
          id: line.merchandise.id,
        },
      };
    });

  if (targets.length === 0) {
    return EMPTY_DISCOUNT;
  }

  const DISCOUNTED_ITEMS = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        targets: targets,
        value: {
          percentage: {
            value: 10,
          },
        },
        message: "10% OFF",
      },
    ],
  };

  return DISCOUNTED_ITEMS;
}
