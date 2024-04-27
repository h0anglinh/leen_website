export default defineNuxtRouteMiddleware(async (to, _from) => {
     const user = useSupabaseUser();
     const route = useRoute()
     console.log({route},{to, _from});
     
     if (!user.value && to.name !== "login" ) {
       return navigateTo({
         name: "login",
         query: {
          redirect: to.path
         }
       });
     } 
   });
   