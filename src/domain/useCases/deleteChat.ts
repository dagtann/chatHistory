import type { ChatRepository } from "../entities/ChatRepository.ts";

export async function deleteChat(
    repository: ChatRepository,
    chatId: string
): Promise<void> {
    await repository.deleteChat(chatId);
}