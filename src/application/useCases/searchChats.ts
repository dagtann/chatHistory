import type { Chat } from "../../domain/entities/Chat.ts";
import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";

export async function searchChats(
    repository: ChatRepository,
    query: string
): Promise<Chat[]> {
    if (!query) return repository.getAllChats();
    const getAllChats = await repository.getAllChats();
    return getAllChats
        .filter((chat) => chat.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
}