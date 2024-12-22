import type { Chat } from "../entities/Chat.ts";
import type { ChatRepository } from "../entities/ChatRepository.ts";

export async function searchChats(
    repository: ChatRepository,
    query: string
): Promise<Chat[]> {
    if (!query) return repository.getAllChats();
    const getAllChats = await repository.getAllChats();
    return getAllChats
        .filter((chat) => chat.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
}