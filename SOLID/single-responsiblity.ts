// a class should only have one reason to change,
// meaning that a class should only have one job or responsibility.
// This makes the code easier to maintain and understand.


// ❌

// this is a bad example of a class that violates the Single Responsibility Principle
//If validation rules change → modify class
// If hashing algorithm changes → modify class
// If email provider changes → modify class
// If analytics tool changes → modify class
// If DB schema changes → modify class
class UserService {
  async registerUser(userDto) {
    // 1. Validate input
    if (!userDto.email.includes("@")) {
      throw new Error("Invalid email");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    // 3. Save to database
    const user = await this.userModel.create({
      ...userDto,
      password: hashedPassword,
    });

    // 4. Send welcome email
    await this.emailService.sendWelcomeEmail(user.email);

    // 5. Log analytics event
    await this.analyticsService.track("USER_REGISTERED", {
      userId: user.id,
    });

    return user;
  }
}


// ✅
// PasswordService changes → only it changes
// Email provider changes → only EmailService changes
// DB logic changes → only Repository changes

class UserService2 {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private emailService: EmailService,
    private analyticsService: AnalyticsService
  ) {}

  async registerUser(userDto) {
    const hashedPassword = await this.passwordService.hash(userDto.password);

    const user = await this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    await this.emailService.sendWelcomeEmail(user.email);
    await this.analyticsService.trackUserRegistered(user.id);

    return user;
  }
}