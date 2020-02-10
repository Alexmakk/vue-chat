<template>
  <div class="chat-widget">
    <header class="chat-header">
      <h2>{{currentUser.name}}, задайте свой вопрос оператору</h2>
    </header>
    <section class="chat-body" ref="block">
      <div v-for="message in messages" :key="message.id">
        <span :class="[ message.senderId === currentUser.id ? 'user' :
        'support']" class="message">{{ message.text }}</span>
      </div>
    </section>

    <form @submit.prevent="handleSubmit" class="message-form">
      <input
        class="message-input"
        autofocus
        name="newMessage"
        placeholder="Введите сообщение и нажмите Enter"
        :value="newMessage"
        @input="handleInput"
        />
    </form>
  </div>
</template>

<script>
export default {
  name: 'ChatWidget',
  props: {
    newMessage: String,
    messages: Array,
    currentUser: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    handleInput(event) {
      const { name, value } = event.target;
      this.$emit('update-input', name, value);
    },
    handleSubmit() {
      this.$emit('send-message');
    }
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  }
}
</script>
