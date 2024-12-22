<script lang="ts">
	import '../app.css';
	import ChatHistory from '../presentation/components/ChatHistory.svelte';
	import {exampleChats}  from '../exampleMessages.ts';
	import {LocalStorageChatRepository} from '../infrastructure/repositories/LocalStorageChatRepository.ts';
	
	const repository = new LocalStorageChatRepository();
	exampleChats.forEach(c => repository.saveChat(c));
</script>

<chat-history-container>
	<ChatHistory />
</chat-history-container>
