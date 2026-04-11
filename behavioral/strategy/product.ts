class Items {
  constructor(name: string, price: number, pricingStartegy: pricingStrategy) {
  }

  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getPrice(): number {
    return this.price;
  }

  set setPrice(price: number) {
    this.price = price;
  }

  // calc
  public calculatePrice(){
    return this.pricingStartegy.calculatePrice(this.price);
  }
}