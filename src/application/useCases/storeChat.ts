import type { Chat } from "../../domain/entities/Chat.ts";
import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";

export async function storeChat(
    repository: ChatRepository,
    chat: Chat
): Promise<void> {
    await repository.saveChat(chat);
}
