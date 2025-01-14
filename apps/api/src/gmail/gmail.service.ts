import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Message } from './entities/message.entity';

/**
 * summary: GmailService - Service for managing local Gmail cache in MongoDB
 */
export class GmailService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MongoRepository<Message>,
  ) {}

  async getMessageById(id: string): Promise<Message> {
    const _id = new ObjectId(id);
    return await this.messageRepository.findOne({ where: { _id } });
  }

  async getMessagesById(messageIds: string[]): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        _id: { $in: messageIds.map((id) => new ObjectId(id)) },
      },
    });
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
