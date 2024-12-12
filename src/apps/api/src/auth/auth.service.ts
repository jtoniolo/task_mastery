import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateFromEmail } from 'unique-username-generator';
import { User } from '../users/entities/user.entity';
import { RegisterUserDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * AuthService handles authentication-related operations such as signing in and registering users.
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generates a JSON Web Token (JWT) for the given payload.
   * @param payload - The payload to include in the JWT.
   * @returns The generated JWT.
   */
  generateJwt(payload) {
    const secret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { secret });
  }

  /**
   * Signs in a user. If the user does not exist, registers the user.
   * @param user - The user object containing email and other details.
   * @returns The generated JWT for the user.
   * @throws BadRequestException if the user is not authenticated.
   */
  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  /**
   * Registers a new user and generates a JWT for the user.
   * @param user - The RegisterUserDto containing user registration details.
   * @returns The generated JWT for the new user.
   * @throws InternalServerErrorException if there is an error during registration.
   */
  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = this.userRepository.create(user);
      newUser.username = generateFromEmail(user.email, 5);

      await this.userRepository.save(newUser);

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to find.
   * @returns The user entity if found, otherwise null.
   */
  private async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
