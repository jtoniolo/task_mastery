import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

/**
 * summary: GmailService - Service for managing local Gmail cache in MongoDB
 */
@Injectable({ scope: Scope.REQUEST })
export class GmailService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MongoRepository<Message>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  private getUserId(): string {
    return this.request['user'].id;
  }
  private get userId(): string {
    return this.request['user'].id ?? '';
  }

  async getMessageCount(): Promise<number> {
    return await this.messageRepository.countBy({ userId: this.userId });
  }
  async getMessageById(
    id: string,
    userId: string | undefined = undefined,
  ): Promise<Message> {
    const _id = new ObjectId(id);
    return await this.messageRepository.findOne({
      where: { _id, userId: userId ?? this.userId },
    });
  }

  async getMessagesById(
    messageIds: string[],
    userId: string | undefined = undefined,
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        userId: userId ?? this.userId,
        _id: { $in: messageIds.map((id) => new ObjectId(id)) },
      },
    });
  }

  /**
   * Saves emails to the database.
   * @param messages - The messages to save.
   * @returns The saved messages.
   */
  async saveEmailsAsync(
    messages: Message[],
    userId: string | undefined = undefined,
  ): Promise<Message[]> {
    const userIdValue = userId ?? this.userId;

    if (messages.find((m) => m.userId !== userIdValue)) {
      throw new Error('Invalid user ID');
    }

    return await this.messageRepository.save(messages);
  }
}
