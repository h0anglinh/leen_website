import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default defineEventHandler(async (event) => {
  const client = (await serverSupabaseClient<Database>(event)).schema('mobile_services');

  let instance = client.from('vw_tariff_change').select("*");

  const { data, error } = await instance
  if(error){
    throw createError({
      statusCode: Number(error.code),
      statusMessage: error.message,
    });
  } 
  return data

});