class User implements subscriber{
  _name: string | undefined;
  _isSubscribedToProducts: boolean | undefined;
  _isSubscribedToOffers: boolean | undefined;

  constructor(name: string, isSubscribedToProducts: boolean, isSubscribedToOffers: boolean) {
    this._name = name;
    this._isSubscribedToProducts = isSubscribedToProducts;
    this._isSubscribedToOffers = isSubscribedToOffers;
  }

  get name(): string {
    return this.name;
  }

  set name(name: string) {
    this._name = name;
  }

  get isSubscribedToProducts(): boolean {
    return this.isSubscribedToProducts;
  }

  set isSubscribedToProducts(isSubscribedToProducts: boolean) {
    this._isSubscribedToProducts = isSubscribedToProducts;
  }

  get isSubscribedTooffers(): boolean {
    return this.isSubscribedTooffers;
  }

  set isSubscribedTooffers(isSubscribedTooffers: boolean) {
    this._isSubscribedToOffers = isSubscribedTooffers;
  }

  notify(message: string){
    
  }
}