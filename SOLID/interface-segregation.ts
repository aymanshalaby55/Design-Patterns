// don't force a class to implement methods it doesn't need.
//  Instead of one fat interface,
// split it into small, focused ones.

interface Iworker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class HumanWorker implements Iworker {
  work() {
    console.log("Working...");
  }
  eat() {
    console.log("Eating...");
  }
  sleep() {
    console.log("Sleeping...");
  }
}

class RobotWorker implements Iworker {
  work() {
    console.log("Working...");
  }
  eat() {
    throw new Error("Robots don't eat!");
  }
  sleep() {
    throw new Error("Robots don't sleep!");
  }
}
// this violates ISP because RobotWorker is forced to implement eat and sleep methods that it doesn't need.

// To fix this, we can split the Iworker interface into smaller interfaces:

interface IWorkable {
  work(): void;
}

interface IEatable {
  eat(): void;
}

interface ISleepable {
  sleep(): void;
}

class HumanWorker2 implements IWorkable, IEatable, ISleepable {
  work() {
    console.log("Working...");
  }
  eat() {
    console.log("Eating...");
  }
  sleep() {
    console.log("Sleeping...");
  }
}

class RobotWorker2 implements IWorkable {
  work() {
    console.log("Working...");
  }
}
// Now RobotWorker2 only implements the IWorkable interface, and is not forced to implement methods it doesn't need.  