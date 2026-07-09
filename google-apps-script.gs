/**
 * LUN8 SNEAKERS 댄스챌린지 응모 폼 -> 구글시트 저장용 Apps Script.
 *
 * 설치 방법:
 * 1. 새 구글 시트를 만들고(또는 이번 캠페인용으로 만들어둔 시트를 연다)
 *    첫 번째 시트 1행에 다음 헤더를 순서대로 넣어두면 보기 편하다 (읽기 쉬운 한글 라벨,
 *    실제 값은 이 순서대로만 채워지면 되므로 헤더 텍스트는 자유롭게 바꿔도 코드 동작에는 영향 없음.
 *    단, 열 순서를 바꾸거나 중간에 새 열을 끼워넣는 것은 금지 — appendRow가 항상 이 순서대로 값을 채운다):
 *    제출시각 / 언어 / 이름·닉네임 / 이메일 / 연락처 / 팔로워1000확인 / 참여플랫폼 / TikTok링크 / Instagram링크 / 업로드예정일 / 약관동의 /
 *    친구1 SNS링크 / 친구1 이메일 / 친구2 SNS링크 / 친구2 이메일 / 친구3 SNS링크 / 친구3 이메일 /
 *    친구4 SNS링크 / 친구4 이메일 / 친구5 SNS링크 / 친구5 이메일
 *    (친구는 최대 5명까지 각각 별도 칸에 들어간다. 폼에서도 5명까지만 추가 가능하도록 제한돼 있다)
 * 2. 상단 메뉴 확장 프로그램 > Apps Script 클릭
 * 3. 기본으로 있는 코드를 지우고 이 파일 내용을 전부 붙여넣기
 * 4. 우측 상단 배포 > 새 배포 클릭
 * 5. 유형 선택(톱니바퀴) > 웹앱 선택
 * 6. 실행할 사용자: 나(본인 계정) / 액세스 권한이 있는 사용자: 모든 사용자 로 설정
 * 7. 배포 클릭 -> 권한 승인(본인 계정으로 로그인) -> 완료
 * 8. 발급된 "웹 앱 URL"(...../exec 로 끝남)을 ko.html, ja.html의 GOOGLE_SCRIPT_URL 에 넣으면 저장이 시작된다.
 */

var FRIEND_MAX = 5;
var MAIN_HEADERS = (function(){
  var headers = ['timestamp','lang','name','email','contact','follower1000','platform','tiktok','instagram','postdate','agree'];
  for (var i = 1; i <= FRIEND_MAX; i++) {
    headers.push('friend' + i + '_link', 'friend' + i + '_email');
  }
  return headers;
})();

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter;

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(MAIN_HEADERS);
  }

  var friendLinks = ((e.parameters && e.parameters.friendLink) || []).filter(function(v){ return v; });
  var friendEmails = ((e.parameters && e.parameters.friendEmail) || []).filter(function(v){ return v; });

  var row = [
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
  ];

  for (var i = 0; i < FRIEND_MAX; i++) {
    row.push(friendLinks[i] || '', friendEmails[i] || '');
  }

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
