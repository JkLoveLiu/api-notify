import { serve } from "https://deno.land/std@0.121.0/http/server.ts";
// import Utils from "./utils/Utils.ts";
// import ConfigController from "./controller/config/ConfigController.ts";
// import NotifyController from "./controller/notify/NotifyController.ts";
// import NotifyLogController from "./controller/notifyLog/NotifyLogController.ts";

// const kv = await Deno.openKv();
// const port = Number(Deno.env.get("PORT"))
// serve(
//   async req => {
//     const url = new URL(req.url);
//     console.log(url.pathname);
//     // 去掉第一个/，然后转成数组
//     const pathArray = url.pathname.slice(1).split("/");
//     if (pathArray.length === 0) {
//       return Utils.notFound();
//     }
//     switch (pathArray[0]) {
//       case "":
//         return Utils.welcome();
//       case "notifyLog":
//         return await NotifyLogController(url.pathname, req);
//       case "notify":
//         return await NotifyController(url.pathname, req, kv);
//       case "config":
//         return await ConfigController(url.pathname, req, kv);
//       case "static":
//         try {
//           const file = await Deno.readFile(`./${url.pathname}`);
//           return new Response(file, {
//             headers: {
//               "Cache-Control": "public, max-age=86400",
//               "Content-Type": url.pathname.endsWith(".css")
//                 ? "text/css"
//                 : "application/javascript"
//             }
//           });
//         } catch {
//           return Utils.notFound();
//         }
//       default:
//         return Utils.notFound();
//     }
//   },
//   { port: port }
// );
// console.log(`Server running at http://0.0.0.0:${port}`);

// minimal.ts
// 加上端口
const port = Number(Deno.env.get("PORT")) || 8000;
const host = "0.0.0.0";
const baseUrl = `http://${host}:${port}`;
console.log(`Server running on ${baseUrl}`);

Deno.serve(
  {
    port: port,
    hostname: host
  },
  (req: Request) => new Response("Hello World")
);


