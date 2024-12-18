import { Product } from "./Product";
import { Offer } from "./Offer";
import { SpecialOfferType } from "./SpecialOfferType";
import { Receipt } from "./Receipt";
import { SantamarketCatalog } from "./SantamarketCatalog";
import { Discount } from "./Discount";
import { BuyXGetYOffer } from "./BuyXGetYOffer";

export class ShoppingSleigh {
  private items: { product: Product; quantity: number }[] = [];
  private productQuantities: Map<Product, number> = new Map();

  getItems(): { product: Product; quantity: number }[] {
    return [...this.items];
  }

  addItem(product: Product): void {
    this.addItemQuantity(product, 1.0);
  }

  addItemQuantity(product: Product, quantity: number): void {
    this.items.push({ product, quantity });
    const currentQuantity = this.productQuantities.get(product) || 0;
    this.productQuantities.set(product, currentQuantity + quantity);
  }

  handleOffers(
    receipt: Receipt,
    offers: Map<Product, Offer>,
    catalog: SantamarketCatalog
  ): void {
    this.productQuantities.forEach((quantity, product) => {
      if (offers.has(product)) {
        const offer = offers.get(product);
        const unitPrice = catalog.getUnitPrice(product);

        let discount: Discount | null = null;
        let discountLabel: string;
        let discountAmount: number;
        let x = 1;
        let y: number;

        if (offer.offerType === SpecialOfferType.THREE_FOR_TWO) {
          discount = this.xForYDiscountCalculation(
            product,
            quantity,
            new BuyXGetYOffer(3, 2),
            unitPrice
          );
        } else if (offer.offerType === SpecialOfferType.TWO_FOR_ONE) {
          discount = this.xForYDiscountCalculation(
            product,
            quantity,
            new BuyXGetYOffer(2, 1),
            unitPrice
          );
        } else {
          const quantityAsInt = Math.floor(quantity);

          if (offer.offerType === SpecialOfferType.TWO_FOR_AMOUNT) {
            x = 2;

            if (quantityAsInt >= x) {
              const discountedPrice =
                offer.argument * Math.floor(quantityAsInt / x) +
                (quantityAsInt % x) * unitPrice;

              discountAmount = quantity * unitPrice - discountedPrice;
              discountLabel = `${x} for ${offer.argument}`;
              discount = new Discount(product, discountLabel, -discountAmount);
            }
          }

          if (offer.offerType === SpecialOfferType.FIVE_FOR_AMOUNT) {
            x = 5;
            const numberOfXs = Math.floor(quantityAsInt / x);
            if (quantityAsInt >= x) {
              const discountedPrice =
                offer.argument * numberOfXs + (quantityAsInt % x) * unitPrice;

              discountAmount = quantity * unitPrice - discountedPrice;
              discountLabel = `${x} for ${offer.argument}`;
              discount = new Discount(product, discountLabel, -discountAmount);
            }
          }

          if (offer.offerType === SpecialOfferType.TEN_PERCENT_DISCOUNT) {
            discountAmount = quantity * unitPrice * (offer.argument / 100);
            discountLabel = `${offer.argument}% off`;
            discount = new Discount(product, discountLabel, -discountAmount);
          }
        }

        if (discount) {
          receipt.addDiscount(discount);
        }
      }
    });
  }

  private xForYDiscountCalculation(
    product: Product,
    quantity: number,
    offer: BuyXGetYOffer,
    unitPrice: number
  ): Discount {
    const quantityAsInt = Math.floor(quantity);
    const numberOfXs = Math.floor(quantityAsInt / offer.x);
    if (quantityAsInt < offer.x) {
      return null;
    }

    const discountAmount =
      unitPrice * (quantity - numberOfXs * offer.y - (quantityAsInt % offer.x));

    return new Discount(product, `${offer.x} for ${offer.y}`, -discountAmount);
  }
}
