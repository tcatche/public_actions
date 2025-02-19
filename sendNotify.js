const fetch = require('node-fetch');

function sendNotify(text, content, status) {
  const token = process.env.PUSH_PLUS_TOKEN;
  const tokenErr = process.env.PUSH_PLUS_TOKEN_ERR;
  if (token) {
    content = content.replace(/[\n\r]/g, '<br>'); // 默认为html, 不支持plaintext
    return fetch('http://pushplus.hxtrip.com/send', {
      headers: {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify({
        token: status ? token : tokenErr || token,
        title: `${text}`,
        content:`${content}`,
      }),
      method: 'POST',
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if (data.code === 200) {
        console.log(`push+发送通知消息完成。\n`);
      } else {
        console.error(`push+发送通知消息失败：${data.msg}\n`);
      }
    }).catch((err) => {
      console.error(`push+发送通知消息失败！！\n`)
      console.error(err)
    });
  } else {
    console.error('您未提供push+推送所需的PUSH_PLUS_TOKEN，取消push+推送消息通知\n')
    return Promise.resolve();
  }
}

module.exports = sendNotify;