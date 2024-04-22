<template>
  <div>
    <div>
      <input v-model="formModel.name" placeholder="Enter your name" />
    </div>
    <br />
    <div>
      <textarea v-model="formModel.message" placeholder="Type message here..."></textarea>
    </div>
    <br />
    <button @click="onTrigger">Trigger SSE</button>

    <p v-for="(item, i) in messages" :key="i">{{ item }}</p>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Home Page' });

const formModel = reactive({
  name: '',
  message: ''
});

const onTrigger = async () => {
  await $fetch('/api/notif', {
    method: 'POST',
    body: formModel
  });
};

const messages = ref<Record<string, any>>([]);
const eventSource = ref<EventSource>();

onMounted(() => {
  eventSource.value = new EventSource('/api/notif');
  eventSource.value.addEventListener('update', (evt) => messages.value.push(JSON.parse(evt.data)));
});

onBeforeUnmount(() => eventSource.value?.close());
</script>
