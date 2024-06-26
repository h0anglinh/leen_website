import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default eventHandler(async (event) => {
  const client = (await serverSupabaseClient<Database>(event)).schema('mobile_services');

  const { name } = getQuery(event);

  let instance = client.from('payment_view').select("*");

  if(name) {
     instance = instance.like('combined_names', `%${name}%`)
  }


  const { data, error } = await instance.order('transaction_date', {ascending: false})
  if(error){
    throw createError({
      statusCode: Number(error.code),
      statusMessage: error.message,
    });
  } 
  return data

});
