<script lang="ts">
    import { onMount } from "svelte";
    import type { Chat } from "../../domain/entities/Chat.ts";
    import { LocalStorageChatRepository } from "../../infrastructure/repositories/LocalStorageChatRepository.ts";
    import { listChats, groupChatsByDate } from "../../domain/useCases/listChats.ts";
    import { searchChats } from "../../domain/useCases/searchChats.ts";
    import { renameChat } from "../../domain/useCases/renameChat.ts";
    import { deleteChat } from "../../domain/useCases/deleteChat.ts";
    import { shareChat } from "../../domain/useCases/shareChat.ts";
    import { openChat } from "../../domain/useCases/openChat.ts";
  
    let chats: Chat[] = [];
    let groupedChats: Record<string, Chat[]> = {
      today: [],
      yesterday: [],
      last7Days: [],
      last30Days: [],
      older: []
    };
    let searchQuery: string = "";
  
    const repository = new LocalStorageChatRepository();
  
    onMount(async () => {
      await loadChats();
    });
  
    async function loadChats() {
      const allChats = await listChats(repository);
      groupedChats = groupChatsByDate(allChats);
    }
  
    async function handleSearch() {
      const results = await searchChats(repository, searchQuery);
      groupedChats = groupChatsByDate(results);
    }
  
    async function handleRename(chat: Chat) {
      const newTitle = prompt("Enter new title", chat.title);
      if (newTitle) {
        await renameChat(repository, chat.id, newTitle);
        await loadChats();
      }
    }
  
    async function handleDelete(chat: Chat) {
      if (confirm(`Are you sure you want to delete "${chat.title}"?`)) {
        await deleteChat(repository, chat.id);
        await loadChats();
      }
    }
  
    async function handleShare(chat: Chat) {
      const userId = prompt("Enter User ID to share with");
      if (userId) {
        await shareChat(repository, chat.id, userId);
        alert("Chat shared!");
      }
    }
  
    async function handleOpen(chat: Chat) {
      const openedChat = await openChat(repository, chat.id);
      if (openedChat) {
        // The "openedChat" can be passed to your main chat area
        // For demonstration, we just log it:
        console.log("Open Chat =>", openedChat);
        // You could route to a dedicated Chat page or store in a global store:
        // e.g., navigateTo(`/chat/${openedChat.id}`) or update a Svelte store
      }
    }
  </script>
  
  <div class="p-4">
    <div class="form-control mb-4">
      <input
        class="input input-bordered"
        type="text"
        placeholder="Search..."
        bind:value={searchQuery}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn mt-2" on:click={handleSearch}>Search</button>
    </div>
  
    <h2 class="text-xl font-bold mb-2">Chat History</h2>
    {#each Object.keys(groupedChats) as group}
      {#if groupedChats[group].length}
        <h3 class="text-lg font-semibold mt-4">{group}</h3>
        <ul class="menu bg-base-100 rounded-box p-2">
          {#each groupedChats[group] as chat}
            <li class="flex justify-between items-center mb-2">
              <div on:click={() => handleOpen(chat)} class="cursor-pointer">
                {chat.title}
              </div>
              <div class="flex gap-2">
                <button class="btn btn-sm" on:click={() => handleRename(chat)}>Rename</button>
                <button class="btn btn-sm" on:click={() => handleDelete(chat)}>Delete</button>
                <button class="btn btn-sm" on:click={() => handleShare(chat)}>Share</button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    {/each}
  </div>
  