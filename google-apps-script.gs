/**
 * LUN8 댄스챌린지 응모 폼 -> 구글시트 저장용 Apps Script.
 *
 * 설치 방법:
 * 1. 아래 시트를 연다: https://docs.google.com/spreadsheets/d/1sycmluzwPK5mr7kc2IGi2CyNoXswsTGCAJwwWdpj1qA/edit
 * 2. 상단 메뉴 확장 프로그램 > Apps Script 클릭
 * 3. 기본으로 있는 코드를 지우고 이 파일 내용을 전부 붙여넣기
 * 4. 우측 상단 배포 > 새 배포 클릭
 * 5. 유형 선택(톱니바퀴) > 웹앱 선택
 * 6. 실행할 사용자: 나(본인 계정) / 액세스 권한이 있는 사용자: 모든 사용자 로 설정
 * 7. 배포 클릭 -> 권한 승인(본인 계정으로 로그인) -> 완료
 * 8. 발급된 "웹 앱 URL"(...../exec 로 끝남)을 복사해서 알려주면 폼에 연결해 드립니다.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter;

  sheet.appendRow([
    new Date(),
    p.lang || '',
    p.tiktok || '',
    p.instagram || '',
    p.email || '',
    p.postdate || '',
    p.contact || '',
    p.agree || '',
    p.moreInfo || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
