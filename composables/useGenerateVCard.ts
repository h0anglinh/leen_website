export type VCardTypeSTR = 'work' | 'home' | 'personal' | 'business' | 'main' | 'default'

export enum VCardType {
   Work = 'work',
   Home = 'home',
   Personal = 'personal',
   Business = 'business',
   Main = 'main',
   Default = 'default'
 }
 
 type AddressObject = {
   address: string;
   type: VCardType | VCardTypeSTR;
 };
 
 export type PhoneObject = {
   number: string;
   type: VCardType | VCardTypeSTR ;
 };
 
 export type EmailObject = {
   email: string;
   type: VCardType | VCardTypeSTR;
 };
 
 export type VCardInput = {
   firstName?: string;
   lastName: string;
   email?: string | EmailObject | EmailObject[];
   photo?: string;
   address?: string | AddressObject | AddressObject[];
   phone?: string | PhoneObject | PhoneObject[];
   birthday?: string;
   nickname?: string;
   title?: string;
   web?: string;
   kind?: 'individual' | 'group' | 'org'
 };

 type ExportType = 'string-only' | 'file'
 
 function getCurrentDate(): string {
   const now = new Date();
   const year = now.getFullYear();
   const month = String(now.getMonth() + 1).padStart(2, '0');
   const day = String(now.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
 }
 

 
 export function useGenerateVCard(input: VCardInput, exportType: ExportType = 'file') {
   const { kind, firstName, lastName, email, photo, address,  phone, birthday, nickname, title, web } = input;
 
   let vCard = "BEGIN:VCARD\nVERSION:4.0\n";
   vCard += `FN:${firstName || ''} ${lastName}\n`;
  
   vCard += 'GENDER:M\n';
   vCard += `KIND:${kind || "individual"}\n`;
   

   if( !kind || kind === 'individual' ){
    vCard += `N:${lastName};${firstName};;;\n`;
   }
 
   if (email) {
     if (typeof email === 'string') {
       vCard += `EMAIL:${email}\n`;
     } else if (Array.isArray(email)) {
       vCard += email.reduce((acc, emailObj) => {
         return acc + `EMAIL;${emailObj.type}:${emailObj.email}\n`;
       }, '');
     } else {
       vCard += `EMAIL;TYPE=${email.type}:${email.email}\n`;
     }
   }
 
   if (photo) {
     vCard += `PHOTO;MEDIATYPE=image/gif:${photo}\n`;
   }
   if (nickname) {
    vCard += `NICKNAME:${nickname}\n`;
   }
   if (title) {
    vCard += `TITLE:${title}\n`;
   }
   if (web) {
    vCard += `URL:${web}\n`;
   }
 
   if (phone) {
     if (typeof phone === 'string') {
       vCard += `TEL;mobile;VALUE=uri:${phone}\n`;
     } else if (Array.isArray(phone)) {
       vCard += phone.reduce((acc, phoneObj) => {
         return acc + `TEL;${phoneObj.type};VALUE=uri:${phoneObj.number}\n`;
       }, '');
     } else {
       vCard += `TEL;${phone.type};VALUE=uri:${phone.number}\n`;
     }
   }

   if (birthday) {
    vCard += `BDAY:${birthday}\n`;
  }
 
 
   if (address) {
     if (typeof address === 'string') {
       vCard += `ADR;LABEL="${address.replaceAll(/\n/g, '\\n')}":;;${address.replaceAll(/\n/g, ';')}\n`;
     } else if (Array.isArray(address)) {
       vCard += address.reduce((acc, addrObj) => {
         return acc + `ADR;TYPE=${addrObj.type};LABEL="${addrObj.address.replaceAll(/\n/g, '\\n')}":;;${addrObj.address.replaceAll(/\n/g, ';')}\n`;
       }, '');
     } else {
       vCard += `ADR;${address.type};LABEL="${address.address.replaceAll(/\n/g, '\\n')}":;;${address.address.replaceAll(/\n/g, ';')}\n`;
     }
   }
 
   // Přidání REV s aktuálním datem
   vCard += `REV:${getCurrentDate()}\n`;
 
   vCard += "END:VCARD";



 
if(exportType === 'file'){
  const blob = new Blob([vCard], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${firstName}_${lastName}.vcf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
} else if ( exportType === 'string-only'){
  return vCard
}



 }
 
 
 