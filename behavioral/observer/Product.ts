class Product {
  _name: string | undefined;
  _price: number | undefined;

  constructor(name: string, price: number) {
    this._name = name;
    this._price = price;
  }

  get name(): string {
    return this.name;
  }

  set name(name: string) {
    this._name = name;
  }

  get price(): number | undefined {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }
}