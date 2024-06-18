import { serverSupabaseClient } from '#supabase/server';
import { Database } from '~/typings/database.types';
export default eventHandler(async (event) => {
   const client = (await serverSupabaseClient<Database>(event)).schema('mobile_services');

   let instance = client.from('tariff').select('*');

  const { data, error } = await instance

  if(error){
   createError({
      message: error.message,
      statusCode: Number(error.code)
   })
  }
 if(data){
   return data
 }
});