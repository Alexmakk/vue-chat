<template>
  <div class="support-area">
    <aside class="support-sidebar">
      <h3>Пользователи</h3>
      <ul v-for="u in users" :key="u.id">
        <li
          class="room"
          :class="[recipientId === u.id ? 'active' : '']"
         @click="connectToUser(u.id)"
        >
        {{ u.name }}
        </li>
      </ul>
    </aside>
    <section class="support-session">
      <header class="current-chat">
        <h3>Чат</h3>
      </header>
      <div class="chat-session" ref="block">
        <div v-for="message in messages" :key="message.id">
          <span :class="[ message.senderId === user.id ? 'support' :
          'user']" class="message">{{ message.text }}</span>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="message-form">
        <input
          class="message-input"
          autofocus
          placeholder="Введите сообщение и нажмите Enter"
          v-model="newMessage"
          name="newMessage"
          />
      </form>
    </section>
  </div>
</template>

<script>
import { sendMessage, connectToUser} from '@/methods';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Support',
  data() {
    return {
      recipientId: '',
      newMessage: ''
    }
  },
  methods: {
    ...mapMutations(["setUser"]),
    sendMessage,
    connectToUser
  },

  computed: 
    mapState(["user", "users", "messages"]),

  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  }
  
}
</script>

<style>
.support-area {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.support-sidebar {
  width: 20%;
  background-color: #300d4f;
  height: 100%;
}

.support-sidebar ul {
  list-style: none;
}

.support-sidebar h3 {
  color: white;
  margin-bottom: 0;
  text-align: left;
  padding: 10px 20px;
}

.room {
  font-size: 22px;
  color: white;
  cursor: pointer;
  text-align: left;
  padding: 10px 20px;
  margin-bottom: 10px;
}

.room:hover {
  color: yellowgreen;
}

.room.active {
  background-color: yellowgreen;
  color: white;
}

.support-session {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.current-chat {
  border-bottom: 1px solid #ccc;
  text-align: left;
  padding: 10px 20px;
  display: flex;
}

.current-chat h3 {
  margin-bottom: 0;
}

.chat-session {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}
</style>
