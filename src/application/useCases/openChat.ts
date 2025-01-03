import type { Chat } from "../../domain/entities/Chat.ts";
import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";

export async function openChat(
    repository: ChatRepository,
    chatId: string
): Promise<Chat> {
    const chat = await repository.getChatById(chatId);
    if (!chat) throw new Error('Chat not found');
    return chat;
}