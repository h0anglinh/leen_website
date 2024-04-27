

const apiUrl = 'https://api.paylibo.com/paylibo/generator/czech/image';


interface UrlParams {
     accountNumber: string;
     bankCode?: string;
     amount?: string | number;
     currency?: string;
     vs?: string;
     message?: string;
     size?: number;
 }
 

 export const useQRCodeUrl = (params: UrlParams):string => {
     const baseUrl = "https://api.paylibo.com/paylibo/generator/czech/image";
     const urlParams = new URLSearchParams({
          accountNumber: params.accountNumber,
          bankCode: params.bankCode || "2010",
          amount: params?.amount?.toString().replace('-','') || "",
          size: '100'
     });
     return `${baseUrl}?${urlParams.toString()}`;
 }