<script setup lang="ts">
import { object, string } from "yup";
const loading = ref(false);
const sent = ref(false);
const { defineField, handleSubmit, setFieldError, handleReset, errors, meta, setErrors } = useForm<{
  name?: string;
  email: string;
  message: string;
}>({
  validationSchema: object({
    email: string().required(),
    name: string(),
    message: string().required(),
  }),
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [message, messageAttrs] = defineField("message");

const progress = computed(() => {
  return Math.min(100, (message?.value?.length || 0) * 10);
});

const color = computed(() => {
  return ["error", "warning", "success"][Math.floor(progress.value / 40)];
});

function emailIsValid(email: string) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const submit = handleSubmit(async (body) => {
  loading.value = true;
  if (!emailIsValid(body.email)) {
    setFieldError("email", "enter valid email");
    return;
  }

  const { error } = await $fetch("/api/messages", { method: "POST", body });

  if (!error) {
    loading.value = false;
  }
});
</script>

<template>
  <v-container fluid>
    <div class="flex items-center justify-center h-screen flex-column">
      <v-card variant="outlined" v-if="sent">
        <v-card-text>
          <p class="text-h4 text--primary mb-4">the message has been sent</p>
          <div class="text--primary">thanks, I will respond as soon as possible</div>
        </v-card-text>
      </v-card>
      <v-card class="login-card" variant="outlined" v-else>
        <v-card-title>Send me a message</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field label="Your name" variant="outlined" v-model="name" v-bind="nameAttrs" />
            <v-text-field
              label="Your email"
              variant="outlined"
              v-model="email"
              v-bind="emailAttrs"
              :error="typeof errors.email === 'string'"
              :error-messages="errors.email"
            >
              <template v-slot:loader>
                <v-progress-linear
                  :active="loading"
                  height="2"
                  :color="color"
                  :model-value="progress"
                  indeterminate
                ></v-progress-linear> </template
            ></v-text-field>
            <v-textarea
              label="Message"
              v-model="message"
              v-bind="messageAttrs"
              variant="outlined"
              :error="typeof errors.message === 'string'"
              :error-messages="errors.message"
            />
            <div class="d-flex justify-end">
              <v-btn color="black" variant="outlined" type="submit" class="mr-2">Send a message</v-btn>
              <v-btn variant="text" @click="handleReset">Reset</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>

      <div style="width: 20rem">
        <hr class="hr-text my-6" data-content="OR" />

        <v-btn block href="mailto:linh.hoang@outlook.cz" variant="outlined"> Send an email</v-btn>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss">
.login-card {
  width: 100%; // Základní šířka pro mobilní zařízení

  transition: 2s;

  // Media query pro tablety a větší displeje
  // Použij breakpoint, který odpovídá tvým potřebám, např. 768px pro tablety
  @media (min-width: 668px) {
    width: 60vw; // Šířka pro větší displeje
  }
  @media (min-width: 1500px) {
    width: 50rem; // Šířka pro větší displeje
  }
}

.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
  &:before {
    content: "";
    background: #31312f;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    padding: 0 0.5em;
    line-height: 1.5em;
    color: #818078;
    background-color: #fcfcfa;
  }
}
</style>
