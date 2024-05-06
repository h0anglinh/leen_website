import { serverSupabaseClient } from "#supabase/server";
import { useRoute } from "vue-router";
import { Database } from "~/typings/database.types";
export default eventHandler(async event => {
  const body = await readBody(event);
  const MODE = process.env.NODE_ENV;
  const payload = {...body, MODE}

  const supabaseInstance = (await serverSupabaseClient<Database>(event)).schema('public');
  const { data, error } = await supabaseInstance.from('log').insert([payload]).select('*');

  // if (error) {
  //    throw createError({
  //      statusCode: Number(error.code),
  //      message: error.message
  //    });
  //  }
  return { data, error };
});
