// is c is sub-type of P, then objects of type P in a program maybe replaced with objects of type c wihtout altering any of the desirable properties of that program.

// Practical Rules for LSP
// A subclass must NOT:
// Remove behavior expected by the parent
// Throw new exceptions that the parent didn't
// Strengthen preconditions
// Weaken postconditions

class Employee {
    constructor(public name: string, public salary: number) { }

    calculateBonus() {
        return this.salary * 0.1;
    }
}

class Manager1 extends Employee {
    constructor(name: string, salary: number, public department: string) {
        super(name, salary);
    }

    calculateBonus() {
        return this.salary * 0.2;
    }
}

// how this violates LSP
function printEmployeeBonus1(employee: Employee) {
    console.log(`${employee.name}'s bonus is ${employee.calculateBonus()}`);
}

const emp = new Employee("Alice", 50000);
const mgr = new Manager1("Bob", 80000, "Sales");

printEmployeeBonus1(emp); // Alice's bonus is 5000
printEmployeeBonus1(mgr); // Bob's bonus is 16000 (unexpected if we treat Manager as Employee)

// To fix this, we can ensure that Manager's calculateBonus method adheres to the same contract as Employee's, or we can avoid overriding it in a way that changes expected behavior.

interface Employee {
    name: string;
    salary: number;
    calculateBonus(): number;
}

class RegularEmployee implements Employee {
    constructor(public name: string, public salary: number) { }

    calculateBonus() {
        return this.salary * 0.1;
    }
}

class Manager extends RegularEmployee implements Employee {
    constructor(public name: string, public salary: number, public department: string) {
        super(name, salary);
     }

    calculateBonus() {
        return this.salary * 0.2; // Same behavior as Employee to adhere to LSP
    }
}

function printEmployeeBonus(employee: Employee) {
    console.log(`${employee.name}'s bonus is ${employee.calculateBonus()}`);
}

const emp2 = new RegularEmployee("Alice", 50000);
const mgr2 = new Manager("Bob", 80000, "Sales");

printEmployeeBonus(emp2); // Alice's bonus is 5000
printEmployeeBonus(mgr2); // Bob's bonus is 16000 (consistent with Employee's behavior)