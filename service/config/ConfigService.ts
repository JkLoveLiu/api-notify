/**
 * 增加
 * @param req 请求数据
 */
const addConfig = async (req: Request, kv: any) => {
  // 获取请求数据
  const reqData = await req.json();
  // 使用原子事务存储数据
  await kv.set(["config", reqData.path], reqData);
  return new Response("设置成功", { status: 200 });
};
/**
 * 获取
 * @returns
 */
const getConfig = async (kv: any) => {
  const entries = kv.list({ prefix: ["config"] });
  const result = [];
  for await (const entry of entries) {
    result.push(entry.value);
  }
  return new Response(JSON.stringify(result), { status: 200 });
};
/**
 * 删除
 * @param req 请求数据
 * @returns
 */
const deleteConfig = async (req: Request,kv: any) => {
  const path = new URL(req.url).searchParams.get("path");
  await kv.delete(["config", path]);
  return new Response("删除成功", { status: 200 });
};
/**
 * config查看页面
 * @returns html
 */
const configView = async () => {
  const html = await Deno.readTextFile("./view/config.html");
  return new Response(html, { headers: { "Content-Type": "text/html" } });
};
export default {
  addConfig,
  getConfig,
  configView,
  deleteConfig
};
