/**
 * LUN8 SNEAKERS 댄스챌린지 응모 폼 -> 구글시트 저장용 Apps Script.
 *
 * 설치 방법:
 * 1. 새 구글 시트를 만들고(또는 이번 캠페인용으로 만들어둔 시트를 연다)
 *    첫 번째 시트 1행에 다음 헤더를 순서대로 넣어두면 보기 편하다:
 *    timestamp / lang / name / email / contact / follower1000 / platform / tiktok / instagram / postdate / agree
 *    (친구 추천은 "친구추천"이라는 별도 시트 탭에 1명당 1행씩 자동으로 쌓인다 - 없으면 자동 생성됨)
 * 2. 상단 메뉴 확장 프로그램 > Apps Script 클릭
 * 3. 기본으로 있는 코드를 지우고 이 파일 내용을 전부 붙여넣기
 * 4. 우측 상단 배포 > 새 배포 클릭
 * 5. 유형 선택(톱니바퀴) > 웹앱 선택
 * 6. 실행할 사용자: 나(본인 계정) / 액세스 권한이 있는 사용자: 모든 사용자 로 설정
 * 7. 배포 클릭 -> 권한 승인(본인 계정으로 로그인) -> 완료
 * 8. 발급된 "웹 앱 URL"(...../exec 로 끝남)을 ko.html, ja.html의 GOOGLE_SCRIPT_URL 에 넣으면 저장이 시작된다.
 */

var MAIN_HEADERS = ['timestamp','lang','name','email','contact','follower1000','platform','tiktok','instagram','postdate','agree'];
var FRIEND_SHEET_NAME = '친구추천';
var FRIEND_HEADERS = ['timestamp','referrer_name','referrer_email','friend_link','friend_email'];

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var p = e.parameter;

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(MAIN_HEADERS);
  }

  sheet.appendRow([
    new Date(),
    p.lang || '',
    p.name || '',
    p.email || '',
    p.contact || '',
    p.follower1000 || '',
    p.platform || '',
    p.tiktok || '',
    p.instagram || '',
    p.postdate || '',
    p.agree || ''
  ]);

  var friendLinks = (e.parameters && e.parameters.friendLink) || [];
  var friendEmails = (e.parameters && e.parameters.friendEmail) || [];

  if (friendLinks.length > 0) {
    var friendSheet = ss.getSheetByName(FRIEND_SHEET_NAME);
    if (!friendSheet) {
      friendSheet = ss.insertSheet(FRIEND_SHEET_NAME);
    }
    if (friendSheet.getLastRow() === 0) {
      friendSheet.appendRow(FRIEND_HEADERS);
    }
    for (var i = 0; i < friendLinks.length; i++) {
      if (!friendLinks[i]) continue;
      friendSheet.appendRow([
        new Date(),
        p.name || '',
        p.email || '',
        friendLinks[i],
        friendEmails[i] || ''
      ]);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
