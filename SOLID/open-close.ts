// open close principle
// means that modules should be open for extension but closed for modification


// ❌ bad example
// what if “We want to add Stripe.”
// so we will need to modify the existing code,
//  which can introduce bugs and break existing functionality
class PaymentProcessor {
  processPayment(paymentType: string, amount: number) {
    if (paymentType === "credit_card") {
      console.log("Processing credit card payment");
      // credit card logic
    } else if (paymentType === "paypal") {
      console.log("Processing PayPal payment");
      // paypal logic
    } else {
      throw new Error("Unsupported payment type");
    }
  }
}


// ✅
// how to fix this.

// create interface for payment method
interface PaymentMethod {
  process(amount: number): void;
}

// each payment method should implement the interface
class CreditCardPayment implements PaymentMethod {
  process(amount: number) {
    console.log("Processing credit card payment");
    // credit card logic
  }
}

class PayPalPayment implements PaymentMethod {
  process(amount: number) {
    console.log("Processing PayPal payment");
    // paypal logic
  }
}

// ...etc for other payment methods

// payment processor only depends on the interface, not the concrete implementations
class PaymentProcessor2 {
  constructor(private paymentMethod: PaymentMethod) {}

  processPayment(amount: number) {
    this.paymentMethod.process(amount);
  }
}

// now if you want to add Stripe,
// create a class that implements the interface payment method and pass it to the payment processor,
//  no need to modify existing code