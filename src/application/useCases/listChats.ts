import type { Chat } from "../../domain/entities/Chat.ts";
import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";

export async function listChats(
    repository: ChatRepository
): Promise<Chat[]> {
    return await repository.getAllChats();
}

export function groupChatsByDate(chats: Chat[]): Record<string, Chat[]> {
    const groups: Record<string, Chat[]> = { today: [], yesterday: [], last7Days: [], last30Days: [], older: [] };
    const now = new Date();
    chats.forEach(chat => groups[getDateCategory(now, chat.createdAt)].push(chat));
    return groups;
}

function getDateCategory(now: Date, createdAt: Date): string {
    const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays <= 7) return 'last7Days';
    if (diffDays <= 30) return 'last30Days';
    return 'older';
}
