import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";

export async function shareChat(
    repository: ChatRepository,
    chatId: string,
    userIdToShare: string
): Promise<void> {
    const chat = await repository.getChatById(chatId);
    if (!chat) throw new Error('Chat not found');
    console.log('Sharing chat ${chatId} with user ${userIdToShare}');
}
