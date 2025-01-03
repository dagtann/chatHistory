import type { Chat } from "../../../domain/entities/Chat.ts";
import type { ChatRepository } from "../../../domain/ports/out/ChatRepository.ts";

const STORAGE_KEY = 'chatHistory';

export class LocalStorageChatRepository implements ChatRepository {
    private getChatsFromLocalStorage(): Chat[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try {
            const data = JSON.parse(raw);
            return data.map((chat: any) => ({
                ...chat,
                createdAt: new Date(chat.createdAt),
                updatedAt: new Date(chat.updatedAt),
            })) as Chat[];
        } catch {
            return []
        }
    }
    
    private saveChatsToLocalStorage(chats: Chat[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    }

    async getAllChats(): Promise<Chat[]> {
        return this.getChatsFromLocalStorage();
    }

    async getChatById(id: string): Promise<Chat | null> {
        const chats = this.getChatsFromLocalStorage();
        return chats.find((chat) => chat.id === id) || null;
    }

    async saveChat(chat: Chat): Promise<void> {
        const chats = this.getChatsFromLocalStorage();
        const index = chats.findIndex((c) => c.id === chat.id);
        if (index > -1) {
            chats[index] = chat;
        } else {
            chats.push(chat);
        }
        this.saveChatsToLocalStorage(chats);
    }

    async deleteChat(id: string): Promise<void> {
        const chats = this.getChatsFromLocalStorage();
        const newChats = chats.filter((chat) => chat.id !== id);
        this.saveChatsToLocalStorage(newChats);
    }
}