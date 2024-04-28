import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default eventHandler(async (event) => {
  const client = (await serverSupabaseClient<Database>(event)).schema('mobile_services');

  const { groupName, month, year, type } = getQuery(event);



  let instance = client.from('expenses').select("*");

  if(type && typeof type === 'string' ) {
    instance = instance.eq('type', type)
  }

  if(groupName && typeof groupName === 'string') {
     instance =  instance.eq('group_name', groupName).order('year', {ascending: false}).order('month', {ascending: false})
  }

  if( month && typeof month === 'string' ){
    instance = instance.eq('month', month)
  }

  if( year && typeof year === 'string' ) {
    instance = instance.eq('year', year)
  }

  const { data, error } = await instance
  if(error){
    throw createError({
      statusCode: Number(error.code),
      statusMessage: error.message,
    });
  } 
  return data

});
