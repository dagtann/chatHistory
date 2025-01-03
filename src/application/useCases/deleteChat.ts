import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";

export async function deleteChat(
    repository: ChatRepository,
    chatId: string
): Promise<void> {
    await repository.deleteChat(chatId);
}