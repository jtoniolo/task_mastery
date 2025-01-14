import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { generateFromEmail } from 'unique-username-generator';

import { ConfigService } from 'config/config.service';
import { QueueService } from 'queue/queue.service';

import { RegisterUserDto } from './dtos/auth.dto';
import { User } from '../users/entities/user.entity';

/**
 * AuthService handles authentication-related operations such as signing in and registering users.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  /**
   * Generates a JSON Web Token (JWT) for the given payload.
   * @param payload - The payload to include in the JWT.
   * @returns The generated JWT.
   */
  generateJwt(payload) {
    const secret = this.configService.jwtSecret;
    return this.jwtService.sign(payload, {
      secret,
      expiresIn: '1d',
      //TODO: Update audience and issuer. Should come from config.
      audience: this.configService.clientUrl,
      issuer: this.configService.jwtIssuer,
    });
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

    const payload: JwtPayload = {
      sub: userExists._id.toHexString(),
      email: userExists.email,
    };
    return this.generateJwt(payload);
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

      // This will trigger gmail sync
      try {
        await this.queueService.addNewUserJob(newUser);
      } catch (e) {
        this.logger.error(`Failed to add job to queue: ${e}`, e?.stack);
      }

      return this.generateJwt({
        sub: newUser._id.toHexString(),
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
