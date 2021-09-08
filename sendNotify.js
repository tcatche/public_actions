const fetch = require('node-fetch');

function sendNotify(text, content) {
  const token = process.env.PUSH_PLUS_TOKEN;
  if (token) {
    content = content.replace(/[\n\r]/g, '<br>'); // 默认为html, 不支持plaintext
    return fetch('http://www.pushplus.plus/send', {
      headers: {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify({
        token,
        title: `${text}`,
        content:`${content}`,
      }),
      method: 'POST',
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if (data.code === 200) {
        console.log(`push+发送通知消息完成。\n`)
        return Promise.resolve(data);
      } else {
        return Promise.reject(`push+发送通知消息失败：${data.msg}\n`);
      }
      return Promise.resolve(data);
    }).catch((err) => {
      console.error(`push+发送通知消息失败！！\n`)
      return Promise.reject(err);
    }).finally;
  } else {
    return Promise.reject('您未提供push+推送所需的PUSH_PLUS_TOKEN，取消push+推送消息通知\n');
  }
}

module.exports = sendNotify;