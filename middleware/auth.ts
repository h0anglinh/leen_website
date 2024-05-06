export default defineNuxtRouteMiddleware(async (to, _from) => {
     const user = useSupabaseUser();
     
     if (!user.value && to.name !== "login" ) {
       return navigateTo({
         name: "login",
         query: {
          redirect: to.path
         }
       });
     } 
   });
   