import NotifyLogService from "../../service/notifyLog/NotifyLogService.ts";
import Utils from "../../utils/Utils.ts";
export default async function (url: string, req: Request) {
  switch (url) {
    case "/notifyLog/view":
      return await NotifyLogService.viewModel();
    case "/notifyLog/get":
      return await NotifyLogService.getLog();
    case "/notifyLog/delete":
      return await NotifyLogService.deleteLog(req);
    case "/notifyLog/clear":
      return await NotifyLogService.clearLog();
    default:
      return Utils.notFound();
  }
}
