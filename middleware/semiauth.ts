import CryptoJS from "crypto-js";


interface DecryptedData {
  group: string;
  timestamp: number;
}

const validGroups = ['toet', 'nepomuk']

function decryptCode(code: string, key: string) {
  const decrypted = CryptoJS.AES.decrypt(code, key).toString(CryptoJS.enc.Utf8);
  const [group, time] = decrypted.split(':');
  return { group, timestamp: parseInt(time) };
}

export function isCodeValid(group: string, timestamp: number, isDev = false) {
  const currentTime = new Date().getTime();
  const validTime = currentTime - timestamp < (isDev ? 99999999999 : 300000);
  const validGroup = validGroups.includes(group);
  return validTime && validGroup;
}


export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const encryptKey = useRuntimeConfig().public.encryptKey;
    const isDev = process.env.NODE_ENV === 'development';
    const receivedCode = to.query.code;

    if (!receivedCode) {
      return navigateTo({ name: 'signin', query: { redirect: to.path, reason: 'missing_code' } });
    }

    try {
      const { group, timestamp } = decryptCode(receivedCode as string, encryptKey);

      if (!isCodeValid(group, timestamp, isDev)) {
        return navigateTo({ name: 'signin', query: { redirect: to.path, reason: 'invalid_code' } });
      }
    } catch (error) {
      return navigateTo({ name: 'signin', query: { redirect: to.path, reason: 'decrypt_error' } });
    }
  }
});
 