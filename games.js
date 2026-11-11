// 게임 목록. 맨 위에 있는 게임이 메뉴 맨 위에 나온다(새 게임은 맨 위에 추가).
// 스크린샷은 shots/<id>.webp 이고 `node tools/shoot.mjs <id>` 로 찍는다.
var GAMES = [
  {
    id: 'paper-airplane',
    title: '종이비행기 공중전',
    pitch: '색색의 종이비행기를 실제 같은 비행 물리로 모는 3D 공중전',
    goal: '격추 10점 먼저',
    rules: ['방 번호·QR로 최대 5명, 빈 자리는 봇', '화면 아무 곳이나 끌어 조종, 오른쪽 막대로 출력', '기총은 자동 보정 연사, 미사일은 LOCK 뒤 1.5km 안에서 발사'],
    tags: ['1~5명', '인터넷 대전', '봇 대전', '키보드 지원', '가로 화면', '3D 비행'],
    url: 'https://woomars.github.io/paper_airplane_war/',
  },
  {
    id: 'makta',
    title: '막타',
    pitch: '폭탄 카드로 서로 공격하며 손패를 먼저 비우는 카드 게임',
    goal: '손패를 먼저 다 내기',
    rules: ['같은 색이나 숫자 내기', '폭격으로 상대 공격', '한 장 남으면 막타!'],
    tags: ['2~10명', '인터넷 대전', '봇 대전', '세로 화면', '카드 게임'],
    url: 'https://woomars.github.io/makta/',
  },
  {
    id: 'skyhunt',
    title: 'SkyHunt',
    pitch: '느리지만 잘 도는 비행기 vs 빠르지만 잘 못 도는 미사일, 1:1 추격전',
    goal: '미사일일 때 더 많이 격추하기',
    rules: ['한 명은 비행기, 한 명은 미사일', '상대가 화면 밖이면 방향 화살표만 보임', '2라운드 역할 교대, 격추 수로 승부'],
    tags: ['2명', '인터넷 대전', '봇 대전', '키보드 지원', '가로 화면'],
    url: 'https://woomars.github.io/skyhunt/',
  },
  {
    id: 'yeogiyo',
    title: '여기요!',
    pitch: '같은 메뉴가 딱 5개면 벨을 누르는 반응 속도 카드 게임',
    goal: '카드를 모두 모으기',
    rules: ['차례대로 카드 한 장씩 뒤집기', '같은 메뉴 합이 5면 벨!', '틀리면 한 장씩 벌칙'],
    tags: ['2~4명', '인터넷 대전', '봇 대전', '카드 게임', '반응 속도'],
    url: 'https://woomars.github.io/yeogiyo/',
  },
  {
    id: 'stock-rpg',
    title: '목숨걸고 투자',
    pitch: '실제 주가로 기업 몬스터를 쓰러뜨리는 로그라이크',
    goal: '몬스터를 쓰러뜨리고 Clear',
    rules: ['실제 과거 주가 구간에서 사고팔기', '계좌가 곧 목숨', '죽으면 내공으로 영구 강화'],
    tags: ['1명', '세로 화면', '로그라이크', '실제 주가'],
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
