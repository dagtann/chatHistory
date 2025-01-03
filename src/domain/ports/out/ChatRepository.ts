import type { Chat } from "../../entities/Chat.ts";

export interface ChatRepository {
    getAllChats(): Promise<Chat[]>;
    getChatById(id: string): Promise<Chat | null>;
    saveChat(chat: Chat): Promise<void>;
    deleteChat(id: string): Promise<void>;
}