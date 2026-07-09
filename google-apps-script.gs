/**
 * LUN8 SNEAKERS 댄스챌린지 응모 폼 -> 구글시트 저장용 Apps Script.
 *
 * 설치 방법:
 * 1. 새 구글 시트를 만들고(또는 이번 캠페인용으로 만들어둔 시트를 연다)
 *    첫 번째 시트 1행에 다음 헤더를 순서대로 넣어두면 보기 편하다:
 *    timestamp / lang / name / email / contact / follower1000 / platform / tiktok / instagram / postdate / agree / friend_links / friend_emails
 *    (친구를 여러 명 추천한 경우 friend_links, friend_emails 칸에 쉼표로 구분되어 함께 들어간다)
 * 2. 상단 메뉴 확장 프로그램 > Apps Script 클릭
 * 3. 기본으로 있는 코드를 지우고 이 파일 내용을 전부 붙여넣기
 * 4. 우측 상단 배포 > 새 배포 클릭
 * 5. 유형 선택(톱니바퀴) > 웹앱 선택
 * 6. 실행할 사용자: 나(본인 계정) / 액세스 권한이 있는 사용자: 모든 사용자 로 설정
 * 7. 배포 클릭 -> 권한 승인(본인 계정으로 로그인) -> 완료
 * 8. 발급된 "웹 앱 URL"(...../exec 로 끝남)을 ko.html, ja.html의 GOOGLE_SCRIPT_URL 에 넣으면 저장이 시작된다.
 */

var MAIN_HEADERS = ['timestamp','lang','name','email','contact','follower1000','platform','tiktok','instagram','postdate','agree','friend_links','friend_emails'];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter;

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(MAIN_HEADERS);
  }

  var friendLinks = ((e.parameters && e.parameters.friendLink) || []).filter(function(v){ return v; });
  var friendEmails = ((e.parameters && e.parameters.friendEmail) || []).filter(function(v){ return v; });

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
    p.agree || '',
    friendLinks.join(', '),
    friendEmails.join(', ')
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
