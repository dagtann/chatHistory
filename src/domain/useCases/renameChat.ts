import type { Chat } from "../entities/Chat.ts";
import type { ChatRepository } from "../entities/ChatRepository.ts";

export async function renameChat(
    repository: ChatRepository,
    id: string,
    newTitle: string
): Promise<void> {
    const chat = await repository.getChatById(id);
    if (!chat) throw new Error('Chat not found');
    chat.title = newTitle;
    chat.updatedAt = new Date();
    await repository.saveChat(chat);
}