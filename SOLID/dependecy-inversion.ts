//high-level modules should not depend on low-level modules —
//  both should depend on abstractions. In other words,
//  depend on interfaces, not concrete classes.

// ❌ bad example
class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(userDto) {
    // validation logic
    const user = await this.userRepository.create(userDto);
    return user;
  }
}

// ✅ good example
// we can depend on an abstraction (interface) instead of a concrete class

interface IUserRepository {
  create(userDto): Promise<User>;
}

class UserService2 {
  constructor(private userRepository: IUserRepository) {}

  async registerUser(userDto) {
    // validation logic
    const user = await this.userRepository.create(userDto);
    return user;
  }
}

// now we can have multiple implementations of IUserRepository, such as:
// - DatabaseUserRepository (for real database)
// - InMemoryUserRepository (for testing)
// - ApiUserRepository (for external API)