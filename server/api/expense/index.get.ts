import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default eventHandler(async (event) => {
  const client = (await serverSupabaseClient<Database>(event)).schema('mobile_services');

  const { groupName } = getQuery(event);

  

  const instance = client.from('group_expenses_summary').select("*");

  if(groupName && typeof groupName === 'string') {
     const {data, error} = await instance.eq('group_name', groupName).order('year', {ascending: false}).order('month', {ascending: false})
     if(error){
          throw createError({
            statusCode: Number(error.code),
            statusMessage: error.message,
          });
        } 
     return data
  }

  const { data, error } = await instance;
  if(error){
    throw createError({
      statusCode: Number(error.code),
      statusMessage: error.message,
    });
  } 
  return data

});
