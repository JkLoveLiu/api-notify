import Utils from "../../utils/Utils.ts";
import ConfigService from "../../service/config/ConfigService.ts";
export default async function (url: string, req: Request, kv: any) {
  switch (url) {
    case "/config":
      return await ConfigService.configView();
    case "/config/set":
      return await ConfigService.addConfig(req, kv);
    case "/config/get":
      return ConfigService.getConfig(kv);
    case "/config/delete":
      return await ConfigService.deleteConfig(req,kv);
    default:
      return Utils.notFound();
  }
}
