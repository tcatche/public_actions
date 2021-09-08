
function sendNotify(text, content) {
  return new Promise(resolve => {
    const token = process.env.PUSH_PLUS_TOKEN;
    if (token) {
      content = content.replace(/[\n\r]/g, '<br>'); // 默认为html, 不支持plaintext
      const body = {
        token,
        title: `${text}`,
        content:`${content}`,
      };
      const options = {
        url: `http://www.pushplus.plus/send`,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': ' application/json'
        }
      }
      $.post(options, (err, resp, data) => {
        try {
          if (err) {
            console.log(`push+发送通知消息失败！！\n`)
            console.log(err);
          } else {
            data = JSON.parse(data);
            if (data.code === 200) {
              console.log(`push+发送通知消息完成。\n`)
            } else {
              console.log(`push+发送通知消息失败：${data.msg}\n`)
            }
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve(data);
        }
      })
    } else {
      console.error('您未提供push+推送所需的PUSH_PLUS_TOKEN，取消push+推送消息通知\n');
      resolve()
    }
  })
}

module.exports = sendNotify;