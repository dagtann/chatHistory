import type { ChatRepository } from "../entities/ChatRepository.ts";
import { v4 as uuidv4 } from 'uuid';

export async function newChat(
    repository: ChatRepository,
    title: string
): Promise<void> {
    const chat = {
        id: uuidv4(),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: []
    };
    await repository.saveChat(chat);
}