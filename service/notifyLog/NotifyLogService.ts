const kv = await Deno.openKv(); // 初始化 KV 连接

const viewModel = async () => {
  const html = await Deno.readTextFile("./view/log.html");
  return new Response(html, { headers: { "Content-Type": "text/html" } });
};

const getLog = async () => {
  const entries = kv.list({ prefix: ["logs"] });
  const logs = [];
  for await (const entry of entries) {
    logs.push(entry.value);
  }
  // 对数组进行倒序排序
  logs.sort((a: any, b: any) => {
    return b.sort - a.sort;
  });
  return new Response(JSON.stringify(logs), { status: 200 });
};

const deleteLog = async (req: Request) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) throw new Error("ID is required");
  try {
    await kv.delete(["logs", id]);
    return new Response("删除成功", { status: 200 });
  } catch (error) {
    console.error("删除失败:", error);
    return new Response("删除失败", { status: 500 });
  }
};
const clearLog = async () => {
  try {
    // 获取所有 logs 前缀的条目
    const entries = kv.list({ prefix: ["logs"] });

    // 遍历删除所有匹配的条目
    for await (const entry of entries) {
      await kv.delete(entry.key);
    }

    return new Response("全部日志删除成功", { status: 200 });
  } catch (error) {
    console.error("全部日志删除失败:", error);
    return new Response("全部日志删除失败", { status: 500 });
  }
};
export default {
  getLog,
  viewModel,
  deleteLog,
  clearLog
};
