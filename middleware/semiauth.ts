import type { TablesInsert } from "~/typings/database.types";
import CryptoJS from "crypto-js";
export default defineNuxtRouteMiddleware(async (to, from) => {

  const validGroups = ['toet', 'nepomuk']
  if(process.client  ){
    const encryptKey = useRuntimeConfig().public.encryptKey
    const is_dev =  process.env.NODE_ENV === 'development'
    const receivedCode = to.query.code

    if(!receivedCode) {
      return navigateTo({name: 'signin', query: { redirect: to.path}})
    }
    let [group, time] = (CryptoJS.AES.decrypt(receivedCode, encryptKey).toString(CryptoJS.enc.Utf8) as string).split(':')
    const timestamp = parseInt(time)

    const validTime = new Date().getTime() - timestamp < (is_dev ? 99999999999 : 300000)
    const validGroup = validGroups.includes(group)

    if( !validTime || !validGroup ){
      return navigateTo({name: 'signin', query: { redirect: to.path}})
    }

    // const is_dev =  process.env.NODE_ENV === 'development'
    
  }

 });
 