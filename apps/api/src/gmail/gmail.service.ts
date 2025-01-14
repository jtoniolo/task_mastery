import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { Message } from './entities/message.entity';

/**
 * summary: GmailService - Service for managing local Gmail cache in MongoDB
 */
export class GmailService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getMessageById(id: string): Promise<Message> {
    const _id = new ObjectId(id);
    return await this.messageRepository.findOne({ where: { _id } });
  }

  /**
   * Saves emails to the database.
   * @param messages - The messages to save.
   * @returns The saved messages.
   */
  async saveEmailsAsync(messages: Message[]): Promise<Message[]> {
    return await this.messageRepository.save(messages);
  }
}
