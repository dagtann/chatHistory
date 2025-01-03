import { listChats, groupChatsByDate } from "../useCases/listChats.js";
import { searchChats } from "../useCases/searchChats.js";
import { openChat } from "../useCases/openChat.js";
import type { ChatRepository } from "../../domain/ports/out/ChatRepository.ts";
import type { Chat } from "../../domain/entities/Chat.ts";

export class ChatHistoryService {
    constructor(private chatRepository: ChatRepository) {}

    async getGroupedChats(): Promise<Record<string, Chat[]>> {
        const allChats = await listChats(this.chatRepository);
        return groupChatsByDate(allChats);
    }

    async serach(query: string): Promise<Chat[]> {
        return await searchChats(this.chatRepository, query);
    }

    async openChat(chatId: string): Promise<Chat | null> {
        return await openChat(this.chatRepository, chatId);
    }
}