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
        <span class="flex h-9 items-center">
          <h3 class="text-lg font-semibold mt-4">{group}</h3>
        </span>
        <ul class="menu bg-base-100 rounded-box p-2">
          {#each groupedChats[group] as chat}
            <li class="relative grow overflow-hidden whitespace-nowrap group flex flex-row items-center gap-2 px-3 py-2 rounded-md transition hover:bg-white/10 hover:text-white cursor-pointer">
              <button 
                class="shadow-none no-transition no-animation" style="background-color: transparent"
                on:click={() => handleOpen(chat)}>
                {chat.title}
              </button>
                <!-- Todo: Move to component -->
              <kebab-menu-container class="dropdown dropdown-bottom dropdown-start relative"  style="background-color: transparent">
                <button tabindex="0" aria-label="Options">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                    <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                  </svg>                  
                </button>
                <ul tabindex="0" class="dropdown-content z-50">
                  <li><button on:click={() => handleRename(chat)}>Rename</button></li>
                  <li><button on:click={() => handleDelete(chat)}>Delete</button></li>
                  <li><button on:click={() => handleShare(chat)}>Share</button></li>
                </ul>
              </kebab-menu-container>
            </li>
          {/each}
        </ul>
      {/if}
    {/each}
  </div>
  