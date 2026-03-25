
class OnlineMarketPlace {
  users: Set<User> = {};
  products: Product[] = [];
  offers: Offer[] = [];


  constructor() {
    this.users = [];
    this.products = [];
    this.offers = [];
  }

  addUser(user: User) {
    this.users.push(user);
  }
  addProduct(name: string , price: number) {
    this.products.push(new Product(name , price));

  }

  addOffer(message: string) {
    this.offers.push(new Offer(message))
  }
}