// 게임 목록. 맨 위에 있는 게임이 메뉴 맨 위에 나온다(새 게임은 맨 위에 추가).
// 개발 중인 게임(wip: true)은 목록 맨 아래에 두고, 다 되면 wip 를 지우고 맨 위로 옮긴다.
// 스크린샷은 언어마다 shots/<id>.webp(한국어), shots/<id>.en.webp, shots/<id>.ja.webp 이고 `node tools/shoot.mjs <id>` 로 셋 다 찍는다.
// 카드 문구는 한국어가 기준이고, en/ja 칸에 영어·일본어를 둔다(키워드는 아래 GAME_TAGS).
var GAMES = [
  {
    id: 'paper-airplane',
    title: '종이비행기 공중전',
    pitch: '색색의 종이비행기를 실제 같은 비행 물리로 모는 3D 공중전',
    goal: '격추 10점 먼저',
    rules: ['방 번호·QR로 최대 5명, 빈 자리는 봇', '화면 아무 곳이나 끌어 조종, 오른쪽 막대로 출력', '기총은 자동 보정 연사, 미사일은 LOCK 뒤 1.5km 안에서 발사'],
    tags: ['1~5명', '인터넷 대전', '봇 대전', '키보드 지원', '가로 화면', '3D 비행'],
    url: 'https://woomars.github.io/paper_airplane_war/',
    en: {
      title: 'Paper Plane Dogfight',
      pitch: 'A 3D dogfight flying colorful paper planes with true-to-life flight physics',
      goal: 'First to 10 kills',
      rules: ['Up to 5 players by room number or QR; empty seats are bots', 'Drag anywhere to steer, right slider for throttle', 'Gun auto-aims as it fires; missiles fire after LOCK within 1.5 km'],
    },
    ja: {
      title: '紙飛行機空中戦',
      pitch: 'カラフルな紙飛行機をリアルな飛行物理で操る3D空中戦',
      goal: '先に10機撃墜',
      rules: ['ルーム番号・QRで最大5人、空き席はボット', '画面のどこでもドラッグで操縦、右のバーで出力', '機銃は自動補正で連射、ミサイルはLOCK後1.5km以内で発射'],
    },
  },
  {
    id: 'makta',
    title: '막타',
    pitch: '폭탄 카드로 서로 공격하며 손패를 먼저 비우는 카드 게임',
    goal: '손패를 먼저 다 내기',
    rules: ['같은 색이나 숫자 내기', '폭격으로 상대 공격', '한 장 남으면 막타!'],
    tags: ['2~10명', '인터넷 대전', '봇 대전', '세로 화면', '카드 게임'],
    url: 'https://woomars.github.io/makta/',
    en: {
      title: 'Last Hit',
      pitch: 'Attack each other with bomb cards and be first to empty your hand',
      goal: 'Play all your cards first',
      rules: ['Play a card of the same color or number', 'Bomb your opponents', 'One card left? Last Hit!'],
    },
    ja: {
      title: 'ラストヒット',
      pitch: '爆弾カードで攻撃し合い、先に手札をなくすカードゲーム',
      goal: '先に手札をすべて出す',
      rules: ['同じ色か数字のカードを出す', '爆撃で相手を攻撃', '残り1枚でラストヒット！'],
    },
  },
  {
    id: 'skyhunt',
    title: 'SkyHunt',
    pitch: '느리지만 잘 도는 비행기 vs 빠르지만 잘 못 도는 미사일, 1:1 추격전',
    goal: '미사일일 때 더 많이 격추하기',
    rules: ['한 명은 비행기, 한 명은 미사일', '상대가 화면 밖이면 방향 화살표만 보임', '2라운드 역할 교대, 격추 수로 승부'],
    tags: ['2명', '인터넷 대전', '봇 대전', '키보드 지원', '가로 화면'],
    url: 'https://woomars.github.io/skyhunt/',
    en: {
      title: 'SkyHunt',
      pitch: 'A slow plane that turns well vs. a fast missile that doesn’t: a 1-on-1 chase',
      goal: 'Score more kills as the missile',
      rules: ['One player is the plane, the other the missile', 'An off-screen opponent shows only as an arrow', 'Swap roles in round 2; most kills wins'],
    },
    ja: {
      title: 'SkyHunt',
      pitch: '遅いが小回りの利く飛行機 vs 速いが曲がりにくいミサイル、1対1の追撃戦',
      goal: 'ミサイルの時に多く撃墜する',
      rules: ['一人は飛行機、一人はミサイル', '相手が画面外なら方向の矢印だけ見える', '2ラウンドで役割交代、撃墜数で勝負'],
    },
  },
  {
    id: 'yeogiyo',
    title: '여기요!',
    pitch: '같은 메뉴가 딱 5개면 벨을 누르는 반응 속도 카드 게임',
    goal: '카드를 모두 모으기',
    rules: ['차례대로 카드 한 장씩 뒤집기', '같은 메뉴 합이 5면 벨!', '틀리면 한 장씩 벌칙'],
    tags: ['2~4명', '인터넷 대전', '봇 대전', '카드 게임', '반응 속도'],
    url: 'https://woomars.github.io/yeogiyo/',
    en: {
      title: 'Excuse Me!',
      pitch: 'A reflex card game: ring the bell when exactly 5 of the same dish show',
      goal: 'Collect all the cards',
      rules: ['Take turns flipping one card each', 'Same dish adds up to 5? Ring the bell!', 'Ring wrong and pay one card each'],
    },
    ja: {
      title: 'すみません！',
      pitch: '同じメニューがちょうど5つになったらベルを押す反射神経カードゲーム',
      goal: 'カードを全部集める',
      rules: ['順番に1枚ずつカードをめくる', '同じメニューの合計が5ならベル！', '間違えたら1枚ずつペナルティ'],
    },
  },
  {
    id: 'stock-rpg',
    title: '목숨걸고 투자',
    pitch: '실제 주가로 기업 몬스터를 쓰러뜨리는 로그라이크',
    goal: '몬스터를 쓰러뜨리고 Clear',
    rules: ['실제 과거 주가 구간에서 사고팔기', '계좌가 곧 목숨', '죽으면 내공으로 영구 강화'],
    tags: ['1명', '세로 화면', '로그라이크', '실제 주가'],
    url: 'https://woomars.github.io/stock-rpg/',
    en: {
      title: 'Invest or Die',
      pitch: 'A roguelike where you slay corporate monsters with real stock prices',
      goal: 'Defeat the monsters and Clear',
      rules: ['Buy and sell over real past price ranges', 'Your account is your life', 'Each death buys permanent upgrades'],
    },
    ja: {
      title: '命がけ投資',
      pitch: '実際の株価で企業モンスターを倒すローグライク',
      goal: 'モンスターを倒してClear',
      rules: ['過去の実際の株価区間で売買', '口座がそのまま命', '死ぬたびに永久強化'],
    },
  },
  {
    id: 'stock-game',
    title: '10년 모의 투자',
    pitch: '실제 시세로 하는 개인용 모의 투자',
    goal: '10년 뒤 자산 최대로',
    rules: ['시작 자금과 시작일 정하기', '한국·미국 400종목 사고팔기', '투자 기록으로 실력 비교'],
    tags: ['1명', '모의 투자', '실제 시세'],
    url: 'https://woomars.github.io/stock-game/',
    en: {
      title: '10-Year Mock Investing',
      pitch: 'Personal paper trading with real market prices',
      goal: 'Grow your assets most in 10 years',
      rules: ['Choose your starting cash and start date', 'Trade 400 Korean and US stocks', 'Compare skill by trading record'],
    },
    ja: {
      title: '10年模擬投資',
      pitch: '実際の相場で遊ぶ個人用の模擬投資',
      goal: '10年後の資産を最大に',
      rules: ['開始資金と開始日を決める', '韓国・米国の400銘柄を売買', '投資記録で腕前を比べる'],
    },
  },
  {
    id: 'abyss',
    title: '심연의 기사',
    pitch: '그은 방향으로 돌진해 연달아 베며 심연을 내려가는 다크 판타지 액션. 쓰러지면 아들이, 손자가 대를 잇는다',
    goal: '대를 이어 더 깊은 층까지 내려가기',
    rules: ['화면을 그으면 그 방향으로 돌진·연쇄 공격, 오른쪽 아래 버튼으로 특수 공격', '층마다 적을 모두 쓰러뜨리면 출구가 열리고, 4·10·20층에는 보스', '떨어진 장비는 대장간에서 착용·분해·강화, 보관함에 넣은 것만 죽어도 남는다'],
    tags: ['1명', '가로 화면', '액션', '로그라이크'],
    url: 'https://woomars.github.io/abyss/',
    en: {
      title: 'Knight of the Abyss',
      pitch: 'Dark fantasy action: dash where you swipe, chain your slashes and descend the abyss. When you fall, your son, then your grandson, carries on',
      goal: 'Carry the bloodline to deeper floors',
      rules: ['Swipe to dash and chain attacks that way; bottom-right button for a special attack', 'Defeat every enemy on a floor to open the exit; bosses on floors 4, 10 and 20', 'Equip, salvage or upgrade drops at the forge; only stored items survive death'],
    },
    ja: {
      title: '深淵の騎士',
      pitch: 'なぞった方向へ突進して連続で斬り、深淵を降りていくダークファンタジーアクション。倒れても息子が、孫が跡を継ぐ',
      goal: '代を重ねてより深い階層へ',
      rules: ['画面をなぞるとその方向へ突進・連続攻撃、右下のボタンで特殊攻撃', '階の敵を全滅させると出口が開き、4・10・20階にはボス', '拾った装備は鍛冶場で装備・分解・強化、保管庫の物だけが死後も残る'],
    },
    wip: true, // 개발 중: 맨 아래에 흐리게, 버튼은 '개발 중'
  },
];

