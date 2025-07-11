export default {
  welcome: () => {
    return new Response(
      `<h1 style="text-align: center;font-size: 72px;">Hello World</h1>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html" }
      }
    );
  },
  notFound: () => {
    return new Response(
      `<h1 style="text-align: center;font-size: 36px;">Not Found</h1>`,
      {
        status: 404,
        headers: { "Content-Type": "text/html" }
      }
    );
  },
  formatData: () => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const localTime = formatter.format(date);
    const isoStringWithOffset = `${localTime.replace(/[/]/g, "-")}`;
    return isoStringWithOffset;
  }
};
