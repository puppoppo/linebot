// LINE developersのメッセージ送受信設定に記載のアクセストークン
const ACCESS_TOKEN = 'WraPptsjX6mNi2hfDrCZ7MCXQ+kIMc2HuuZtEJ1ESEzVV4XGSyEDe6WUa6QTReGVmqvVhPEu0eNn9x6GwfRfIHS1gYflvgWoPYoaalMxs8OhlEUXo+drxEpOo5sjFjvTuPWF2hVvw6x0QKg8kosBvAdB04t89/1O/w1cDnyilFU=';
const sheet_id = '1oDuyuOomaYfEWCNXMetN5Rn6C0v1jjTCh-198eA24gg'
const sheet_name = 'シート1'
const sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

function doPost(e) {
  // WebHookで受信した応答用Token
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/message/reply';

  var now = new Date();
  var today = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd');
  var time = Utilities.formatDate(now, 'Asia/Tokyo', 'HH:mm:ss');

  array = [today,time,userMessage];

  sheet.appendRow(array)

  replyMessage = today +' '+ time + \n + '「' + userMessage + '」を記録しました。';

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
        'messages': [{
          'type': 'text',
          'text': replyMessage,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
