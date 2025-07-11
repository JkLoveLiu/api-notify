import NotifyService from "../../service/notify/NotifyService.ts";
export default async function (url: string, req: Request, kv: any) {
  return await NotifyService.addLog(url, req, kv);
}