// 키워드 번역. 인원(예: '2~10명')은 자동으로 옮기고, 나머지 키워드는 여기서 찾는다(빠지면 테스트가 잡음).
var GAME_TAGS = {
  '인터넷 대전': { en: 'Online play', ja: 'オンライン対戦' },
  '봇 대전': { en: 'Vs. bots', ja: 'ボット対戦' },
  '키보드 지원': { en: 'Keyboard', ja: 'キーボード対応' },
  '가로 화면': { en: 'Landscape', ja: '横画面' },
  '세로 화면': { en: 'Portrait', ja: '縦画面' },
  '3D 비행': { en: '3D flight', ja: '3Dフライト' },
  '카드 게임': { en: 'Card game', ja: 'カードゲーム' },
  '반응 속도': { en: 'Reflexes', ja: '反射神経' },
  '로그라이크': { en: 'Roguelike', ja: 'ローグライク' },
  '실제 주가': { en: 'Real stock prices', ja: '実際の株価' },
  '모의 투자': { en: 'Paper trading', ja: '模擬投資' },
  '실제 시세': { en: 'Real market data', ja: '実際の相場' },
  '액션': { en: 'Action', ja: 'アクション' },
};

// 게임 g 를 언어 lang('ko'|'en'|'ja')으로 옮긴 카드 내용. 영어·일본어 칸(g.en, g.ja)이 없으면 한국어 그대로.
function gameText(g, lang) {
  var t = (lang !== 'ko' && g[lang]) || {};
  function tag(k) {
    var m = /^(\d+)(?:~(\d+))?명$/.exec(k);
    if (m && lang === 'en') return m[2] ? m[1] + '–' + m[2] + ' players' : m[1] + (m[1] === '1' ? ' player' : ' players');
    if (m && lang === 'ja') return m[2] ? m[1] + '〜' + m[2] + '人' : m[1] + '人';
    return (lang !== 'ko' && GAME_TAGS[k] && GAME_TAGS[k][lang]) || k;
  }
  return {
    title: t.title || g.title,
    pitch: t.pitch || g.pitch,
    goal: t.goal || g.goal,
    rules: t.rules || g.rules,
    tags: g.tags.map(tag),
  };
}

if (typeof module !== 'undefined') {
  module.exports = GAMES;
  module.exports.GAME_TAGS = GAME_TAGS;
  module.exports.gameText = gameText;
}
