// 게임 화면에 한 줄 넣으면, 이 기기가 그 게임을 여는 날마다 하루 한 번 센다(메뉴 카드의 "○명이 해 봤어요").
//   <script src="https://woomars.github.io/count.js" defer></script>
// 게임 id는 주소의 첫 칸이다(https://woomars.github.io/yeogiyo/ → yeogiyo). 개인정보는 보내지 않는다.
(function () {
  'use strict';
  if (location.hostname !== 'woomars.github.io') return; // 로컬 개발 화면은 세지 않는다
  var id = location.pathname.split('/')[1] || '';
  if (!/^[a-z0-9_-]{1,40}$/.test(id)) return;
  var key = 'woomars.played.' + id;
  function day(d) { // 이 기기 시간 기준 날짜(연-월-일)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  var today = day(new Date());
  try {
    var saved = localStorage.getItem(key) || '';
    if (/^\d+$/.test(saved)) saved = day(new Date(Number(saved))); // 예전에는 센 시각(숫자)을 저장했다
    if (saved === today) return;
  } catch (e) {
    return; // 저장이 안 되는 창(사생활 보호 등)에서는 열 때마다 셀 수 있으니 세지 않는다
  }
  if (typeof fetch !== 'function') return;
  fetch('https://woomars-counter.vercel.app/api/plays', { method: 'POST', body: id, keepalive: true })
    .then(function (r) {
      if (r.ok) {
        try { localStorage.setItem(key, today); } catch (e) { /* 무시 */ }
      }
    })
    .catch(function () { /* 다음에 다시 센다 */ });
})();
