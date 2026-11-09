// 게임 목록. 맨 위에 있는 게임이 메뉴 맨 위에 나온다(새 게임은 맨 위에 추가).
// 스크린샷은 shots/<id>.webp 이고 `node tools/shoot.mjs <id>` 로 찍는다.
var GAMES = [
  {
    id: 'yeogiyo',
    title: '여기요!',
    pitch: '같은 메뉴가 딱 5개면 벨을 누르는 가족용 반응 속도 카드 게임',
    goal: '카드를 모두 모으기',
    rules: ['차례대로 카드 한 장씩 뒤집기', '같은 메뉴 합이 5면 벨!', '틀리면 한 장씩 벌칙'],
    tags: ['2~4명', '같은 와이파이', '반응 속도'],
    url: 'https://woomars.github.io/yeogiyo/',
  },
  {
    id: 'stock-rpg',
    title: '목숨걸고 투자',
    pitch: '실제 주가로 기업 몬스터를 쓰러뜨리는 로그라이크',
    goal: '몬스터를 쓰러뜨리고 Clear',
    rules: ['실제 과거 주가 구간에서 사고팔기', '계좌가 곧 목숨', '죽으면 내공으로 영구 강화'],
    tags: ['1명', '로그라이크', '실제 주가'],
    url: 'https://woomars.github.io/stock-rpg/',
  },
  {
    id: 'stock-game',
    title: '10년 모의 투자',
    pitch: '실제 시세로 하는 개인용 모의 투자',
    goal: '10년 뒤 자산 최대로',
    rules: ['시작 자금과 시작일 정하기', '한국·미국 400종목 사고팔기', '투자 기록으로 실력 비교'],
    tags: ['1명', '모의 투자', '실제 시세'],
    url: 'https://woomars.github.io/stock-game/',
  },
];

if (typeof module !== 'undefined') module.exports = GAMES;
