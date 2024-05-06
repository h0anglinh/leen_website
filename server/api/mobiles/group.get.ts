import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/typings/database.types";
export default eventHandler(async (event) => {
  const client = (await serverSupabaseClient<Database>(event)).schema('mobile_services');

  const { name, groupName } = getQuery(event);

  let instance = client.from('groups').select("*");


     if(groupName && typeof groupName === 'string' && groupName !== 'all' ){
          instance = instance.eq('name', groupName)
     } else if ( groupName === 'all' ) {
          instance = instance
     } else {
          instance = instance.eq('name', 'default')
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
