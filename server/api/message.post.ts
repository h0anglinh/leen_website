import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default eventHandler(async event => {
  const body = await readBody(event);

  const supabaseInstance = (await serverSupabaseClient<Database>(event)).schema('leen');
  const { data, error } = await supabaseInstance.from('messages').insert([body]);

  if (error) {
     throw createError({
       statusCode: Number(error.code),
       message: error.message
     });
   }
  return { data, error };
});
