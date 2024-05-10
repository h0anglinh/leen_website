import type { TablesInsert } from "~/typings/database.types";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if(process.client){
    const user = useSupabaseUser()
    const deviceInfo = useDeviceInfo()
    const MODE = process.env.NODE_ENV;
    const payload: TablesInsert<'log'> = {
     MODE,
     user: user.value?.email || to.query?.user as string || to.query?.group as string || null,
     from: from.fullPath,
     to: to.fullPath,
     params: Object.values(to.params).join('-'),
     queries: Object.values(to.query).join('-'),
     meta: deviceInfo as any,
    }
 
    await $fetch('/api/logs', {method:'POST', body: payload})
   
  } 
   
   
 });
 