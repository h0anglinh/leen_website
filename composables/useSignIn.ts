import type {
     Provider,
     SignInWithPasswordCredentials,
     OAuthResponse,
     AuthTokenResponsePassword,
   } from "@supabase/supabase-js";
   
   type SignInType = "withEmailAndPassword" | "oauth";
   type Credentials = SignInWithPasswordCredentials;
   
   type SignInComposable = {
     (type: "withEmailAndPassword", credentials: Credentials, redirect?: string): Promise<any>;
     (type: "oauth", provider: Provider, redirect?: string): Promise<any>;
   };
   
   export const useSignIn: SignInComposable = async (type: SignInType, param, redirect) => {
     const auth = useSupabaseClient().auth;
   
     if (type === "oauth" && typeof param === "string") {

      const path = `http://localhost:3000/callback?redirect=${redirect || "/"}`

      
       const { data } = await auth.signInWithOAuth({
         provider: param,
         options: {
          redirectTo: path
         }
       });
     } else if (typeof param === "object") {
       await auth.signInWithPassword(param);
     }
   };
   