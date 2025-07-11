import Utils from "../../utils/Utils.ts";

const addLog = async (path: string, req: Request, kv: any) => {
  const headers: { [key: string]: string } = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const contentType = req.headers.get("Content-Type");
  let body;
  console.log("req.body", req.body);
  if (contentType === "application/json") {
    body = await req.json();
    body = JSON.parse(JSON.stringify(body));
  } else if (contentType === "application/x-www-form-urlencoded") {
    body = await req.formData();
  } else {
    body = await req.text();
  }
  // 生成五位随机数
  let id = Date.now() + "U" + (Math.floor(Math.random() * 90000) + 10000);
  let date = Utils.formatData();
  const logEntry = {
    id: id,
    date,
    sort: Date.now(),
    path: path,
    method: req.method,
    url: req.url,
    headers: headers,
    body: body
  };

  try {
    await kv.set(["logs", logEntry.id], logEntry);
  } catch (error) {
    console.error("KV save error:", error);
  }

  const responseConfig = await kv.get(["config", path]);

  if (responseConfig.value) {
    const config = responseConfig.value;
    if (config.contentType === "application/json") {
      return new Response(config.body, {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(config.body, { status: 200 });
  }

  return new Response("配置中没有", { status: 200 });
  /*
  const requestInfo = {
    id: Date.now(),
    date: Utils.formatData(),
    path: path,
    method: req.method,
    url: req.url,
    headers: headers,
    body: body
  };
  let data = await Deno.readTextFile("./logs/data.json");
  let dataArr = JSON.parse(data);
  dataArr.push(requestInfo);
  const jsonString = JSON.stringify(dataArr, null, 2);
  try {
    await Deno.writeTextFile("./logs/data.json", jsonString);
    console.log("File written successfully");
  } catch (error) {
    console.error("Error writing file:", error);
  }
  // 根据config.json中的配置，返回不同的响应
  const configArr = await Deno.readTextFile("./config/config.json");
  const configJson = JSON.parse(configArr);
  let responseConfig: any = null;
  configJson.forEach((item: any) => {
    if (item.path === path) {
      responseConfig = item;
    }
  });
  if (responseConfig !== null) {
    // 如果是json
    if (responseConfig.contentType === "application/json") {
      return new Response(JSON.parse(JSON.stringify(responseConfig.body)), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      return new Response(responseConfig.body, {
        status: 200
      });
    }
  }
  return new Response("配置中没有", {
    status: 200
  });*/
};

export default {
  addLog
};
