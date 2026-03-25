class Offer {
  _message: string | undefined;

  constructor(message: string) {
    this._message = message;

  }

  get message(): string {
    return this.message;
  }

  set message(message: string) {
    this._message = message;
  }

}