<script setup lang="ts">
const props = defineProps<{
  toRotate: string[];
  period: number;
}>();

const currentText = ref("");
const loopNum = ref(0);
const isDeleting = ref(false);
const finished = ref(false); // Nový stavový indikátor

const tick = () => {
  const i = loopNum.value % props.toRotate.length;
  const fullText = props.toRotate[i];

  if (isDeleting.value) {
    currentText.value = fullText.substring(0, currentText.value.length - 1);
  } else {
    currentText.value = fullText.substring(0, currentText.value.length + 1);
  }

  let delta = 200 - Math.random() * 100;

  if (isDeleting.value) {
    delta /= 2;
  }

  if (!isDeleting.value && currentText.value === fullText) {
    delta = props.period;
    isDeleting.value = true;
  } else if (isDeleting.value && currentText.value === "") {
    isDeleting.value = false;
    loopNum.value++;
    delta = 300;
  }

  if (loopNum.value >= props.toRotate.length && !isDeleting.value) {
    finished.value = true; // Nastavíme 'finished' na true po dokončení všech textů
    return; // Přerušíme cyklus, abychom zastavili animaci
  }

  setTimeout(tick, delta);
};

onMounted(() => {
  tick();
});
</script>

<template>
  <div class="typewrite">
    <h3 class="wrap text-h3">{{ currentText }}</h3>
    <!-- Slot pro obsah zobrazený na konci -->
    <slot v-if="finished"></slot>
  </div>
</template>

<style scoped>
.wrap {
  transition: 1000ms;
}
</style>
