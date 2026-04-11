class PremiumStrategy implements pricingStrategy {
  calculatePrice(price: number): number {
    return price * .1;
  }
}