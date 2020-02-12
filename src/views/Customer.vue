<template>
  <div class="customer-chat">
    <h1>Чат с оператором</h1>
    <p>
      Выбери ниже вариант участия в чате
    </p>

    <ChatWidget
      v-if="currentUserId"
      :newMessage="newMessage"
      :currentUser="user"
      :messages="messages"
      @send-message="sendMessage"
      @update-input="handleInput"
      />

  <div v-else>
    <button @click="showDialog" class="contact-btn">
      Войти как пользователь
    </button>
    <button @click="connectSupport" class="contact-btn">
      Войти как оператор
    </button>
  </div>

    <Dialog
      v-if="isDialogOpen"
      :username="userName"
      @update-input="handleInput"
      @submit-username="handleSubmit"
      />
  </div>
</template>

<script>
import ChatWidget from '@/components/ChatWidget.vue'
import Dialog from '@/components/Dialog.vue';
import { sendMessage, showDialog, handleSubmit, handleInput, connectSupport } from '@/methods.js';
import { mapState, mapMutations} from 'vuex'

export default {
  name: 'Customer',
  components: {
    Dialog,
    ChatWidget,
  },
 
  data() {
    return {
      title: 'Customer Support',
      userName: '',
      userType: 'user',
      currentUserId: null,
      newMessage: '',
      isDialogOpen: false,
    }
  },
  computed: mapState(["user", "messages"]),
  methods: {
    ...mapMutations(["setUser"]),

    sendMessage,
    showDialog,
    handleInput,
    handleSubmit,    
    connectSupport
  },
}
</script>
