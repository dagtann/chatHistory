import type { Chat } from "../entities/Chat.ts";
import type { ChatRepository } from "../entities/ChatRepository.ts";

export async function storeChat(
    repository: ChatRepository,
    chat: Chat
): Promise<void> {
    await repository.saveChat(chat);
}
