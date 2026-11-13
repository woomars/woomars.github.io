// 아이폰(iOS) 대응 공통 스크립트. 게임 index.html <head> 에 한 줄:
//   <script src="https://woomars.github.io/ios.js" data-game="<주소 첫 칸>" defer></script>
//   가로 고정이 꼭 필요한 게임은 data-landscape="required" 를 더한다.
// 하는 일
//  1) 가로 필수 게임을 아이폰 Safari(브라우저)로 열면 "홈 화면에 추가해서 앱으로 실행" 안내로 덮는다.
//     아이폰 Safari 는 전체 화면·가로 고정을 못 해서, 홈 화면 앱(standalone)으로 실행할 때만 할 수 있게 한다.
//     허브(woomars.github.io)를 홈 화면에 추가한 앱 안에서 연 게임도 앱으로 친다(같은 범위).
//  2) window.WoomarsIOS.report(): woomars@gmail.com 으로 보낼 문제 신고 메일을 기기 정보와 함께 채워 연다.
//     (정적 사이트라 보내기 버튼은 사용자가 메일 앱에서 누른다.) 게임은 아이폰일 때만 시작 화면에 신고 버튼을 둔다.
// 언어는 ?lang= → woomars.lang(허브·게임 공유) → 브라우저 언어 순(게임과 같음). 시험용: 주소에 ?ios=1(아이폰 흉내) 또는 ?ios=app(앱 실행 흉내).
(function () {
  'use strict';
  var me = document.currentScript;
  var game = (me && me.getAttribute('data-game')) || location.pathname.split('/')[1] || 'hub';
  var landscapeRequired = !!me && me.getAttribute('data-landscape') === 'required';
  var sim = (/[?&]ios=(1|app)(?:&|$)/.exec(location.search) || [])[1];
  var ua = navigator.userAgent || '';
  var isIOS = !!sim || /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var standalone = sim === 'app' || navigator.standalone === true
    || (window.matchMedia && matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches);
  var MAIL = 'woomars@gmail.com';

  var T = {
    ko: {
      title: '홈 화면에 추가해서 실행해 주세요',
      why: '아이폰 Safari는 화면을 가로로 고정할 수 없어서, 이 게임은 홈 화면에 추가한 앱으로 실행할 때만 할 수 있어요.',
      s1: 'Safari 아래쪽(또는 위쪽)의 공유 버튼을 누르세요',
      s2: '「홈 화면에 추가」를 누르세요',
      s3: '홈 화면에 생긴 아이콘으로 실행하고, 폰을 가로로 돌리세요',
      s3i: '홈 화면에 생긴 아이콘으로 실행하세요',
      hub: '메뉴(woomars.github.io)를 홈 화면에 추가해도 모든 게임이 앱으로 열려요.',
      menu: '게임 메뉴로', close: '닫기', report: '아이폰 문제 신고',
      installTitle: '아이폰에 앱으로 설치', installWhy: '홈 화면에 추가하면 주소창 없이 전체 화면으로 열려요.',
      subject: '아이폰 문제 신고', bodyHint: '(어떤 문제가 있었는지 여기에 적어 주세요. 화면을 캡처해 붙여 주시면 더 좋아요.)',
    },
    en: {
      title: 'Add to Home Screen to play',
      why: 'Safari on iPhone can’t lock the screen to landscape, so this game only runs as an app added to your Home Screen.',
      s1: 'Tap the Share button in Safari',
      s2: 'Tap “Add to Home Screen”',
      s3: 'Open it from the new Home Screen icon and turn your phone sideways',
      s3i: 'Open it from the new Home Screen icon',
      hub: 'Adding the menu (woomars.github.io) to your Home Screen also opens every game as an app.',
      menu: 'Game menu', close: 'Close', report: 'Report an iPhone issue',
      installTitle: 'Install on iPhone', installWhy: 'Add it to your Home Screen to open it full screen without the address bar.',
      subject: 'iPhone issue report', bodyHint: '(Please describe the problem here. A screenshot helps a lot.)',
    },
    ja: {
      title: 'ホーム画面に追加して起動してください',
      why: 'iPhoneのSafariは画面を横向きに固定できないため、このゲームはホーム画面に追加したアプリとして起動したときだけ遊べます。',
      s1: 'Safariの共有ボタンをタップ',
      s2: '「ホーム画面に追加」をタップ',
      s3: 'ホーム画面のアイコンから起動して、スマホを横向きに',
      s3i: 'ホーム画面のアイコンから起動',
      hub: 'メニュー（woomars.github.io）をホーム画面に追加しても、すべてのゲームがアプリとして開きます。',
      menu: 'ゲームメニューへ', close: '閉じる', report: 'iPhoneの不具合を報告',
      installTitle: 'iPhoneにアプリとしてインストール', installWhy: 'ホーム画面に追加すると、アドレスバーなしの全画面で開きます。',
      subject: 'iPhone不具合報告', bodyHint: '（どんな問題があったかここに書いてください。スクリーンショットがあると助かります。）',
    },
  };
  // 게임과 같은 순서: 주소 ?lang= → 저장값 woomars.lang → 브라우저 언어(ko·ja 외에는 영어).
  // (정적 <html lang="ko"> 는 보지 않는다 — 게임이 언어를 정하기 전에 이 스크립트가 먼저 돌 수 있어서)
  function lang() {
    var q = /[?&]lang=(ko|en|ja)(?:&|$)/.exec(location.search);
    if (q) return q[1];
    var l = '';
    try { l = localStorage.getItem('woomars.lang') || ''; } catch (e) { /* 저장 안 되는 창 */ }
    if (T[l]) return l;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^ko/i.test(nav) ? 'ko' : /^ja/i.test(nav) ? 'ja' : 'en';
  }
  function t(k) { return T[lang()][k]; }

  function report() {
    var o = (screen.orientation && screen.orientation.type) || (innerWidth > innerHeight ? 'landscape' : 'portrait');
    var info = [
      '---',
      'game: ' + game,
      'page: ' + location.href,
      'lang: ' + lang(),
      'mode: ' + (standalone ? 'home-screen app' : 'browser'),
      'device: ' + ua,
      'screen: ' + screen.width + 'x' + screen.height + ' @' + (window.devicePixelRatio || 1) + 'x, view ' + innerWidth + 'x' + innerHeight + ', ' + o,
      'time: ' + new Date().toISOString(),
    ].join('\n');
    var subject = '[woomars] ' + t('subject') + ': ' + (document.title || game);
    location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(t('bodyHint') + '\n\n\n' + info);
  }

  var SHARE = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style="vertical-align:-4px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
  var CSS = '.wios{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom));background:rgba(10,12,18,.94);color:#eef0f5;font:15px/1.5 system-ui,-apple-system,"Apple SD Gothic Neo","Hiragino Sans",sans-serif;-webkit-text-size-adjust:100%;overflow:auto}'
    + '.wios:lang(ja){font-family:"Hiragino Sans","Yu Gothic UI","Yu Gothic",Meiryo,"Noto Sans JP",system-ui,sans-serif}'
    + '.wios .box{max-width:420px;width:100%}.wios h2{margin:0 0 8px;font-size:20px;line-height:1.3}.wios p{margin:0 0 12px;color:#b9bfcc}'
    + '.wios ol{margin:0 0 12px;padding-left:22px}.wios li{margin:6px 0}.wios .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}'
    + '.wios button,.wios a.b{flex:1 1 auto;min-height:44px;padding:0 14px;border:1px solid #444a5c;border-radius:12px;background:#1e212b;color:#eef0f5;font:inherit;font-weight:700;text-decoration:none;display:flex;align-items:center;justify-content:center;cursor:pointer}'
    + '.wios button.main,.wios a.main{background:#d7301f;border-color:#d7301f}.wios .small{font-size:13px;color:#9aa1b2}';

  function sheet(mode) { // mode: 'gate'(닫기 없음, 게임을 막음) | 'install'(닫을 수 있음)
    if (document.querySelector('.wios')) return;
    if (!document.getElementById('wios-css')) {
      var st = document.createElement('style'); st.id = 'wios-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var gate = mode === 'gate';
    var d = document.createElement('div');
    d.className = 'wios'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.lang = lang();
    d.innerHTML = '<div class="box"><h2></h2><p class="why"></p><ol><li class="s1"></li><li class="s2"></li><li class="s3"></li></ol>'
      + '<p class="small hub"></p><div class="row"></div></div>';
    d.querySelector('h2').textContent = gate ? t('title') : t('installTitle');
    d.querySelector('.why').textContent = gate ? t('why') : t('installWhy');
    d.querySelector('.s1').innerHTML = '';
    d.querySelector('.s1').appendChild(document.createTextNode(t('s1') + ' '));
    d.querySelector('.s1').insertAdjacentHTML('beforeend', SHARE);
    d.querySelector('.s2').textContent = t('s2');
    d.querySelector('.s3').textContent = gate ? t('s3') : t('s3i');
    if (gate && game !== 'hub') d.querySelector('.hub').textContent = t('hub'); else d.querySelector('.hub').remove();
    var row = d.querySelector('.row');
    if (gate) {
      var a = document.createElement('a'); a.className = 'b main'; a.href = 'https://woomars.github.io/'; a.textContent = t('menu'); row.appendChild(a);
    } else {
      var c = document.createElement('button'); c.type = 'button'; c.className = 'main'; c.textContent = t('close');
      c.onclick = function () { d.remove(); }; row.appendChild(c);
    }
    var r = document.createElement('button'); r.type = 'button'; r.textContent = t('report'); r.onclick = report; row.appendChild(r);
    document.body.appendChild(d);
  }

  window.WoomarsIOS = {
    isIOS: isIOS,
    standalone: standalone,
    report: report,
    reportLabel: function () { return t('report'); },
    showInstallGuide: function () { sheet('install'); },
  };
  if (isIOS) document.documentElement.classList.add('is-ios');
  if (isIOS && landscapeRequired && !standalone) {
    if (document.body) sheet('gate'); else document.addEventListener('DOMContentLoaded', function () { sheet('gate'); });
  }
  try { window.dispatchEvent(new Event('woomars-ios-ready')); } catch (e) { /* 아주 오래된 브라우저 */ }
})();
