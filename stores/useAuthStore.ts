export const useAuthStore = defineStore('auth-store', () => {
   const users = ref(['toet', 'nepomuk'])
   return { users }
})