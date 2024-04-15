export default defineEventHandler((event) => {
     const req = event.node.req;
     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
     // Můžete přidat IP do kontextu, pokud je potřeba ji použít později
     event.context.clientIp = ip;
 });