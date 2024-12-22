import type { Message } from "./Message.js";

export interface Chat {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Message[];
}
