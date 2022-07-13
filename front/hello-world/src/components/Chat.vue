<template>
  <div>
    <hr />
    <p align="left">Автор: {{ chat.author.name }} {{ chat.created }}</p>
    <p align="left">{{ chat.content }}</p>
  </div>
</template>

<script>

export default {
  name: 'Chat',
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
};
</script>
