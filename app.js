const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const COLORS = ['#222222','#ef4444','#f97316','#facc15','#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899','#8b5a2b'];
const categories = [
  ['land','🐯','陸地動物'],['sea','🐳','海洋生物'],['air','🦋','空中生物'],['insect','🐞','昆蟲'],
  ['food','🍎','蔬果食物'],['vehicle','🚗','交通工具'],['daily','🧸','日常用品'],['nature','🌳','自然生活']
];

const CATEGORY_DESCRIPTIONS = {
  land:'熊、馬、綿羊、狐狸、熊貓、小鹿、無尾熊、袋鼠、斑馬、松鼠、浣熊、刺蝟、駱駝、河馬、老虎、獅子等陸地動物、樹懶、大猩猩',
  sea:'魚、海豚、鯨魚、章魚、水母、海星、海馬、海豹、龍蝦、魷魚、貝殼、河豚、蝦子、海膽、珊瑚魚、魟魚、獨角鯨等海洋生物、珍珠貝、小丑魚',
  air:'小鳥、鴨子、天鵝、孔雀、老鷹、鸚鵡、貓頭鷹、紅鶴、鴿子、企鵝、海鷗、蜂鳥、啄木鳥、鵜鶘、麻雀、蝙蝠、烏鴉等鳥類、巨嘴鳥、白鵝',
  insect:'瓢蟲、蜜蜂、螞蟻、毛毛蟲、甲蟲、蚱蜢、蜘蛛、螢火蟲、蝸牛、蠍子、螳螂、蜈蚣、金龜子、天牛、蚊子、蒼蠅、蟑螂、蚯蚓等小生物、蟬、獨角仙',
  food:'水果與食物圖案，包含芒果、紅蘿蔔、櫻桃、玉米、餅乾、番茄、南瓜、檸檬、甜甜圈、酪梨、杯子蛋糕、披薩、熱狗等生活辨識素材、可頌、三明治',
  vehicle:'汽車、公車、卡車、計程車、直升機、小巴士、火箭、拖拉機、輪船、快艇、纜車、垃圾車、帆船、電車、熱氣球、工程車等交通工具、水泥車、拖吊車',
  daily:'杯子、書、鉛筆、時鐘、牙刷、檯燈、肥皂、椅子、湯匙、球鞋、剪刀、帽子、牙膏、梳子、茶壺、叉子等日常用品、碗、平底鍋',
  nature:'太陽、雲、樹、花、山、香菇、雪花、仙人掌、雨滴、橡實、火山、楓葉、松樹、松果、瀑布、岩石、洞穴等自然景物、帳篷、風箏'
};
function categoryStats(){
  const orderMap=new Map(DISPLAY_ORDER.map((id,i)=>[id,i]));
  const formal=templates.filter(t=>isSampleTemplate(t.id)).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
  return categories.map(([id,em,name])=>{
    const items=formal.filter(t=>t.cat===id);
    return {id,em,name,items,count:items.length,preview:items.slice(0,3)};
  });
}

const STYLE_BOARD = './assets/overview/color-200.png';
const SAMPLE_TEMPLATE_IDS = ['apple1','ball1','fish1','cat2','dog4','rabbit4','elephant5','butterfly3','cup2','car3','bus7','train8','firetruck8','plane7','backpack3','cow9','pig4','monkey5','lion5','giraffe9','turtle9','dolphin6','whale6','farm10','bird2','crab6','bicycle7','house8','tiger10','ladybug10','banana1','orange1','strawberry2','book2','umbrella2','grape3','watermelon3','bee4','dragonfly5','boat6','sun1','star1','cloud1','moon2','flower3','tree4','rainbow4','policecar7','ambulance7','excavator8','scooter5','truck6','leaf2','mountain6','bear5','horse6','octopus7','shark7','pear2','pineapple4','pencil4','clock4','owl5','parrot6','ant4','caterpillar5','mango2','carrot3','toothbrush5','lamp5','sheep5','fox6','jellyfish6','starfish4','duck3','eagle7','beetle6','grasshopper6','taxi5','helicopter7','mushroom4','snowflake5','panda6','deer7','seahorse5','seal6','swan5','peacock7','spider6','firefly5','cherry3','corn4','soap4','chair5','van6','rocket7','cactus5','raindrop2','koala6','acorn3','cookie4','tractor6','kangaroo6','lobster6','squid6','shell4','flamingo6','dove4','bat5','crow5','mosquito5','fly4','cockroach6','worm4','tomato3','pumpkin4','spoon3','sneaker5','volcano7','ship6','zebra5','squirrel5','pufferfish5','shrimp4','penguin4','seagull5','snail4','scorpion6','lemon2','donut4','scissors4','cap3','speedboat6','cablecar6','mapleleaf3','pinetree4','raccoon5','hedgehog5','seaurchin5','coralfish5','hummingbird6','woodpecker6','mantis5','centipede6','avocado3','cupcake4','toothpaste4','comb3','garbagetruck7','sailboat6','pinecone4','waterfall5','camel6','hippo6','mantaray6','narwhal6','pelican6','sparrow4','scarab6','longhornbeetle6','pizza4','hotdog4','teapot4','fork3','tram7','hotairballoon7','rock4','cave5','sloth6','gorilla7','pearloyster5','clownfish5','toucan6','goose5','cicada6','rhinobeetle6','croissant3','sandwich4','bowl3','fryingpan5','cementmixer7','towtruck7','tent4','kite4','alpaca6','beaver6','otter6','coral5','robin4','kingfisher6','stickinsect6','silkworm5','sushi4','icecream4','plate3','lantern4','motorcycle6','forklift7','campfire5','island5'];
const DISPLAY_ORDER = ['apple1','banana1','orange1','ball1','fish1','star1','cloud1','bird2','pear2','book2','umbrella2','cat2','cup2','leaf2','mango2','moon2','grape3','watermelon3','strawberry2','butterfly3','backpack3','car3','flower3','duck3','carrot3','dog4','rabbit4','pig4','bee4','pineapple4','pencil4','clock4','rainbow4','ant4','starfish4','mushroom4','tree4','elephant5','monkey5','lion5','dragonfly5','sun1','bear5','owl5','caterpillar5','scooter5','sheep5','toothbrush5','lamp5','snowflake5','taxi5','crab6','dolphin6','whale6','boat6','truck6','mountain6','horse6','parrot6','fox6','jellyfish6','beetle6','grasshopper6','plane7','bicycle7','bus7','octopus7','shark7','policecar7','ambulance7','eagle7','helicopter7','train8','firetruck8','house8','excavator8','cow9','giraffe9','turtle9','tiger10','ladybug10','farm10','cherry3','acorn3','raindrop2','corn4','cookie4','soap4','chair5','panda6','deer7','koala6','seahorse5','seal6','swan5','peacock7','spider6','firefly5','van6','rocket7','tractor6','cactus5','kangaroo6','lobster6','squid6','shell4','flamingo6','dove4','bat5','crow5','mosquito5','fly4','cockroach6','worm4','tomato3','pumpkin4','spoon3','sneaker5','volcano7','ship6','zebra5','squirrel5','pufferfish5','shrimp4','penguin4','seagull5','snail4','scorpion6','lemon2','donut4','scissors4','cap3','speedboat6','cablecar6','mapleleaf3','pinetree4','raccoon5','hedgehog5','seaurchin5','coralfish5','hummingbird6','woodpecker6','mantis5','centipede6','avocado3','cupcake4','toothpaste4','comb3','garbagetruck7','sailboat6','pinecone4','waterfall5','camel6','hippo6','mantaray6','narwhal6','pelican6','sparrow4','scarab6','longhornbeetle6','pizza4','hotdog4','teapot4','fork3','tram7','hotairballoon7','rock4','cave5','sloth6','gorilla7','pearloyster5','clownfish5','toucan6','goose5','cicada6','rhinobeetle6','croissant3','sandwich4','bowl3','fryingpan5','cementmixer7','towtruck7','tent4','kite4','alpaca6','beaver6','otter6','coral5','robin4','kingfisher6','stickinsect6','silkworm5','sushi4','icecream4','plate3','lantern4','motorcycle6','forklift7','campfire5','island5'];
const STORAGE_LIBRARY_MODE = 'kidsDrawingLibraryModeV1716';
const STORAGE_GUIDE_STYLE = 'kidsDrawingGuideStyleV172';
const STORAGE_DETAIL_MODE = 'kidsDrawingDetailModeV174';
const STORAGE_PALETTE_COLLAPSED = 'kidsDrawingPaletteCollapsedV162';

function isSampleTemplate(id){ return SAMPLE_TEMPLATE_IDS.includes(id); }
function getLibraryMode(){ return localStorage.getItem(STORAGE_LIBRARY_MODE) || 'sample'; }
function setLibraryMode(mode){ localStorage.setItem(STORAGE_LIBRARY_MODE, mode); }
function getGuideStyle(){ const saved=localStorage.getItem(STORAGE_GUIDE_STYLE); return saved==='outline'?'outline':'color'; }
function saveGuideStyle(style){ localStorage.setItem(STORAGE_GUIDE_STYLE, style==='outline'?'outline':'color'); }
function getDetailMode(){ return 'simple'; }
function saveDetailMode(mode){ return 'simple'; }

const svgWrap = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#3a3a3a" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const templates = [








  {id:'apple1',lv:1,cat:'food',emoji:'🍎',zh:'蘋果',zhuyin:'ㄆㄧㄣˊ ㄍㄨㄛˇ',en:'Apple',kk:'[ˈæpəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蘋果</text></svg>`},
  {id:'ball1',lv:1,cat:'daily',emoji:'⚽',zh:'球',zhuyin:'ㄑㄧㄡˊ',en:'Ball',kk:'[bɔl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">球</text></svg>`},
  {id:'fish1',lv:1,cat:'sea',emoji:'🐟',zh:'魚',zhuyin:'ㄩˊ',en:'Fish',kk:'[fɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">魚</text></svg>`},
  {id:'bird2',lv:2,cat:'air',emoji:'🐦',zh:'小鳥',zhuyin:'ㄒㄧㄠˇ ㄋㄧㄠˇ',en:'Bird',kk:'[bɝd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小鳥</text></svg>`},
  {id:'cat2',lv:2,cat:'land',emoji:'🐱',zh:'貓',zhuyin:'ㄇㄠ',en:'Cat',kk:'[kæt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">貓</text></svg>`},
  {id:'cup2',lv:2,cat:'daily',emoji:'☕',zh:'杯子',zhuyin:'ㄅㄟ ㄗ˙',en:'Cup',kk:'[kʌp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">杯子</text></svg>`},
  {id:'car3',lv:3,cat:'vehicle',emoji:'🚗',zh:'汽車',zhuyin:'ㄑㄧˋ ㄔㄜ',en:'Car',kk:'[kɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">汽車</text></svg>`},
  {id:'backpack3',lv:3,cat:'daily',emoji:'🎒',zh:'書包',zhuyin:'ㄕㄨ ㄅㄠ',en:'Backpack',kk:'[ˈbækˌpæk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">書包</text></svg>`},
  {id:'butterfly3',lv:3,cat:'air',emoji:'🦋',zh:'蝴蝶',zhuyin:'ㄏㄨˊ ㄉㄧㄝˊ',en:'Butterfly',kk:'[ˈbʌtɚˌflaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蝴蝶</text></svg>`},
  {id:'rabbit4',lv:4,cat:'land',emoji:'🐰',zh:'兔子',zhuyin:'ㄊㄨˋ ㄗ˙',en:'Rabbit',kk:'[ˈræbɪt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">兔子</text></svg>`},
  {id:'dog4',lv:4,cat:'land',emoji:'🐶',zh:'狗',zhuyin:'ㄍㄡˇ',en:'Dog',kk:'[dɔɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">狗</text></svg>`},
  {id:'pig4',lv:4,cat:'land',emoji:'🐷',zh:'豬',zhuyin:'ㄓㄨ',en:'Pig',kk:'[pɪɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">豬</text></svg>`},
  {id:'elephant5',lv:5,cat:'land',emoji:'🐘',zh:'大象',zhuyin:'ㄉㄚˋ ㄒㄧㄤˋ',en:'Elephant',kk:'[ˈɛləfənt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">大象</text></svg>`},
  {id:'lion5',lv:5,cat:'land',emoji:'🦁',zh:'獅子',zhuyin:'ㄕ ㄗ˙',en:'Lion',kk:'[ˈlaɪən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">獅子</text></svg>`},
  {id:'monkey5',lv:5,cat:'land',emoji:'🐵',zh:'猴子',zhuyin:'ㄏㄡˊ ㄗ˙',en:'Monkey',kk:'[ˈmʌŋki]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">猴子</text></svg>`},
  {id:'whale6',lv:6,cat:'sea',emoji:'🐋',zh:'鯨魚',zhuyin:'ㄐㄧㄥ ㄩˊ',en:'Whale',kk:'[wel]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鯨魚</text></svg>`},
  {id:'dolphin6',lv:6,cat:'sea',emoji:'🐬',zh:'海豚',zhuyin:'ㄏㄞˇ ㄊㄨㄣˊ',en:'Dolphin',kk:'[ˈdɑlfɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海豚</text></svg>`},
  {id:'crab6',lv:6,cat:'sea',emoji:'🦀',zh:'螃蟹',zhuyin:'ㄆㄤˊ ㄒㄧㄝˋ',en:'Crab',kk:'[kræb]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">螃蟹</text></svg>`},
  {id:'plane7',lv:7,cat:'vehicle',emoji:'✈️',zh:'飛機',zhuyin:'ㄈㄟ ㄐㄧ',en:'Airplane',kk:'[ˈɛrˌpleɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">飛機</text></svg>`},
  {id:'bicycle7',lv:7,cat:'vehicle',emoji:'🚲',zh:'腳踏車',zhuyin:'ㄐㄧㄠˇ ㄊㄚˋ ㄔㄜ',en:'Bicycle',kk:'[ˈbaɪsɪkəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">腳踏車</text></svg>`},
  {id:'bus7',lv:7,cat:'vehicle',emoji:'🚌',zh:'公車',zhuyin:'ㄍㄨㄥ ㄔㄜ',en:'Bus',kk:'[bʌs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">公車</text></svg>`},
  {id:'firetruck8',lv:8,cat:'vehicle',emoji:'🚒',zh:'消防車',zhuyin:'ㄒㄧㄠ ㄈㄤˊ ㄔㄜ',en:'Fire truck',kk:'[ˈfaɪɚ trʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">消防車</text></svg>`},
  {id:'train8',lv:8,cat:'vehicle',emoji:'🚂',zh:'火車',zhuyin:'ㄏㄨㄛˇ ㄔㄜ',en:'Train',kk:'[tren]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">火車</text></svg>`},
  {id:'house8',lv:8,cat:'daily',emoji:'🏠',zh:'房子',zhuyin:'ㄈㄤˊ ㄗ˙',en:'House',kk:'[haʊs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">房子</text></svg>`},
  {id:'cow9',lv:9,cat:'land',emoji:'🐮',zh:'牛',zhuyin:'ㄋㄧㄡˊ',en:'Cow',kk:'[kaʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">牛</text></svg>`},
  {id:'giraffe9',lv:9,cat:'land',emoji:'🦒',zh:'長頸鹿',zhuyin:'ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ',en:'Giraffe',kk:'[dʒəˈræf]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">長頸鹿</text></svg>`},
  {id:'turtle9',lv:9,cat:'sea',emoji:'🐢',zh:'海龜',zhuyin:'ㄏㄞˇ ㄍㄨㄟ',en:'Sea turtle',kk:'[ˈsiː ˌtɝtəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海龜</text></svg>`},
  {id:'tiger10',lv:10,cat:'land',emoji:'🐯',zh:'老虎',zhuyin:'ㄌㄠˇ ㄏㄨˇ',en:'Tiger',kk:'[ˈtaɪɡɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">老虎</text></svg>`},
  {id:'ladybug10',lv:10,cat:'insect',emoji:'🐞',zh:'瓢蟲',zhuyin:'ㄆㄧㄠˊ ㄔㄨㄥˊ',en:'Ladybug',kk:'[ˈleɪdiˌbʌɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">瓢蟲</text></svg>`},
  {id:'farm10',lv:10,cat:'nature',emoji:'🚜',zh:'農場',zhuyin:'ㄋㄨㄥˊ ㄔㄤˇ',en:'Farm',kk:'[fɑrm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">農場</text></svg>`},
  {id:'banana1',lv:1,cat:'food',emoji:'🍌',zh:'香蕉',zhuyin:'ㄒㄧㄤ ㄐㄧㄠ',en:'Banana',kk:'[bəˈnænə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">香蕉</text></svg>`},
  {id:'orange1',lv:1,cat:'food',emoji:'🍊',zh:'橘子',zhuyin:'ㄐㄩˊ ㄗ˙',en:'Orange',kk:'[ˈɔrɪndʒ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">橘子</text></svg>`},
  {id:'strawberry2',lv:2,cat:'food',emoji:'🍓',zh:'草莓',zhuyin:'ㄘㄠˇ ㄇㄟˊ',en:'Strawberry',kk:'[ˈstrɔˌbɛri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">草莓</text></svg>`},
  {id:'book2',lv:2,cat:'daily',emoji:'📖',zh:'書',zhuyin:'ㄕㄨ',en:'Book',kk:'[bʊk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">書</text></svg>`},
  {id:'umbrella2',lv:2,cat:'daily',emoji:'☂️',zh:'雨傘',zhuyin:'ㄩˇ ㄙㄢˇ',en:'Umbrella',kk:'[ʌmˈbrɛlə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雨傘</text></svg>`},
  {id:'grape3',lv:3,cat:'food',emoji:'🍇',zh:'葡萄',zhuyin:'ㄆㄨˊ ㄊㄠˊ',en:'Grape',kk:'[grep]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">葡萄</text></svg>`},
  {id:'watermelon3',lv:3,cat:'food',emoji:'🍉',zh:'西瓜',zhuyin:'ㄒㄧ ㄍㄨㄚ',en:'Watermelon',kk:'[ˈwɔtɚˌmɛlən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">西瓜</text></svg>`},
  {id:'bee4',lv:4,cat:'insect',emoji:'🐝',zh:'蜜蜂',zhuyin:'ㄇㄧˋ ㄈㄥ',en:'Bee',kk:'[bi]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蜜蜂</text></svg>`},
  {id:'dragonfly5',lv:5,cat:'insect',emoji:'🪽',zh:'蜻蜓',zhuyin:'ㄑㄧㄥ ㄊㄧㄥ',en:'Dragonfly',kk:'[ˈdrægənˌflaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蜻蜓</text></svg>`},
  {id:'boat6',lv:6,cat:'vehicle',emoji:'⛵',zh:'船',zhuyin:'ㄔㄨㄢˊ',en:'Boat',kk:'[bot]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">船</text></svg>`},
  {id:'sun1',lv:1,cat:'nature',emoji:'☀️',zh:'太陽',zhuyin:'ㄊㄞˋ ㄧㄤˊ',en:'Sun',kk:'[sʌn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">太陽</text></svg>`},
  {id:'star1',lv:1,cat:'nature',emoji:'⭐',zh:'星星',zhuyin:'ㄒㄧㄥ ㄒㄧㄥ',en:'Star',kk:'[stɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">星星</text></svg>`},
  {id:'cloud1',lv:1,cat:'nature',emoji:'☁️',zh:'雲',zhuyin:'ㄩㄣˊ',en:'Cloud',kk:'[klaʊd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雲</text></svg>`},
  {id:'moon2',lv:2,cat:'nature',emoji:'🌙',zh:'月亮',zhuyin:'ㄩㄝˋ ㄌㄧㄤˋ',en:'Moon',kk:'[mun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">月亮</text></svg>`},
  {id:'flower3',lv:3,cat:'nature',emoji:'🌼',zh:'花',zhuyin:'ㄏㄨㄚ',en:'Flower',kk:'[ˈflaʊɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">花</text></svg>`},
  {id:'tree4',lv:4,cat:'nature',emoji:'🌳',zh:'樹',zhuyin:'ㄕㄨˋ',en:'Tree',kk:'[tri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">樹</text></svg>`},
  {id:'rainbow4',lv:4,cat:'nature',emoji:'🌈',zh:'彩虹',zhuyin:'ㄘㄞˇ ㄏㄨㄥˊ',en:'Rainbow',kk:'[ˈrenˌbo]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">彩虹</text></svg>`},
  {id:'policecar7',lv:7,cat:'vehicle',emoji:'🚓',zh:'警車',zhuyin:'ㄐㄧㄥˇ ㄔㄜ',en:'Police car',kk:'[pəˈlis kɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">警車</text></svg>`},
  {id:'ambulance7',lv:7,cat:'vehicle',emoji:'🚑',zh:'救護車',zhuyin:'ㄐㄧㄡˋ ㄏㄨˋ ㄔㄜ',en:'Ambulance',kk:'[ˈæmbjələns]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">救護車</text></svg>`},
  {id:'excavator8',lv:8,cat:'vehicle',emoji:'🚜',zh:'工程車',zhuyin:'ㄍㄨㄥ ㄔㄥˊ ㄔㄜ',en:'Excavator',kk:'[ˈɛkskəˌvetɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">工程車</text></svg>`},
  {id:'scooter5',lv:5,cat:'vehicle',emoji:'🛵',zh:'機車',zhuyin:'ㄐㄧ ㄔㄜ',en:'Scooter',kk:'[ˈskutɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">機車</text></svg>`},
  {id:'truck6',lv:6,cat:'vehicle',emoji:'🚚',zh:'卡車',zhuyin:'ㄎㄚˇ ㄔㄜ',en:'Truck',kk:'[trʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">卡車</text></svg>`},
  {id:'leaf2',lv:2,cat:'nature',emoji:'🍃',zh:'葉子',zhuyin:'ㄧㄝˋ ㄗ˙',en:'Leaf',kk:'[lif]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">葉子</text></svg>`},
  {id:'mountain6',lv:6,cat:'nature',emoji:'⛰️',zh:'山',zhuyin:'ㄕㄢ',en:'Mountain',kk:'[ˈmaʊntən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">山</text></svg>`},
  {id:'bear5',lv:5,cat:'land',emoji:'🐻',zh:'熊',zhuyin:'ㄒㄩㄥˊ',en:'Bear',kk:'[bɛr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熊</text></svg>`},
  {id:'horse6',lv:6,cat:'land',emoji:'🐴',zh:'馬',zhuyin:'ㄇㄚˇ',en:'Horse',kk:'[hɔrs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">馬</text></svg>`},
  {id:'octopus7',lv:7,cat:'sea',emoji:'🐙',zh:'章魚',zhuyin:'ㄓㄤ ㄩˊ',en:'Octopus',kk:'[ˈɑktəpəs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">章魚</text></svg>`},
  {id:'shark7',lv:7,cat:'sea',emoji:'🦈',zh:'鯊魚',zhuyin:'ㄕㄚ ㄩˊ',en:'Shark',kk:'[ʃɑrk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鯊魚</text></svg>`},
  {id:'pear2',lv:2,cat:'food',emoji:'🍐',zh:'梨子',zhuyin:'ㄌㄧˊ ㄗ˙',en:'Pear',kk:'[pɛr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">梨子</text></svg>`},
  {id:'pineapple4',lv:4,cat:'food',emoji:'🍍',zh:'鳳梨',zhuyin:'ㄈㄥˋ ㄌㄧˊ',en:'Pineapple',kk:'[ˈpaɪnˌæpəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鳳梨</text></svg>`},
  {id:'pencil4',lv:4,cat:'daily',emoji:'✏️',zh:'鉛筆',zhuyin:'ㄑㄧㄢ ㄅㄧˇ',en:'Pencil',kk:'[ˈpɛnsəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鉛筆</text></svg>`},
  {id:'clock4',lv:4,cat:'daily',emoji:'⏰',zh:'時鐘',zhuyin:'ㄕˊ ㄓㄨㄥ',en:'Clock',kk:'[klɑk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">時鐘</text></svg>`},
  {id:'owl5',lv:5,cat:'air',emoji:'🦉',zh:'貓頭鷹',zhuyin:'ㄇㄠ ㄊㄡˊ ㄧㄥ',en:'Owl',kk:'[aʊl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">貓頭鷹</text></svg>`},
  {id:'parrot6',lv:6,cat:'air',emoji:'🦜',zh:'鸚鵡',zhuyin:'ㄧㄥ ㄨˇ',en:'Parrot',kk:'[ˈpærət]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鸚鵡</text></svg>`},
  {id:'ant4',lv:4,cat:'insect',emoji:'🐜',zh:'螞蟻',zhuyin:'ㄇㄚˇ ㄧˇ',en:'Ant',kk:'[ænt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">螞蟻</text></svg>`},
  {id:'caterpillar5',lv:5,cat:'insect',emoji:'🐛',zh:'毛毛蟲',zhuyin:'ㄇㄠˊ ㄇㄠˊ ㄔㄨㄥˊ',en:'Caterpillar',kk:'[ˈkætərˌpɪlər]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">毛毛蟲</text></svg>`},
  {id:'mango2',lv:2,cat:'food',emoji:'🥭',zh:'芒果',zhuyin:'ㄇㄤˊ ㄍㄨㄛˇ',en:'Mango',kk:'[ˈmæŋɡoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">芒果</text></svg>`},
  {id:'carrot3',lv:3,cat:'food',emoji:'🥕',zh:'紅蘿蔔',zhuyin:'ㄏㄨㄥˊ ㄌㄨㄛˊ ㄅㄛ˙',en:'Carrot',kk:'[ˈkærət]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">紅蘿蔔</text></svg>`},
  {id:'toothbrush5',lv:5,cat:'daily',emoji:'🪥',zh:'牙刷',zhuyin:'ㄧㄚˊ ㄕㄨㄚ',en:'Toothbrush',kk:'[ˈtuθˌbrʌʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">牙刷</text></svg>`},
  {id:'lamp5',lv:5,cat:'daily',emoji:'💡',zh:'檯燈',zhuyin:'ㄊㄞˊ ㄉㄥ',en:'Lamp',kk:'[læmp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">檯燈</text></svg>`},
  {id:'sheep5',lv:5,cat:'land',emoji:'🐑',zh:'綿羊',zhuyin:'ㄇㄧㄢˊ ㄧㄤˊ',en:'Sheep',kk:'[ʃip]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">綿羊</text></svg>`},
  {id:'fox6',lv:6,cat:'land',emoji:'🦊',zh:'狐狸',zhuyin:'ㄏㄨˊ ㄌㄧˊ',en:'Fox',kk:'[fɑks]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">狐狸</text></svg>`},
  {id:'jellyfish6',lv:6,cat:'sea',emoji:'🪼',zh:'水母',zhuyin:'ㄕㄨㄟˇ ㄇㄨˇ',en:'Jellyfish',kk:'[ˈdʒɛliˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">水母</text></svg>`},
  {id:'starfish4',lv:4,cat:'sea',emoji:'⭐',zh:'海星',zhuyin:'ㄏㄞˇ ㄒㄧㄥ',en:'Starfish',kk:'[ˈstɑrˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海星</text></svg>`},
  {id:'duck3',lv:3,cat:'air',emoji:'🦆',zh:'鴨子',zhuyin:'ㄧㄚ ㄗ˙',en:'Duck',kk:'[dʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鴨子</text></svg>`},
  {id:'eagle7',lv:7,cat:'air',emoji:'🦅',zh:'老鷹',zhuyin:'ㄌㄠˇ ㄧㄥ',en:'Eagle',kk:'[ˈiɡəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">老鷹</text></svg>`},
  {id:'beetle6',lv:6,cat:'insect',emoji:'🪲',zh:'甲蟲',zhuyin:'ㄐㄧㄚˇ ㄔㄨㄥˊ',en:'Beetle',kk:'[ˈbitəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">甲蟲</text></svg>`},
  {id:'grasshopper6',lv:6,cat:'insect',emoji:'🦗',zh:'蚱蜢',zhuyin:'ㄓㄚˋ ㄇㄥˇ',en:'Grasshopper',kk:'[ˈɡræsˌhɑpɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蚱蜢</text></svg>`},
  {id:'taxi5',lv:5,cat:'vehicle',emoji:'🚕',zh:'計程車',zhuyin:'ㄐㄧˋ ㄔㄥˊ ㄔㄜ',en:'Taxi',kk:'[ˈtæksi]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">計程車</text></svg>`},
  {id:'helicopter7',lv:7,cat:'vehicle',emoji:'🚁',zh:'直升機',zhuyin:'ㄓˊ ㄕㄥ ㄐㄧ',en:'Helicopter',kk:'[ˈhɛləˌkɑptɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">直升機</text></svg>`},
  {id:'mushroom4',lv:4,cat:'nature',emoji:'🍄',zh:'香菇',zhuyin:'ㄒㄧㄤ ㄍㄨ',en:'Mushroom',kk:'[ˈmʌʃˌrum]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">香菇</text></svg>`},
  {id:'snowflake5',lv:5,cat:'nature',emoji:'❄️',zh:'雪花',zhuyin:'ㄒㄩㄝˇ ㄏㄨㄚ',en:'Snowflake',kk:'[ˈsnoʊˌfleɪk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雪花</text></svg>`},
  {id:'panda6',lv:6,cat:'land',emoji:'🐼',zh:'熊貓',zhuyin:'ㄒㄩㄥˊ ㄇㄠ',en:'Panda',kk:'[ˈpændə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熊貓</text></svg>`},
  {id:'deer7',lv:7,cat:'land',emoji:'🦌',zh:'小鹿',zhuyin:'ㄒㄧㄠˇ ㄌㄨˋ',en:'Deer',kk:'[dɪr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小鹿</text></svg>`},
  {id:'seahorse5',lv:5,cat:'sea',emoji:'🪸',zh:'海馬',zhuyin:'ㄏㄞˇ ㄇㄚˇ',en:'Seahorse',kk:'[ˈsiˌhɔrs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海馬</text></svg>`},
  {id:'seal6',lv:6,cat:'sea',emoji:'🦭',zh:'海豹',zhuyin:'ㄏㄞˇ ㄅㄠˋ',en:'Seal',kk:'[sil]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海豹</text></svg>`},
  {id:'swan5',lv:5,cat:'air',emoji:'🦢',zh:'天鵝',zhuyin:'ㄊㄧㄢ ㄜˊ',en:'Swan',kk:'[swɑn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">天鵝</text></svg>`},
  {id:'peacock7',lv:7,cat:'air',emoji:'🦚',zh:'孔雀',zhuyin:'ㄎㄨㄥˇ ㄑㄩㄝˋ',en:'Peacock',kk:'[ˈpiˌkɑk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">孔雀</text></svg>`},
  {id:'spider6',lv:6,cat:'insect',emoji:'🕷️',zh:'蜘蛛',zhuyin:'ㄓ ㄓㄨ',en:'Spider',kk:'[ˈspaɪdɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蜘蛛</text></svg>`},
  {id:'firefly5',lv:5,cat:'insect',emoji:'✨',zh:'螢火蟲',zhuyin:'ㄧㄥˊ ㄏㄨㄛˇ ㄔㄨㄥˊ',en:'Firefly',kk:'[ˈfaɪrˌflaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">螢火蟲</text></svg>`},
  {id:'cherry3',lv:3,cat:'food',emoji:'🍒',zh:'櫻桃',zhuyin:'ㄧㄥ ㄊㄠˊ',en:'Cherry',kk:'[ˈtʃɛri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">櫻桃</text></svg>`},
  {id:'corn4',lv:4,cat:'food',emoji:'🌽',zh:'玉米',zhuyin:'ㄩˋ ㄇㄧˇ',en:'Corn',kk:'[kɔrn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">玉米</text></svg>`},
  {id:'soap4',lv:4,cat:'daily',emoji:'🧼',zh:'肥皂',zhuyin:'ㄈㄟˊ ㄗㄠˋ',en:'Soap',kk:'[soʊp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">肥皂</text></svg>`},
  {id:'chair5',lv:5,cat:'daily',emoji:'🪑',zh:'椅子',zhuyin:'ㄧˇ ㄗ˙',en:'Chair',kk:'[tʃɛr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">椅子</text></svg>`},
  {id:'van6',lv:6,cat:'vehicle',emoji:'🚐',zh:'小巴士',zhuyin:'ㄒㄧㄠˇ ㄅㄚ ㄕˋ',en:'Van',kk:'[væn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小巴士</text></svg>`},
  {id:'rocket7',lv:7,cat:'vehicle',emoji:'🚀',zh:'火箭',zhuyin:'ㄏㄨㄛˇ ㄐㄧㄢˋ',en:'Rocket',kk:'[ˈrɑkɪt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">火箭</text></svg>`},
  {id:'cactus5',lv:5,cat:'nature',emoji:'🌵',zh:'仙人掌',zhuyin:'ㄒㄧㄢ ㄖㄣˊ ㄓㄤˇ',en:'Cactus',kk:'[ˈkæktəs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">仙人掌</text></svg>`},
  {id:'raindrop2',lv:2,cat:'nature',emoji:'💧',zh:'雨滴',zhuyin:'ㄩˇ ㄉㄧ',en:'Raindrop',kk:'[ˈreɪnˌdrɑp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雨滴</text></svg>`},
  {id:'koala6',lv:6,cat:'land',emoji:'🐨',zh:'無尾熊',zhuyin:'ㄨˊ ㄨㄟˇ ㄒㄩㄥˊ',en:'Koala',kk:'[koʊˈɑlə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">無尾熊</text></svg>`},
  {id:'acorn3',lv:3,cat:'nature',emoji:'🌰',zh:'橡實',zhuyin:'ㄒㄧㄤˋ ㄕˊ',en:'Acorn',kk:'[ˈeɪˌkɔrn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">橡實</text></svg>`},
  {id:'cookie4',lv:4,cat:'food',emoji:'🍪',zh:'餅乾',zhuyin:'ㄅㄧㄥˇ ㄍㄢ',en:'Cookie',kk:'[ˈkʊki]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">餅乾</text></svg>`},
  {id:'tractor6',lv:6,cat:'vehicle',emoji:'🚜',zh:'拖拉機',zhuyin:'ㄊㄨㄛ ㄌㄚ ㄐㄧ',en:'Tractor',kk:'[ˈtræktɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">拖拉機</text></svg>`},
  {id:'kangaroo6',lv:6,cat:'land',emoji:'🦘',zh:'袋鼠',zhuyin:'ㄉㄞˋ ㄕㄨˇ',en:'Kangaroo',kk:'[ˌkæŋɡəˈru]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">袋鼠</text></svg>`},
  {id:'lobster6',lv:6,cat:'sea',emoji:'🦞',zh:'龍蝦',zhuyin:'ㄌㄨㄥˊ ㄒㄧㄚ',en:'Lobster',kk:'[ˈlɑbstɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">龍蝦</text></svg>`},
  {id:'squid6',lv:6,cat:'sea',emoji:'🦑',zh:'魷魚',zhuyin:'ㄧㄡˊ ㄩˊ',en:'Squid',kk:'[skwɪd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">魷魚</text></svg>`},
  {id:'shell4',lv:4,cat:'sea',emoji:'🐚',zh:'貝殼',zhuyin:'ㄅㄟˋ ㄎㄜˊ',en:'Shell',kk:'[ʃɛl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">貝殼</text></svg>`},
  {id:'flamingo6',lv:6,cat:'air',emoji:'🦩',zh:'紅鶴',zhuyin:'ㄏㄨㄥˊ ㄏㄜˋ',en:'Flamingo',kk:'[fləˈmɪŋɡoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">紅鶴</text></svg>`},
  {id:'dove4',lv:4,cat:'air',emoji:'🕊️',zh:'鴿子',zhuyin:'ㄍㄜ ㄗ˙',en:'Dove',kk:'[dʌv]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鴿子</text></svg>`},
  {id:'bat5',lv:5,cat:'air',emoji:'🦇',zh:'蝙蝠',zhuyin:'ㄅㄧㄢ ㄈㄨˊ',en:'Bat',kk:'[bæt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蝙蝠</text></svg>`},
  {id:'crow5',lv:5,cat:'air',emoji:'🐦‍⬛',zh:'烏鴉',zhuyin:'ㄨ ㄧㄚ',en:'Crow',kk:'[kroʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">烏鴉</text></svg>`},
  {id:'mosquito5',lv:5,cat:'insect',emoji:'🦟',zh:'蚊子',zhuyin:'ㄨㄣˊ ㄗ˙',en:'Mosquito',kk:'[məˈskitoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蚊子</text></svg>`},
  {id:'fly4',lv:4,cat:'insect',emoji:'🪰',zh:'蒼蠅',zhuyin:'ㄘㄤ ㄧㄥˊ',en:'Fly',kk:'[flaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蒼蠅</text></svg>`},
  {id:'cockroach6',lv:6,cat:'insect',emoji:'🪳',zh:'蟑螂',zhuyin:'ㄓㄤ ㄌㄤˊ',en:'Cockroach',kk:'[ˈkɑkˌroʊtʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蟑螂</text></svg>`},
  {id:'worm4',lv:4,cat:'insect',emoji:'🪱',zh:'蚯蚓',zhuyin:'ㄑㄧㄡ ㄧㄣˇ',en:'Worm',kk:'[wɝm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蚯蚓</text></svg>`},
  {id:'tomato3',lv:3,cat:'food',emoji:'🍅',zh:'番茄',zhuyin:'ㄈㄢ ㄑㄧㄝˊ',en:'Tomato',kk:'[təˈmeɪtoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">番茄</text></svg>`},
  {id:'pumpkin4',lv:4,cat:'food',emoji:'🎃',zh:'南瓜',zhuyin:'ㄋㄢˊ ㄍㄨㄚ',en:'Pumpkin',kk:'[ˈpʌmpkɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">南瓜</text></svg>`},
  {id:'spoon3',lv:3,cat:'daily',emoji:'🥄',zh:'湯匙',zhuyin:'ㄊㄤ ㄔˊ',en:'Spoon',kk:'[spun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">湯匙</text></svg>`},
  {id:'sneaker5',lv:5,cat:'daily',emoji:'👟',zh:'球鞋',zhuyin:'ㄑㄧㄡˊ ㄒㄧㄝˊ',en:'Sneaker',kk:'[ˈsnikɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">球鞋</text></svg>`},
  {id:'volcano7',lv:7,cat:'nature',emoji:'🌋',zh:'火山',zhuyin:'ㄏㄨㄛˇ ㄕㄢ',en:'Volcano',kk:'[vɑlˈkeɪnoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">火山</text></svg>`},
  {id:'ship6',lv:6,cat:'vehicle',emoji:'🚢',zh:'輪船',zhuyin:'ㄌㄨㄣˊ ㄔㄨㄢˊ',en:'Ship',kk:'[ʃɪp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">輪船</text></svg>`},
  {id:'zebra5',lv:5,cat:'land',emoji:'🦓',zh:'斑馬',zhuyin:'ㄅㄢ ㄇㄚˇ',en:'Zebra',kk:'[ˈzibrə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦓</text></svg>`},
  {id:'squirrel5',lv:5,cat:'land',emoji:'🐿️',zh:'松鼠',zhuyin:'ㄙㄨㄥ ㄕㄨˇ',en:'Squirrel',kk:'[ˈskwɝəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐿️</text></svg>`},
  {id:'pufferfish5',lv:5,cat:'sea',emoji:'🐡',zh:'河豚',zhuyin:'ㄏㄜˊ ㄊㄨㄣˊ',en:'Pufferfish',kk:'[ˈpʌfɚˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐡</text></svg>`},
  {id:'shrimp4',lv:4,cat:'sea',emoji:'🦐',zh:'蝦子',zhuyin:'ㄒㄧㄚ ㄗ˙',en:'Shrimp',kk:'[ʃrɪmp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦐</text></svg>`},
  {id:'penguin4',lv:4,cat:'air',emoji:'🐧',zh:'企鵝',zhuyin:'ㄑㄧˋ ㄜˊ',en:'Penguin',kk:'[ˈpɛŋɡwɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐧</text></svg>`},
  {id:'seagull5',lv:5,cat:'air',emoji:'🕊️',zh:'海鷗',zhuyin:'ㄏㄞˇ ㄡ',en:'Seagull',kk:'[ˈsiˌɡʌl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🕊️</text></svg>`},
  {id:'snail4',lv:4,cat:'insect',emoji:'🐌',zh:'蝸牛',zhuyin:'ㄍㄨㄚ ㄋㄧㄡˊ',en:'Snail',kk:'[sneɪl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐌</text></svg>`},
  {id:'scorpion6',lv:6,cat:'insect',emoji:'🦂',zh:'蠍子',zhuyin:'ㄒㄧㄝ ㄗ˙',en:'Scorpion',kk:'[ˈskɔrpiən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦂</text></svg>`},
  {id:'lemon2',lv:2,cat:'food',emoji:'🍋',zh:'檸檬',zhuyin:'ㄋㄧㄥˊ ㄇㄥˊ',en:'Lemon',kk:'[ˈlɛmən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🍋</text></svg>`},
  {id:'donut4',lv:4,cat:'food',emoji:'🍩',zh:'甜甜圈',zhuyin:'ㄊㄧㄢˊ ㄊㄧㄢˊ ㄑㄩㄢ',en:'Donut',kk:'[ˈdoʊˌnʌt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🍩</text></svg>`},
  {id:'scissors4',lv:4,cat:'daily',emoji:'✂️',zh:'剪刀',zhuyin:'ㄐㄧㄢˇ ㄉㄠ',en:'Scissors',kk:'[ˈsɪzɚz]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">✂️</text></svg>`},
  {id:'cap3',lv:3,cat:'daily',emoji:'🧢',zh:'帽子',zhuyin:'ㄇㄠˋ ㄗ˙',en:'Cap',kk:'[kæp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🧢</text></svg>`},
  {id:'speedboat6',lv:6,cat:'vehicle',emoji:'🚤',zh:'快艇',zhuyin:'ㄎㄨㄞˋ ㄊㄧㄥˇ',en:'Speedboat',kk:'[ˈspidˌboʊt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🚤</text></svg>`},
  {id:'cablecar6',lv:6,cat:'vehicle',emoji:'🚠',zh:'纜車',zhuyin:'ㄌㄢˇ ㄔㄜ',en:'Cable car',kk:'[ˈkeɪbəl kɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🚠</text></svg>`},
  {id:'mapleleaf3',lv:3,cat:'nature',emoji:'🍁',zh:'楓葉',zhuyin:'ㄈㄥ ㄧㄝˋ',en:'Maple leaf',kk:'[ˈmeɪpəl lif]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🍁</text></svg>`},
  {id:'pinetree4',lv:4,cat:'nature',emoji:'🌲',zh:'松樹',zhuyin:'ㄙㄨㄥ ㄕㄨˋ',en:'Pine tree',kk:'[paɪn tri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🌲</text></svg>`},
  {id:'raccoon5',lv:5,cat:'land',emoji:'🦝',zh:'浣熊',zhuyin:'ㄏㄨㄢˋ ㄒㄩㄥˊ',en:'Raccoon',kk:'[ræˈkun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦝</text></svg>`},
  {id:'hedgehog5',lv:5,cat:'land',emoji:'🦔',zh:'刺蝟',zhuyin:'ㄘˋ ㄨㄟˋ',en:'Hedgehog',kk:'[ˈhɛdʒˌhɑɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦔</text></svg>`},
  {id:'seaurchin5',lv:5,cat:'sea',emoji:'🦔',zh:'海膽',zhuyin:'ㄏㄞˇ ㄉㄢˇ',en:'Sea urchin',kk:'[ˈsiː ˌɝtʃɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦔</text></svg>`},
  {id:'coralfish5',lv:5,cat:'sea',emoji:'🐠',zh:'珊瑚魚',zhuyin:'ㄕㄢ ㄏㄨˊ ㄩˊ',en:'Coral fish',kk:'[ˈkɔrəl fɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐠</text></svg>`},
  {id:'hummingbird6',lv:6,cat:'air',emoji:'🐦',zh:'蜂鳥',zhuyin:'ㄈㄥ ㄋㄧㄠˇ',en:'Hummingbird',kk:'[ˈhʌmɪŋˌbɝd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐦</text></svg>`},
  {id:'woodpecker6',lv:6,cat:'air',emoji:'🐦',zh:'啄木鳥',zhuyin:'ㄓㄨㄛˊ ㄇㄨˋ ㄋㄧㄠˇ',en:'Woodpecker',kk:'[ˈwʊdˌpɛkɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐦</text></svg>`},
  {id:'mantis5',lv:5,cat:'insect',emoji:'🦗',zh:'螳螂',zhuyin:'ㄊㄤˊ ㄌㄤˊ',en:'Mantis',kk:'[ˈmæntɪs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦗</text></svg>`},
  {id:'centipede6',lv:6,cat:'insect',emoji:'🐛',zh:'蜈蚣',zhuyin:'ㄨˊ ㄍㄨㄥ',en:'Centipede',kk:'[ˈsɛntəˌpid]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐛</text></svg>`},
  {id:'avocado3',lv:3,cat:'food',emoji:'🥑',zh:'酪梨',zhuyin:'ㄌㄨㄛˋ ㄌㄧˊ',en:'Avocado',kk:'[ˌævəˈkɑdoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🥑</text></svg>`},
  {id:'cupcake4',lv:4,cat:'food',emoji:'🧁',zh:'杯子蛋糕',zhuyin:'ㄅㄟ ㄗ˙ ㄉㄢˋ ㄍㄠ',en:'Cupcake',kk:'[ˈkʌpˌkeɪk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🧁</text></svg>`},
  {id:'toothpaste4',lv:4,cat:'daily',emoji:'🪥',zh:'牙膏',zhuyin:'ㄧㄚˊ ㄍㄠ',en:'Toothpaste',kk:'[ˈtuθˌpeɪst]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🪥</text></svg>`},
  {id:'comb3',lv:3,cat:'daily',emoji:'🪮',zh:'梳子',zhuyin:'ㄕㄨ ㄗ˙',en:'Comb',kk:'[koʊm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🪮</text></svg>`},
  {id:'garbagetruck7',lv:7,cat:'vehicle',emoji:'🚛',zh:'垃圾車',zhuyin:'ㄌㄜˋ ㄙㄜˋ ㄔㄜ',en:'Garbage truck',kk:'[ˈɡɑrbɪdʒ trʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🚛</text></svg>`},
  {id:'sailboat6',lv:6,cat:'vehicle',emoji:'⛵',zh:'帆船',zhuyin:'ㄈㄢˊ ㄔㄨㄢˊ',en:'Sailboat',kk:'[ˈseɪlˌboʊt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">⛵</text></svg>`},
  {id:'pinecone4',lv:4,cat:'nature',emoji:'🌰',zh:'松果',zhuyin:'ㄙㄨㄥ ㄍㄨㄛˇ',en:'Pinecone',kk:'[ˈpaɪnˌkoʊn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🌰</text></svg>`},
  {id:'waterfall5',lv:5,cat:'nature',emoji:'💧',zh:'瀑布',zhuyin:'ㄆㄨˋ ㄅㄨˋ',en:'Waterfall',kk:'[ˈwɔtɚˌfɔl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">💧</text></svg>`},
  {id:'camel6',lv:6,cat:'land',emoji:'🐫',zh:'駱駝',zhuyin:'ㄌㄨㄛˋ ㄊㄨㄛ˙',en:'Camel',kk:'[ˈkæməl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">駱駝</text></svg>`},
  {id:'hippo6',lv:6,cat:'land',emoji:'🦛',zh:'河馬',zhuyin:'ㄏㄜˊ ㄇㄚˇ',en:'Hippo',kk:'[ˈhɪpoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">河馬</text></svg>`},
  {id:'mantaray6',lv:6,cat:'sea',emoji:'🐟',zh:'魟魚',zhuyin:'ㄏㄨㄥ ㄩˊ',en:'Manta ray',kk:'[ˈmæntə reɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">魟魚</text></svg>`},
  {id:'narwhal6',lv:6,cat:'sea',emoji:'🐳',zh:'獨角鯨',zhuyin:'ㄉㄨˊ ㄐㄧㄠˇ ㄐㄧㄥ',en:'Narwhal',kk:'[ˈnɑrwəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">獨角鯨</text></svg>`},
  {id:'pelican6',lv:6,cat:'air',emoji:'🐦',zh:'鵜鶘',zhuyin:'ㄊㄧˊ ㄏㄨˊ',en:'Pelican',kk:'[ˈpɛlɪkən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鵜鶘</text></svg>`},
  {id:'sparrow4',lv:4,cat:'air',emoji:'🐦',zh:'麻雀',zhuyin:'ㄇㄚˊ ㄑㄩㄝˋ',en:'Sparrow',kk:'[ˈspæroʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">麻雀</text></svg>`},
  {id:'scarab6',lv:6,cat:'insect',emoji:'🪲',zh:'金龜子',zhuyin:'ㄐㄧㄣ ㄍㄨㄟ ㄗ˙',en:'Scarab',kk:'[ˈskærəb]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">金龜子</text></svg>`},
  {id:'longhornbeetle6',lv:6,cat:'insect',emoji:'🪲',zh:'天牛',zhuyin:'ㄊㄧㄢ ㄋㄧㄡˊ',en:'Longhorn beetle',kk:'[ˈlɔŋˌhɔrn ˈbitəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">天牛</text></svg>`},
  {id:'pizza4',lv:4,cat:'food',emoji:'🍕',zh:'披薩',zhuyin:'ㄆㄧ ㄙㄚˋ',en:'Pizza',kk:'[ˈpitsə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">披薩</text></svg>`},
  {id:'hotdog4',lv:4,cat:'food',emoji:'🌭',zh:'熱狗',zhuyin:'ㄖㄜˋ ㄍㄡˇ',en:'Hot dog',kk:'[ˈhɑtˌdɔɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熱狗</text></svg>`},
  {id:'teapot4',lv:4,cat:'daily',emoji:'🫖',zh:'茶壺',zhuyin:'ㄔㄚˊ ㄏㄨˊ',en:'Teapot',kk:'[ˈtiˌpɑt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">茶壺</text></svg>`},
  {id:'fork3',lv:3,cat:'daily',emoji:'🍴',zh:'叉子',zhuyin:'ㄔㄚ ㄗ˙',en:'Fork',kk:'[fɔrk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">叉子</text></svg>`},
  {id:'tram7',lv:7,cat:'vehicle',emoji:'🚋',zh:'電車',zhuyin:'ㄉㄧㄢˋ ㄔㄜ',en:'Tram',kk:'[træm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">電車</text></svg>`},
  {id:'hotairballoon7',lv:7,cat:'vehicle',emoji:'🎈',zh:'熱氣球',zhuyin:'ㄖㄜˋ ㄑㄧˋ ㄑㄧㄡˊ',en:'Hot-air balloon',kk:'[ˌhɑt ˈɛr bəˌlun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熱氣球</text></svg>`},
  {id:'rock4',lv:4,cat:'nature',emoji:'🪨',zh:'岩石',zhuyin:'ㄧㄢˊ ㄕˊ',en:'Rock',kk:'[rɑk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">岩石</text></svg>`},
  {id:'cave5',lv:5,cat:'nature',emoji:'🪨',zh:'洞穴',zhuyin:'ㄉㄨㄥˋ ㄒㄩㄝˋ',en:'Cave',kk:'[kev]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">洞穴</text></svg>`},
  {id:'sloth6',lv:6,cat:'land',emoji:'🦥',zh:'樹懶',zhuyin:'ㄕㄨˋ ㄌㄢˇ',en:'Sloth',kk:'[sloʊθ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">樹懶</text></svg>`},
  {id:'gorilla7',lv:7,cat:'land',emoji:'🦍',zh:'大猩猩',zhuyin:'ㄉㄚˋ ㄒㄧㄥ ㄒㄧㄥ',en:'Gorilla',kk:'[ɡəˈrɪlə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">大猩猩</text></svg>`},
  {id:'pearloyster5',lv:5,cat:'sea',emoji:'🦪',zh:'珍珠貝',zhuyin:'ㄓㄣ ㄓㄨ ㄅㄟˋ',en:'Pearl oyster',kk:'[ˈpɝl ˌɔɪstɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">珍珠貝</text></svg>`},
  {id:'clownfish5',lv:5,cat:'sea',emoji:'🐠',zh:'小丑魚',zhuyin:'ㄒㄧㄠˇ ㄔㄡˇ ㄩˊ',en:'Clownfish',kk:'[ˈklaʊnˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小丑魚</text></svg>`},
  {id:'toucan6',lv:6,cat:'air',emoji:'🐦',zh:'巨嘴鳥',zhuyin:'ㄐㄩˋ ㄗㄨㄟˇ ㄋㄧㄠˇ',en:'Toucan',kk:'[ˈtuːkæn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">巨嘴鳥</text></svg>`},
  {id:'goose5',lv:5,cat:'air',emoji:'🪿',zh:'白鵝',zhuyin:'ㄅㄞˊ ㄜˊ',en:'Goose',kk:'[ɡuːs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">白鵝</text></svg>`},
  {id:'cicada6',lv:6,cat:'insect',emoji:'🦗',zh:'蟬',zhuyin:'ㄔㄢˊ',en:'Cicada',kk:'[sɪˈkeɪdə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蟬</text></svg>`},
  {id:'rhinobeetle6',lv:6,cat:'insect',emoji:'🪲',zh:'獨角仙',zhuyin:'ㄉㄨˊ ㄐㄧㄠˇ ㄒㄧㄢ',en:'Rhinoceros beetle',kk:'[raɪˈnɑsərəs ˈbitəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">獨角仙</text></svg>`},
  {id:'croissant3',lv:3,cat:'food',emoji:'🥐',zh:'可頌',zhuyin:'ㄎㄜˇ ㄙㄨㄥˋ',en:'Croissant',kk:'[krəˈsɑnt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">可頌</text></svg>`},
  {id:'sandwich4',lv:4,cat:'food',emoji:'🥪',zh:'三明治',zhuyin:'ㄙㄢ ㄇㄧㄥˊ ㄓˋ',en:'Sandwich',kk:'[ˈsænwɪtʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">三明治</text></svg>`},
  {id:'bowl3',lv:3,cat:'daily',emoji:'🥣',zh:'碗',zhuyin:'ㄨㄢˇ',en:'Bowl',kk:'[boʊl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">碗</text></svg>`},
  {id:'fryingpan5',lv:5,cat:'daily',emoji:'🍳',zh:'平底鍋',zhuyin:'ㄆㄧㄥˊ ㄉㄧˇ ㄍㄨㄛ',en:'Frying pan',kk:'[ˈfraɪɪŋ pæn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">平底鍋</text></svg>`},
  {id:'cementmixer7',lv:7,cat:'vehicle',emoji:'🚚',zh:'水泥車',zhuyin:'ㄕㄨㄟˇ ㄋㄧˊ ㄔㄜ',en:'Cement mixer',kk:'[sɪˈmɛnt ˈmɪksɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">水泥車</text></svg>`},
  {id:'towtruck7',lv:7,cat:'vehicle',emoji:'🚚',zh:'拖吊車',zhuyin:'ㄊㄨㄛ ㄉㄧㄠˋ ㄔㄜ',en:'Tow truck',kk:'[ˈtoʊ ˌtrʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">拖吊車</text></svg>`},
  {id:'tent4',lv:4,cat:'nature',emoji:'⛺',zh:'帳篷',zhuyin:'ㄓㄤˋ ㄆㄥˊ',en:'Tent',kk:'[tɛnt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">帳篷</text></svg>`},
  {id:'kite4',lv:4,cat:'nature',emoji:'🪁',zh:'風箏',zhuyin:'ㄈㄥ ㄓㄥ',en:'Kite',kk:'[kaɪt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">風箏</text></svg>`},
  {id:'alpaca6',lv:6,cat:'land',emoji:'🦙',zh:'羊駝',zhuyin:'ㄧㄤˊ ㄊㄨㄛˊ',en:'Alpaca',kk:'[ælˈpækə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">羊駝</text></svg>`},
  {id:'beaver6',lv:6,cat:'land',emoji:'🦫',zh:'河狸',zhuyin:'ㄏㄜˊ ㄌㄧˊ',en:'Beaver',kk:'[ˈbivɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">河狸</text></svg>`},
  {id:'otter6',lv:6,cat:'sea',emoji:'🦦',zh:'水獺',zhuyin:'ㄕㄨㄟˇ ㄊㄚˇ',en:'Otter',kk:'[ˈɑtɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">水獺</text></svg>`},
  {id:'coral5',lv:5,cat:'sea',emoji:'🪸',zh:'珊瑚',zhuyin:'ㄕㄢ ㄏㄨˊ',en:'Coral',kk:'[ˈkɔrəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">珊瑚</text></svg>`},
  {id:'robin4',lv:4,cat:'air',emoji:'🐦',zh:'知更鳥',zhuyin:'ㄓ ㄍㄥ ㄋㄧㄠˇ',en:'Robin',kk:'[ˈrɑbɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">知更鳥</text></svg>`},
  {id:'kingfisher6',lv:6,cat:'air',emoji:'🐦',zh:'翠鳥',zhuyin:'ㄘㄨㄟˋ ㄋㄧㄠˇ',en:'Kingfisher',kk:'[ˈkɪŋˌfɪʃɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">翠鳥</text></svg>`},
  {id:'stickinsect6',lv:6,cat:'insect',emoji:'🪲',zh:'竹節蟲',zhuyin:'ㄓㄨˊ ㄐㄧㄝˊ ㄔㄨㄥˊ',en:'Stick insect',kk:'[ˈstɪk ˌɪnsɛkt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">竹節蟲</text></svg>`},
  {id:'silkworm5',lv:5,cat:'insect',emoji:'🐛',zh:'蠶寶寶',zhuyin:'ㄘㄢˊ ㄅㄠˇ ㄅㄠˇ',en:'Silkworm',kk:'[ˈsɪlkˌwɝm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蠶寶寶</text></svg>`},
  {id:'sushi4',lv:4,cat:'food',emoji:'🍣',zh:'壽司',zhuyin:'ㄕㄡˋ ㄙ',en:'Sushi',kk:'[ˈsuʃi]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">壽司</text></svg>`},
  {id:'icecream4',lv:4,cat:'food',emoji:'🍨',zh:'冰淇淋',zhuyin:'ㄅㄧㄥ ㄑㄧˊ ㄌㄧㄣˊ',en:'Ice cream',kk:'[ˈaɪs ˌkrim]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">冰淇淋</text></svg>`},
  {id:'plate3',lv:3,cat:'daily',emoji:'🍽️',zh:'盤子',zhuyin:'ㄆㄢˊ ㄗ˙',en:'Plate',kk:'[plet]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">盤子</text></svg>`},
  {id:'lantern4',lv:4,cat:'daily',emoji:'🏮',zh:'露營燈',zhuyin:'ㄌㄨˋ ㄧㄥˊ ㄉㄥ',en:'Camp lantern',kk:'[ˈkæmp ˌlæntɚn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">露營燈</text></svg>`},
  {id:'motorcycle6',lv:6,cat:'vehicle',emoji:'🏍️',zh:'摩托車',zhuyin:'ㄇㄛˊ ㄊㄨㄛ ㄔㄜ',en:'Motorcycle',kk:'[ˈmoʊtɚˌsaɪkəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">摩托車</text></svg>`},
  {id:'forklift7',lv:7,cat:'vehicle',emoji:'🏗️',zh:'堆高機',zhuyin:'ㄉㄨㄟ ㄍㄠ ㄐㄧ',en:'Forklift',kk:'[ˈfɔrkˌlɪft]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">堆高機</text></svg>`},
  {id:'campfire5',lv:5,cat:'nature',emoji:'🔥',zh:'營火',zhuyin:'ㄧㄥˊ ㄏㄨㄛˇ',en:'Campfire',kk:'[ˈkæmpˌfaɪɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">營火</text></svg>`},
  {id:'island5',lv:5,cat:'nature',emoji:'🏝️',zh:'小島',zhuyin:'ㄒㄧㄠˇ ㄉㄠˇ',en:'Island',kk:'[ˈaɪlənd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小島</text></svg>`},
];

// V1.4.1: replace the prototype geometric drawings with the high-recognition line-art library.
// The original inline SVGs remain only as a fallback if lineart.js fails to load.
if (typeof window !== 'undefined' && window.KIDS_LINEART) {
  templates.forEach(t => { if (window.KIDS_LINEART[t.id]) t.svg = window.KIDS_LINEART[t.id]; });
}


const DEFAULT_SETTINGS = {palmReject:true, pressure:true, pressureCurve:'normal', traceDefault:false, rewardSound:true, traceJudge:false, autoStep:false, traceVoice:false, completionFx:true, guideOpacity:.15};
let LAYER_NAMES = ['描線','上色','自由畫'];
const DEFAULT_LAYER_META = [
  {id:'trace',name:'描線',icon:'✏️',desc:'沿著底圖描線',system:true},
  {id:'color',name:'上色',icon:'🎨',desc:'用畫筆自由著色',system:true},
  {id:'free',name:'自由畫',icon:'✨',desc:'自由加畫內容',system:true}
];
const MAX_DRAW_LAYERS = 8;
let layerMeta = DEFAULT_LAYER_META.map(x=>({...x}));
let layerSeq = 4;
const STORAGE_SETTINGS = 'kidsDrawingSettingsV168';
const STORAGE_STARS = 'kidsDrawingStarsV154';
const STORAGE_DONE = 'kidsDrawingDoneTemplatesV154';
const STORAGE_TRACE_PROGRESS = 'kidsDrawingTraceProgressV154';

let settings = {...DEFAULT_SETTINGS, ...safeJson(localStorage.getItem(STORAGE_SETTINGS),{})};
let state = {
  level:null, category:null, current:null, tool:'pencil', size:8, opacity:1, color:COLORS[0], guideOpacity:normalizeGuideOpacity(settings.guideOpacity), guideStyle:getGuideStyle(), detailMode:'simple',
  activeLayer:0, layerVisible:[true,true,true], layerLocked:[false,false,false], history:[], historyIndex:-1,
  practiceMode:'en', practiceStage:0, traceAssist:settings.traceDefault,
  traceSteps:[], traceStepIndex:0, traceCompleted:new Set(), traceScores:{}, traceStats:{hits:0,total:0,strokes:0}, stepMask:null,
  lastPenAt:0, activePointer:null, drawSession:0, libraryMode:getLibraryMode(), paletteCollapsed:null,
  mainCanvasSize:null, practiceCanvasSize:null
};

const guideCanvas = $('#guideCanvas');
const gctx = guideCanvas.getContext('2d');
let drawCanvases = [$('#drawCanvas1'),$('#drawCanvas2'),$('#drawCanvas3')];
let drawCtxs = drawCanvases.map(c=>c.getContext('2d'));
drawCanvases.forEach((c,i)=>c.dataset.layer=String(i));
const practiceGuide = $('#practiceGuideCanvas'), practiceCanvas = $('#practiceCanvas');
const pgctx = practiceGuide.getContext('2d'), pctx = practiceCanvas.getContext('2d');

function safeJson(s,fallback){try{return s?JSON.parse(s):fallback}catch{return fallback}}
function isIPadLike(){return /iPad/i.test(navigator.userAgent||'')||((navigator.platform==='MacIntel'||/Macintosh/i.test(navigator.userAgent||''))&&(navigator.maxTouchPoints||0)>1)}
function isIOSLike(){return /iPad|iPhone|iPod/i.test(navigator.userAgent||'')||isIPadLike()}
function almostSameSize(a,b,tolerance=1){return !!a&&Math.abs((a.w||0)-(b.w||0))<=tolerance&&Math.abs((a.h||0)-(b.h||0))<=tolerance}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1800)}
function showView(id){$$('.view').forEach(v=>v.classList.remove('active'));$(id).classList.add('active');scrollTo({top:0,behavior:'smooth'})}
function saveSettings(){localStorage.setItem(STORAGE_SETTINGS,JSON.stringify(settings))}
function normalizeGuideOpacity(value){
  const n=Number(value);
  if(!Number.isFinite(n))return .15;
  return Math.min(1,Math.max(0,n));
}
function guideOpacityPercent(){return Math.round(normalizeGuideOpacity(state.guideOpacity)*100)}
function syncGuideOpacityUI(){
  const range=$('#guideOpacityRange');
  const out=$('#guideOpacityValue');
  const btn=$('#toggleGuideBtn');
  const pct=guideOpacityPercent();
  if(range)range.value=String(pct);
  if(out)out.textContent=`${pct}%`;
  if(btn)btn.textContent=pct>0?`👁️ 底圖 ${pct}%`:'🙈 底圖隱藏';
}
async function setGuideOpacity(value,{persist=true,redraw=true}={}){
  state.guideOpacity=normalizeGuideOpacity(value);
  if(persist){settings.guideOpacity=state.guideOpacity;saveSettings()}
  syncGuideOpacityUI();
  updateGuideStyleUI();
  if(redraw&&state.current)await drawGuide();
}

function getStars(){return +(localStorage.getItem(STORAGE_STARS)||0)}
function setStars(n){localStorage.setItem(STORAGE_STARS,String(Math.max(0,n)));updateStarUI()}
function doneTemplates(){return new Set(safeJson(localStorage.getItem(STORAGE_DONE),[]))}
function markDone(id){const s=doneTemplates();s.add(id);localStorage.setItem(STORAGE_DONE,JSON.stringify([...s]))}
function updateStarUI(){$('#starCount').textContent=getStars();$('#parentStars').textContent=getStars()}

function openCategoryPage(catId){
  const cat=categories.find(x=>x[0]===catId);
  if(!cat)return;
  resetActivePointerSession();
  state.category=catId;
  state.categoryPageLevel=null;
  renderCategoryPage(catId);
  showView('#categoryView');
}

function outlineGuideSrc(id){return `./assets/guides-outline-clean/${id}.png`; }
function simpleColorGuideSrc(id){return `./assets/guides-color-clean/${id}.png`; }
function simpleOutlineGuideSrc(id){return `./assets/guides-outline-clean/${id}.png`; }
function guideAssetSrc(id,style=state.guideStyle,detail=state.detailMode){return style==='outline'?simpleOutlineGuideSrc(id):simpleColorGuideSrc(id);}
function guidePreviewSrc(t,mode=state.guideStyle,detail=state.detailMode){return guideAssetSrc(t.id,mode,'simple');}
function updateCompactDrawToolSummaries(){
  const g=$('#guideCompactSummary');if(g)g.textContent=`${state.guideStyle==='outline'?'黑白':'彩色'}・${guideOpacityPercent()}%`;
  const l=$('#layerCompactSummary'),m=currentLayerMeta?.();if(l)l.textContent=`${m?.name||'圖層'}・${drawCanvases?.length||3} 層`;
}
function updateGuideStyleUI(){
  $$('.guide-style-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.guideStyle===state.guideStyle));
  const homeHint=$('#guideStyleHintHome');
  if(homeHint)homeHint.textContent=state.guideStyle==='outline'?'目前預設是黑白線稿，孩子可以自己上色；進入畫板後也能再切換成彩色底圖。':'目前預設是彩色底圖，方便參考顏色；進入畫板後也能切換成黑白線稿。';
  const note=$('#guideStyleNote');
  if(note){const pct=guideOpacityPercent();note.textContent=state.guideStyle==='outline'?`目前使用黑白線稿：底圖透明度 ${pct}%，可依需要自行調整。`:`目前使用彩色底圖：底圖透明度 ${pct}%，可依需要自行調整。`;}
  updateCompactDrawToolSummaries();
}
function updateDetailModeUI(){ return; }
async function setDetailMode(mode,{rerender=true,redraw=true}={}){ state.detailMode='simple'; return; }
async function setGuideStyle(style,{rerender=true,redraw=true}={}){
  const next=style==='outline'?'outline':'color';
  if(state.guideStyle===next){ updateGuideStyleUI(); return; }
  state.guideStyle=next;
  saveGuideStyle(next);
  updateGuideStyleUI();
  if(rerender){
    if($('#homeView')?.classList.contains('active')) renderHome();
    if($('#categoryView')?.classList.contains('active') && state.category) renderCategoryPage(state.category);
  }
  if(redraw && state.current){ await drawGuide(); updateSampleReference(); }
}


function renderCategoryPage(catId=state.category){
  const cat=categories.find(x=>x[0]===catId);
  if(!cat)return;
  const [id,em,name]=cat;
  const orderMap=new Map(DISPLAY_ORDER.map((tid,i)=>[tid,i]));
  const all=templates.filter(t=>isSampleTemplate(t.id)&&t.cat===id).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
  const levels=[...new Set(all.map(t=>t.lv))].sort((a,b)=>a-b);
  if(state.categoryPageLevel && !levels.includes(state.categoryPageLevel))state.categoryPageLevel=null;
  const rows=state.categoryPageLevel?all.filter(t=>t.lv===state.categoryPageLevel):all;
  const done=doneTemplates();
  const doneCount=all.filter(t=>done.has(t.id)).length;
  $('#categoryPageEmoji').textContent=em;
  $('#categoryPageTitle').textContent=name;
  $('#categoryPageDescription').textContent=CATEGORY_DESCRIPTIONS[id]||'選一張喜歡的圖案開始畫畫吧！';
  $('#categoryPageCount').textContent=all.length;
  $('#categoryPageDone').textContent=doneCount;
  const progressPercent=all.length?Math.round((doneCount/all.length)*100):0;
  const progressRing=$('#categoryProgressRing');
  if(progressRing)progressRing.style.setProperty('--progress',`${progressPercent*3.6}deg`);
  if($('#categoryProgressPercent'))$('#categoryProgressPercent').textContent=`${progressPercent}%`;
  if($('#categoryProgressLabel'))$('#categoryProgressLabel').textContent=doneCount?`已完成 ${doneCount} / ${all.length} 張，繼續加油！`:'從第一張開始挑戰吧！';
  $('#categoryProgressText').textContent=`${doneCount ? `已完成 ${doneCount}/${all.length} 張・` : ''}${state.categoryPageLevel?`目前顯示 LV${state.categoryPageLevel}`:'目前顯示全部難度'}・${rows.length} 張`;
  $('#categoryLevelChips').innerHTML=levels.map(lv=>`<button class="category-level-chip ${state.categoryPageLevel===lv?'active':''}" data-category-lv="${lv}">LV${lv}<small>${all.filter(t=>t.lv===lv).length} 張</small></button>`).join('');
  $('#categoryClearLevelBtn').disabled=!state.categoryPageLevel;
  $('#categoryTemplateGrid').innerHTML=rows.map(t=>{
    const preview=guidePreviewSrc(t);
    return `<article class="template-card sample-card category-template-card" data-id="${t.id}"><div class="template-preview"><img loading="lazy" decoding="async" src="${preview}" alt="${t.zh} ${t.en} 描圖線稿"></div><div class="template-meta"><span class="pill">LV${t.lv}</span><span class="sample-pill">${done.has(t.id)?'已完成 ⭐':'正式教材'}</span><strong>${t.emoji} ${t.zh}・${t.en}</strong><small>${t.zhuyin}　${t.kk}</small></div></article>`;
  }).join('')||`<div class="empty-state">這個難度目前沒有圖案。</div>`;
  $$('.category-level-chip').forEach(b=>b.onclick=()=>{const lv=+b.dataset.categoryLv;state.categoryPageLevel=state.categoryPageLevel===lv?null:lv;renderCategoryPage(id)});
  $$('.category-template-card').forEach(c=>c.onclick=()=>openTemplate(c.dataset.id));
}

function renderHome(){
  const orderMap=new Map(DISPLAY_ORDER.map((id,i)=>[id,i]));
  const stats=categoryStats();
  $('#levelGrid').innerHTML=Array.from({length:10},(_,i)=>`<button class="level-btn ${state.level===i+1?'active':''}" data-lv="${i+1}">LV${i+1}<span>${i<2?'入門':i<5?'基礎':i<8?'進階':'挑戰'}</span></button>`).join('');
  $('#categoryGrid').innerHTML=stats.map(cat=>`<button class="cat-btn ${state.category===cat.id?'active':''}" data-cat="${cat.id}"><span class="emoji">${cat.em}</span>${cat.name}<small>${cat.count} 張</small></button>`).join('');
  $('#categoryShowcase').innerHTML=stats.map(cat=>`<article class="cat-card ${state.category===cat.id?'active':''}" data-cat="${cat.id}"><div class="cat-card-top"><div><div class="cat-card-emoji">${cat.em}</div><h3>${cat.name}</h3><p>${CATEGORY_DESCRIPTIONS[cat.id]||''}</p></div><div class="cat-count">${cat.count}<span>張</span></div></div><div class="cat-preview-strip">${cat.preview.map(t=>`<div class="cat-mini"><img src="${guidePreviewSrc(t)}" alt="${t.zh}"></div>`).join('')}</div><button class="cat-open-btn" data-cat="${cat.id}">打開 ${cat.name}</button></article>`).join('');
  let rows=templates.filter(t=>(!state.level||t.lv===state.level)&&(!state.category||t.cat===state.category));
  rows=rows.filter(t=>isSampleTemplate(t.id)).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
  const activeCategory=state.category?(categories.find(x=>x[0]===state.category)?.[2]||''):'';
  const scopeText='正式教材 200 張';
  $('#filterHint').textContent=`${scopeText}｜${activeCategory?activeCategory+'｜':''}${state.level?`LV${state.level}・`:''}${!state.level&&!state.category?'全部圖案':''}｜${rows.length} 張`;
  const done=doneTemplates();
  $('#templateGrid').innerHTML=rows.map(t=>{
    const preview=guidePreviewSrc(t);
    return `<article class="template-card sample-card" data-id="${t.id}"><div class="template-preview"><img loading="lazy" decoding="async" src="${preview}" alt="${t.zh} ${t.en} 描圖線稿"></div><div class="template-meta"><span class="pill">LV${t.lv}</span><span class="sample-pill">正式樣板</span><strong>${done.has(t.id)?'⭐ ':''}${t.emoji} ${t.zh}・${t.en}</strong><small>${t.zhuyin}　${t.kk}</small></div></article>`
  }).join('')||`<div class="empty-state">這個條件目前沒有圖案，換一個難度或分類看看。</div>`;
  $$('.level-btn').forEach(b=>b.onclick=()=>{state.level=state.level===+b.dataset.lv?null:+b.dataset.lv;renderHome()});
  $$('.cat-btn').forEach(b=>b.onclick=()=>openCategoryPage(b.dataset.cat));
  $$('.cat-card,.cat-open-btn').forEach(el=>el.onclick=(e)=>{e.stopPropagation();const target=e.currentTarget.dataset.cat||e.target.dataset.cat;if(target)openCategoryPage(target)});
  $$('.template-card').forEach(c=>c.onclick=()=>openTemplate(c.dataset.id));
}

const guideImageCache=new Map();
function svgToImage(svg){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)})}
function srcToImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src})}
function cachedGuideImage(key,factory){if(!guideImageCache.has(key))guideImageCache.set(key,factory());return guideImageCache.get(key)}
async function currentGuideImage(){
  if(!state.current)return null;
  const src=guideAssetSrc(state.current.id,state.guideStyle,state.detailMode);
  const key=state.detailMode+':'+state.guideStyle+':'+state.current.id;
  return cachedGuideImage(key,()=>srcToImage(src));
}
async function tintedMaskImage(src,color,w,h){const mask=await srcToImage(src),c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));const x=c.getContext('2d');x.drawImage(mask,0,0,c.width,c.height);x.globalCompositeOperation='source-in';x.fillStyle=color;x.fillRect(0,0,c.width,c.height);return c}
function sizeCanvas(canvas,cssW,cssH){const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);canvas.style.width=cssW+'px';canvas.style.height=cssH+'px';const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);return {dpr,w:cssW,h:cssH}}

function clearCanvasPixels(canvas,ctx){
  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.restore();
}
function dataUrlToImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src})}
function resetActivePointerSession(){
  state.activePointer=null;
  state.drawSession=(state.drawSession||0)+1;
}
const TOOL_HINTS={
  pencil:'✏️ 鉛筆：輕壓細淡、重壓較深，帶紙面顆粒',
  crayon:'🖍️ 蠟筆：厚實蠟質、粗糙邊緣與自然留白',
  brush:'🖌️ 畫筆：筆壓控制粗細，快畫會收細並看得到刷毛',
  watercolor:'💧 水彩筆：半透明疊色與柔和暈染，重複畫會逐漸加深',
  marker:'🖊️ 色筆：固定斜角筆尖，寬帶狀墨跡、邊緣較整齊',
  airbrush:'🌫️ 噴筆：柔霧顆粒噴灑，適合陰影、天空與大面積柔和上色',
  eraser:'🧽 橡皮擦：擦除所有「顯示中且未鎖定」圖層；教材底圖與鎖定層不會被擦掉'
};
let eraserCursorHideTimer=null;
function eraserPreviewDiameter(){return Math.max(26,(Number(state.size)||8)*2.85)}
function updateEraserCursorSize(){
  const cursor=$('#eraserCursor');if(!cursor)return;
  const d=eraserPreviewDiameter();cursor.style.width=`${d}px`;cursor.style.height=`${d}px`;
}
function placeEraserCursor(x,y,{tracking=true,erasing=false}={}){
  const cursor=$('#eraserCursor'),wrap=$('#canvasWrap');if(!cursor||!wrap||state.tool!=='eraser')return;
  const r=wrap.getBoundingClientRect(),radius=eraserPreviewDiameter()/2;
  const safeX=clamp(x,radius,Math.max(radius,r.width-radius)),safeY=clamp(y,radius,Math.max(radius,r.height-radius));
  updateEraserCursorSize();cursor.style.left=`${safeX}px`;cursor.style.top=`${safeY}px`;
  cursor.classList.add('visible');cursor.classList.toggle('tracking',!!tracking);cursor.classList.toggle('is-erasing',!!erasing);
}
function showEraserCursorPreview(){
  const wrap=$('#canvasWrap'),cursor=$('#eraserCursor');if(!wrap||!cursor||state.tool!=='eraser')return;
  wrap.classList.add('eraser-mode');updateEraserCursorSize();
  const r=wrap.getBoundingClientRect();placeEraserCursor(r.width*.50,r.height*.50,{tracking:false,erasing:false});
}
function hideEraserCursor(){const cursor=$('#eraserCursor'),wrap=$('#canvasWrap');if(cursor){cursor.classList.remove('visible','tracking','is-erasing')}if(wrap)wrap.classList.remove('eraser-mode')}
function setTool(tool){
  state.tool=tool;
  $$('.tool-btn').forEach(x=>x.classList.toggle('active',x.dataset.tool===tool));
  const hint=$('#penHint');if(hint)hint.textContent=TOOL_HINTS[tool]||'';
  const opacity=$('#brushOpacityInput');if(opacity)opacity.disabled=tool==='eraser';
  clearTimeout(eraserCursorHideTimer);
  if(tool==='eraser')requestAnimationFrame(showEraserCursorPreview);else hideEraserCursor();
}
function resetPracticeToEnglish(){
  state.practiceMode='en';
  state.practiceStage=0;
  $$('.practice-tabs .seg').forEach(x=>x.classList.toggle('active',x.dataset.practice==='en'));
  const btn=$('#practiceGuideBtn');if(btn)btn.textContent='描字 → 仿寫';
  clearCanvasPixels(practiceCanvas,pctx);
  clearCanvasPixels(practiceGuide,pgctx);
  drawPracticeGuide();
}
function canvasCssSize(){const r=$('#canvasWrap').getBoundingClientRect();return {w:r.width,h:r.height}}
function layerCtx(){return drawCtxs[state.activeLayer]}
function layerCanvas(){return drawCanvases[state.activeLayer]}
function syncLayerNames(){LAYER_NAMES=layerMeta.map(x=>x.name)}
function traceLayerIndex(){const i=layerMeta.findIndex(x=>x.id==='trace');return i<0?0:i}
function colorLayerIndex(){const i=layerMeta.findIndex(x=>x.id==='color');return i<0?Math.min(1,drawCanvases.length-1):i}
function currentLayerMeta(){return layerMeta[state.activeLayer]||layerMeta[0]}
function refreshLayerDataset(){drawCanvases.forEach((c,i)=>{c.dataset.layer=String(i);c.style.zIndex=String(2+i)})}
function resetDrawingHistoryBaseline(){state.history=[];state.historyIndex=-1;saveHistory()}
function updateLayerThumbnail(index){
  const thumb=document.querySelector(`.layer-thumb[data-thumb="${index}"]`);if(!thumb||!drawCanvases[index])return;
  const w=104,h=78;thumb.width=w;thumb.height=h;const x=thumb.getContext('2d');x.clearRect(0,0,w,h);x.fillStyle='#fffdf9';x.fillRect(0,0,w,h);x.drawImage(drawCanvases[index],0,0,w,h);
}
function updateAllLayerThumbnails(){drawCanvases.forEach((_,i)=>updateLayerThumbnail(i))}
function resetLayersToDefaults(){
  drawCanvases.slice(3).forEach(c=>c.remove());
  drawCanvases=drawCanvases.slice(0,3);drawCtxs=drawCtxs.slice(0,3);
  layerMeta=DEFAULT_LAYER_META.map(x=>({...x}));layerSeq=4;syncLayerNames();
  state.activeLayer=0;state.layerVisible=[true,true,true];state.layerLocked=[false,false,false];refreshLayerDataset();
}
function createLayerCanvas(){
  const c=document.createElement('canvas');c.className='draw-layer';c.id=`drawCanvasCustom${Date.now()}${Math.floor(Math.random()*999)}`;$('#canvasWrap').appendChild(c);drawCanvases.push(c);drawCtxs.push(c.getContext('2d'));refreshLayerDataset();setupLayerDrawing(c);const {w,h}=canvasCssSize();if(w&&h)sizeCanvas(c,w,h);return c;
}
function nextCustomLayerNumber(){const used=new Set(layerMeta.map(m=>{const x=String(m.name||'').match(/^圖層\s+(\d+)$/);return x?+x[1]:null}).filter(Number.isFinite));let n=4;while(used.has(n))n++;return n}
function addCustomLayer(){
  if(drawCanvases.length>=MAX_DRAW_LAYERS){toast(`最多 ${MAX_DRAW_LAYERS} 個圖層`);return}
  resetActivePointerSession();createLayerCanvas();const n=nextCustomLayerNumber();layerMeta.push({id:`custom-${Date.now()}-${n}`,name:`圖層 ${n}`,icon:'🧩',desc:'自訂繪畫圖層',system:false});state.layerVisible.push(true);state.layerLocked.push(false);syncLayerNames();state.activeLayer=drawCanvases.length-1;resetDrawingHistoryBaseline();updateLayerUI();toast(`已新增「${LAYER_NAMES[state.activeLayer]}」`)
}
function deleteActiveLayer(){
  const i=state.activeLayer,m=layerMeta[i];if(!m||m.system){toast('預設圖層不可刪除');return}if(!confirm(`要刪除「${m.name}」以及這一層的內容嗎？`))return;
  resetActivePointerSession();drawCanvases[i].remove();drawCanvases.splice(i,1);drawCtxs.splice(i,1);layerMeta.splice(i,1);state.layerVisible.splice(i,1);state.layerLocked.splice(i,1);state.activeLayer=Math.max(0,Math.min(i-1,drawCanvases.length-1));syncLayerNames();refreshLayerDataset();resetDrawingHistoryBaseline();updateLayerUI();toast('圖層已刪除')
}
function renameActiveLayer(){const i=state.activeLayer,m=layerMeta[i];if(!m||m.system){toast('描線、上色、自由畫為固定名稱');return}const v=prompt('圖層名稱',m.name);if(v===null)return;const name=String(v).trim().slice(0,16);if(!name)return;layerMeta[i].name=name;syncLayerNames();updateLayerUI();toast(`已改名為「${name}」`)}
function toggleActiveLayerLock(){const i=state.activeLayer;state.layerLocked[i]=!state.layerLocked[i];updateLayerUI();toast(state.layerLocked[i]?'🔒 圖層已鎖定':'🔓 圖層已解鎖')}
function toggleActiveLayerVisibility(){const i=state.activeLayer;if(state.layerVisible[i]){const visible=state.layerVisible.filter(Boolean).length;if(visible<=1){toast('至少要保留一個顯示中的圖層');return}state.layerVisible[i]=false;const next=state.layerVisible.findIndex((v,j)=>v&&j!==i);if(next>=0)state.activeLayer=next;toast(`已隱藏「${LAYER_NAMES[i]}」`)}else{state.layerVisible[i]=true;toast(`已顯示「${LAYER_NAMES[i]}」`)}updateLayerUI()}
function moveActiveLayer(delta){
  const i=state.activeLayer,j=i+delta;if(j<0||j>=drawCanvases.length)return;resetActivePointerSession();
  [drawCanvases[i],drawCanvases[j]]=[drawCanvases[j],drawCanvases[i]];[drawCtxs[i],drawCtxs[j]]=[drawCtxs[j],drawCtxs[i]];[layerMeta[i],layerMeta[j]]=[layerMeta[j],layerMeta[i]];[state.layerVisible[i],state.layerVisible[j]]=[state.layerVisible[j],state.layerVisible[i]];[state.layerLocked[i],state.layerLocked[j]]=[state.layerLocked[j],state.layerLocked[i]];
  state.activeLayer=j;syncLayerNames();refreshLayerDataset();drawCanvases.forEach(c=>$('#canvasWrap').appendChild(c));resetDrawingHistoryBaseline();updateLayerUI();toast(`已移動「${LAYER_NAMES[j]}」`)
}

async function resizeMainCanvases(preserve=true){
  const {w,h}=canvasCssSize();
  if(w<2||h<2)return false;
  const nextSize={w,h};
  if(preserve&&almostSameSize(state.mainCanvasSize,nextSize))return false;
  const old=preserve?drawCanvases.map(c=>c.width?c.toDataURL('image/png'):null):drawCanvases.map(()=>null);
  sizeCanvas(guideCanvas,w,h);drawCanvases.forEach(c=>sizeCanvas(c,w,h));
  state.mainCanvasSize=nextSize;
  await drawGuide();
  await Promise.all(old.map(async(src,i)=>{if(!src)return;try{const img=await dataUrlToImage(src);drawCtxs[i].drawImage(img,0,0,w,h)}catch{}}));
  updateLayerUI();updateAllLayerThumbnails();
  return true;
}

function allTraceProgress(){return safeJson(localStorage.getItem(STORAGE_TRACE_PROGRESS),{})}
function getSavedTraceProgress(id){const all=allTraceProgress(),p=all[id]||{};return {total:+p.total||0,completed:Array.isArray(p.completed)?p.completed:[],scores:p.scores&&typeof p.scores==='object'?p.scores:{}}}
function saveCurrentTraceProgress(){if(!state.current)return;const all=allTraceProgress();all[state.current.id]={total:state.traceSteps.length,completed:[...state.traceCompleted].sort((a,b)=>a-b),scores:state.traceScores,updated:new Date().toISOString()};localStorage.setItem(STORAGE_TRACE_PROGRESS,JSON.stringify(all))}
function escAttr(v){return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function traceStartFrom(tag,el,markup){
  if(tag==='path'){const d=el?.getAttribute?.('d')||markup.match(/d="([^"]+)"/)?.[1]||'';const m=d.match(/[Mm]\s*(-?\d*\.?\d+)[ ,]+(-?\d*\.?\d+)/);if(m)return {x:+m[1],y:+m[2]}}
  if(tag==='circle')return {x:+el.getAttribute('cx')-(+el.getAttribute('r')||0),y:+el.getAttribute('cy')};
  if(tag==='ellipse')return {x:+el.getAttribute('cx')-(+el.getAttribute('rx')||0),y:+el.getAttribute('cy')};
  if(tag==='rect')return {x:+el.getAttribute('x'),y:+el.getAttribute('y')};
  return null;
}
function extractTraceSteps(svg){
  const doc=new DOMParser().parseFromString(svg,'image/svg+xml'),root=doc.documentElement,raw=[];
  [...root.children].forEach(el=>{const tag=el.tagName.toLowerCase();if(!['path','circle','ellipse','rect','line','polyline','polygon'].includes(tag))return;
    if(tag==='path'){const d=el.getAttribute('d')||'',parts=d.match(/[Mm][^Mm]*/g)||[d];if(parts.length>1){parts.forEach(part=>raw.push({html:`<path d="${escAttr(part.trim())}"/>`,start:traceStartFrom('path',null,`d="${escAttr(part.trim())}"`)}));return}}
    raw.push({html:el.outerHTML,start:traceStartFrom(tag,el,el.outerHTML)});
  });
  if(!raw.length)return [];
  const max=10;if(raw.length<=max)return raw.map((r,i)=>({...r,label:`線條 ${i+1}`}));
  const size=Math.ceil(raw.length/max),out=[];for(let i=0;i<raw.length;i+=size){const group=raw.slice(i,i+size);out.push({html:group.map(x=>x.html).join(''),start:group.find(x=>x.start)?.start||null,label:`線條 ${out.length+1}`})}return out;
}
function stepSvg(step,color='#28b94f',width=22){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><style>path,circle,ellipse,rect,line,polyline,polygon{fill:none!important;stroke:${color}!important;stroke-width:${width}px!important;stroke-linecap:round!important;stroke-linejoin:round!important}</style>${step?.html||''}</svg>`}
function resetTraceStats(){state.traceStats={hits:0,total:0,strokes:0};updateTraceScoreUI()}
function traceRatingValue(){const vals=Object.values(state.traceScores||{}).map(Number).filter(Number.isFinite);if(!vals.length)return 0;const avg=vals.reduce((a,b)=>a+b,0)/vals.length;return avg>=85?3:avg>=65?2:1}
function traceRatingStars(){const n=traceRatingValue();return '★'.repeat(n)+'☆'.repeat(3-n)}
function updateTraceScoreUI(){const el=$('#traceScore');if(!el)return;const n=state.traceStats.total,pct=n?Math.round(state.traceStats.hits/n*100):null;el.textContent=pct===null?'貼合度 --':`貼合度 ${pct}%`;el.classList.toggle('good',pct!==null&&pct>=traceThreshold());el.classList.toggle('warn',pct!==null&&pct<traceThreshold());const rating=$('#traceRating');if(rating){rating.textContent=traceRatingStars();rating.classList.toggle('has-score',traceRatingValue()>0)}}
function traceThreshold(){return Math.max(48,68-(state.current?.lv||1)*2)}
function updateTraceLessonUI(){
  const panel=$('#traceLesson');if(!panel)return;const total=state.traceSteps.length;if(!state.traceAssist||!total){panel.classList.add('hidden');return}panel.classList.remove('hidden');
  const idx=Math.min(state.traceStepIndex,total-1);$('#traceStepTitle').textContent=`第 ${idx+1} 步 / ${total}・${state.traceSteps[idx].label}`;$('#traceStepHint').textContent=state.traceCompleted.has(idx)?'這一段已完成，可以前往下一段':'沿著畫布上的綠色線條慢慢描畫';
  const pct=total?Math.round(state.traceCompleted.size/total*100):0;$('#traceProgressBar').style.width=pct+'%';
  $('#traceStepDots').innerHTML=state.traceSteps.map((_,i)=>`<button class="trace-dot ${i===idx?'active':''} ${state.traceCompleted.has(i)?'done':''}" data-trace-step="${i}">${state.traceCompleted.has(i)?'✓':i+1}</button>`).join('');
  $$('[data-trace-step]').forEach(b=>b.onclick=()=>goTraceStep(+b.dataset.traceStep));$('#prevTraceStepBtn').disabled=idx<=0;$('#nextTraceStepBtn').disabled=idx>=total-1;
  $('#checkTraceStepBtn').textContent=state.traceCompleted.has(idx)?'✓ 已完成・再檢查':'✓ 檢查這一步';updateTraceScoreUI();
}
async function buildStepMask(w,h,step){
  const W=Math.max(1,Math.round(w)),H=Math.max(1,Math.round(h)),c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});
  if(step?.type==='image'){const img=await srcToImage(step.src);x.drawImage(img,0,0,W,H)}
  else{const img=await svgToImage(stepSvg(step,'#000',40));x.drawImage(img,0,0,W,H)}
  const data=x.getImageData(0,0,W,H).data;state.stepMask={w:W,h:H,data};
}
function scoreTracePoint(p){if(!settings.traceJudge||!state.traceAssist||layerMeta[state.activeLayer]?.id!=='trace'||state.tool==='eraser'||!state.stepMask)return;const m=state.stepMask,x=Math.max(0,Math.min(m.w-1,Math.round(p.x))),y=Math.max(0,Math.min(m.h-1,Math.round(p.y)));state.traceStats.total++;if(m.data[(y*m.w+x)*4+3]>20)state.traceStats.hits++;if(state.traceStats.total%6===0)updateTraceScoreUI()}
async function drawGuide(){
  if(!state.current)return;const {w,h}=canvasCssSize();gctx.clearRect(0,0,w,h);state.stepMask=null;
  if(state.guideOpacity>0){const img=await currentGuideImage();gctx.save();gctx.globalAlpha=state.guideOpacity;gctx.drawImage(img,0,0,w,h);gctx.restore()}
  if(state.traceAssist&&state.traceSteps.length){
    for(const doneIndex of [...state.traceCompleted]){
      const done=state.traceSteps[doneIndex];if(!done)continue;
      const doneImg=done.type==='image'?await tintedMaskImage(done.src,'#f3b83f',w,h):await svgToImage(stepSvg(done,'#f3b83f',20));
      gctx.save();gctx.globalAlpha=.60;gctx.drawImage(doneImg,0,0,w,h);gctx.restore();
    }
    const step=state.traceSteps[state.traceStepIndex],isDone=state.traceCompleted.has(state.traceStepIndex);
    const img=step.type==='image'?await tintedMaskImage(step.src,isDone?'#f3b83f':'#26b94d',w,h):await svgToImage(stepSvg(step,isDone?'#f3b83f':'#26b94d',isDone?20:18));
    gctx.save();gctx.globalAlpha=.92;gctx.drawImage(img,0,0,w,h);gctx.restore();await buildStepMask(w,h,step);if(!isDone)drawTraceStart(w,h,step)
  }
  updateTraceLessonUI();
}
function drawTraceStart(w,h,step){let p=step?.start?{x:step.start.x/800*w,y:step.start.y/600*h}:null;if(!p&&state.stepMask){const m=state.stepMask;outer:for(let y=0;y<m.h;y+=3)for(let x=0;x<m.w;x+=3)if(m.data[(y*m.w+x)*4+3]>20){p={x,y};break outer}}if(!p)return;gctx.save();gctx.fillStyle='#21b64a';gctx.strokeStyle='#fff';gctx.lineWidth=3;gctx.beginPath();gctx.arc(p.x,p.y,10,0,Math.PI*2);gctx.fill();gctx.stroke();gctx.fillStyle='#23833c';gctx.font='900 13px ui-rounded, sans-serif';gctx.fillText('開始',Math.min(p.x+15,w-48),Math.max(18,p.y-11));gctx.restore()}
function traceInstruction(){if(!state.traceSteps.length)return '';const idx=state.traceStepIndex+1,total=state.traceSteps.length;return state.traceCompleted.has(state.traceStepIndex)?`第 ${idx} 步已完成。可以前往下一段。`:`第 ${idx} 步，共 ${total} 步。沿著綠色線條慢慢描畫。`}
function speakTraceInstruction(){const text=traceInstruction();if(text)speak(text,'zh-TW',.78)}
async function goTraceStep(i,voice=settings.traceVoice){if(!state.traceSteps.length)return;state.traceStepIndex=Math.max(0,Math.min(state.traceSteps.length-1,i));resetTraceStats();await drawGuide();if(voice)setTimeout(speakTraceInstruction,120)}
async function checkTraceStep(){
  if(!state.traceSteps.length)return;const idx=state.traceStepIndex,pct=state.traceStats.total?Math.round(state.traceStats.hits/state.traceStats.total*100):0,threshold=traceThreshold();
  if(settings.traceJudge&&(state.traceStats.total<10||pct<threshold)){toast(state.traceStats.total<10?'再沿著綠色線條多畫一些，再檢查看看':`目前貼合度 ${pct}%，再靠近綠線一點就可以了`);updateTraceScoreUI();return}
  state.traceCompleted.add(idx);state.traceScores[idx]=settings.traceJudge?Math.max(1,pct):100;saveCurrentTraceProgress();updateTraceLessonUI();await drawGuide();toast(settings.traceJudge?`🌟 通過！貼合度 ${pct}%`:'🌟 這一步完成');if(settings.completionFx)showStepFlash();
  if(state.traceCompleted.size===state.traceSteps.length){const stars=traceRatingValue();toast(`🏆 逐步描圖全部完成！${'⭐'.repeat(stars)}`);if(settings.completionFx)setTimeout(()=>showTraceComplete(stars),380);if(settings.rewardSound)setTimeout(()=>speak(`全部描完了，得到 ${stars} 顆星，好棒！`,'zh-TW',.82),550);return}
  if(settings.autoStep){let next=idx+1;while(next<state.traceSteps.length&&state.traceCompleted.has(next))next++;if(next>=state.traceSteps.length)next=[...Array(state.traceSteps.length).keys()].find(i=>!state.traceCompleted.has(i))??idx;setTimeout(()=>goTraceStep(next,settings.traceVoice),520)}
}

function formalOrderedTemplates(){
  const orderMap=new Map(DISPLAY_ORDER.map((id,i)=>[id,i]));
  return templates.filter(t=>isSampleTemplate(t.id)).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
}
function currentTemplatePool(){
  let pool=formalOrderedTemplates();
  if(state.category) pool=pool.filter(t=>t.cat===state.category);
  const activeLevel=state.category?state.categoryPageLevel:state.level;
  if(activeLevel) pool=pool.filter(t=>t.lv===activeLevel);
  if(!pool.length) pool=formalOrderedTemplates();
  return pool;
}
function currentPoolLabel(){
  const catName=state.category?(categories.find(x=>x[0]===state.category)?.[2]||''):'';
  const lv=state.category?state.categoryPageLevel:state.level;
  if(catName&&lv)return `${catName}・LV${lv}`;
  if(catName)return catName;
  if(lv)return `LV${lv}`;
  return '全部正式教材';
}
function updateTemplateNavigation(){
  if(!state.current)return;
  const pool=currentTemplatePool();
  let idx=pool.findIndex(t=>t.id===state.current.id);
  if(idx<0){ const all=formalOrderedTemplates(); idx=all.findIndex(t=>t.id===state.current.id); const pos=$('#templatePositionText'); if(pos)pos.textContent=`${Math.max(1,idx+1)} / ${all.length}`; const lbl=$('#templatePoolText');if(lbl)lbl.textContent='全部正式教材';return; }
  const pos=$('#templatePositionText');if(pos)pos.textContent=`${idx+1} / ${pool.length}`;
  const lbl=$('#templatePoolText');if(lbl)lbl.textContent=currentPoolLabel();
}
function confirmTemplateSwitch(){
  if((state.historyIndex||0)<=0)return true;
  return confirm('目前這張還有尚未收藏的繪畫。要切換到其他圖案嗎？');
}
async function openAdjacentTemplate(delta){
  if(!state.current||!confirmTemplateSwitch())return;
  const pool=currentTemplatePool();
  let idx=pool.findIndex(t=>t.id===state.current.id);
  if(idx<0)idx=0;
  const next=pool[(idx+delta+pool.length)%pool.length];
  if(next)await openTemplate(next.id);
}
async function openRandomTemplate({fromHome=false}={}){
  if(!fromHome&&state.current&&!confirmTemplateSwitch())return;
  let pool=currentTemplatePool();
  if(state.current&&pool.length>1)pool=pool.filter(t=>t.id!==state.current.id);
  const pick=pool[Math.floor(Math.random()*pool.length)];
  if(pick)await openTemplate(pick.id);
}

async function openTemplate(id){
  const next=templates.find(t=>t.id===id);if(!next)return;
  resetActivePointerSession();
  state.current=next;
  $('#drawLevel').textContent='LV'+state.current.lv;
  $('#drawTitle').textContent=`${state.current.emoji} ${state.current.zh}・${state.current.en}`;
  $('#learnEmoji').textContent=state.current.emoji;
  $('#wordEn').textContent=state.current.en.toUpperCase();
  $('#wordKK').textContent=state.current.kk;
  $('#wordZh').textContent=state.current.zh;
  $('#wordZhuyin').textContent=state.current.zhuyin;
  updateFocusCurrentLabel();
  state.guideOpacity=normalizeGuideOpacity(settings.guideOpacity);
  resetLayersToDefaults();
  state.activeLayer=traceLayerIndex();
  state.layerVisible=drawCanvases.map(()=>true);state.layerLocked=drawCanvases.map(()=>false);
  state.traceAssist=false;
  state.history=[];state.historyIndex=-1;
  state.traceSteps=[];state.traceCompleted=new Set();state.traceScores={};state.traceStepIndex=0;
  resetTraceStats();
  setTool('pencil');
  syncGuideOpacityUI();
  showView('#drawView');
  await new Promise(r=>requestAnimationFrame(r));
  await resizeMainCanvases(false);
  clearAllLayers(false);
  updateLayerUI();
  resizePracticeCanvases();
  resetPracticeToEnglish();
  updateSampleReference();
  updateTemplateNavigation();
}

function updateLayerUI(){
  syncLayerNames();refreshLayerDataset();
  drawCanvases.forEach((c,i)=>{c.classList.toggle('active-layer',i===state.activeLayer);c.style.display=state.layerVisible[i]?'block':'none'});
  const holder=$('#layerCards');if(holder){holder.innerHTML=layerMeta.map((m,i)=>`<div class="layer-card ${i===state.activeLayer?'active':''} ${state.layerVisible[i]?'':'hidden-layer'} ${state.layerLocked[i]?'locked-layer':''}" data-layer-card="${i}"><button class="layer-thumb-btn" data-layer-select="${i}" type="button"><div class="layer-thumb-wrap"><canvas class="layer-thumb" data-thumb="${i}"></canvas><div class="layer-card-status"><span>${state.layerVisible[i]?'👁️':'🙈'}</span>${state.layerLocked[i]?'<span>🔒</span>':''}</div></div><div class="layer-card-meta"><b>${m.icon} ${m.name}</b><small>${m.desc||'繪畫圖層'}</small></div></button></div>`).join('');$$('[data-layer-select]').forEach(b=>b.onclick=()=>selectLayer(+b.dataset.layerSelect));}
  const m=currentLayerMeta();const name=$('#activeLayerName');if(name)name.textContent=`${m?.icon||'🧩'} ${m?.name||''}`;
  const eye=$('#layerEyeBtn');if(eye){eye.textContent=state.layerVisible[state.activeLayer]?'👁️ 顯示':'🙈 已隱藏';eye.classList.toggle('active',!!state.layerVisible[state.activeLayer]);}
  const lock=$('#layerLockBtn');if(lock){lock.textContent=state.layerLocked[state.activeLayer]?'🔒 已鎖定':'🔓 未鎖定';lock.classList.toggle('active',!!state.layerLocked[state.activeLayer]);}
  const ren=$('#layerRenameBtn');if(ren)ren.disabled=!!m?.system;const del=$('#layerDeleteBtn');if(del)del.disabled=!!m?.system;
  const down=$('#layerMoveDownBtn');if(down)down.disabled=state.activeLayer<=0;const up=$('#layerMoveUpBtn');if(up)up.disabled=state.activeLayer>=drawCanvases.length-1;const add=$('#addLayerBtn');if(add)add.disabled=drawCanvases.length>=MAX_DRAW_LAYERS;
  updateAllLayerThumbnails();updateCompactDrawToolSummaries();
}
function selectLayer(i){if(i<0||i>=drawCanvases.length)return;resetActivePointerSession();state.activeLayer=i;state.layerVisible[i]=true;updateLayerUI();toast(`現在畫在「${LAYER_NAMES[i]}」層${state.layerLocked[i]?'（已鎖定）':''}`)}

function pointerPos(e,canvas){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function ignoreTouch(e){
  if(e.pointerType==='pen'){state.lastPenAt=Date.now();return false}
  if(settings.palmReject && e.pointerType==='touch' && Date.now()-state.lastPenAt<1200){
    // PointerEvent.width/height describe contact geometry. Do not block a normal fingertip;
    // only reject a broad contact that is much more likely to be a resting palm.
    const contact=Math.max(Number(e.width)||1,Number(e.height)||1);
    if(contact>=28)return true;
  }
  return false;
}
function normalizedPressure(e){
  if(!(settings.pressure&&e.pointerType==='pen'))return .62;
  let p=e.pressure>0?e.pressure:.5;
  const mode=settings.pressureCurve||'normal';
  if(mode==='soft')p=Math.pow(p,.58);
  else if(mode==='firm')p=Math.pow(p,1.55);
  else p=Math.pow(p,.88);
  return clamp(p,.04,1);
}
function pressureFactor(e){return .34+normalizedPressure(e)*1.08}
function penTiltAmount(e){
  if(e.pointerType!=='pen')return 0;
  return clamp(Math.hypot(Number(e.tiltX)||0,Number(e.tiltY)||0)/78,0,1);
}
function dynamicBrushWidth(e,velocity=0){
  const base=state.size,p=normalizedPressure(e),tilt=penTiltAmount(e),speed=clamp(velocity,0,2.4);
  if(state.tool==='eraser')return Math.max(26,base*2.85);
  if(state.tool==='marker')return base*(1.62+p*.10);
  if(state.tool==='crayon')return base*(1.08+p*.42)*(1+tilt*.08);
  if(state.tool==='watercolor')return base*(1.08+p*.82)*clamp(1.12-speed*.10,.78,1.12);
  if(state.tool==='airbrush')return base*(2.05+p*.50);
  if(state.tool==='brush')return base*(.48+p*1.58)*clamp(1.16-speed*.22,.68,1.16);
  return base*(.38+p*.58)*(1+tilt*.34)*clamp(1.05-speed*.08,.78,1.05);
}
function brushComposite(tool){return tool==='eraser'?'destination-out':'source-over'}
function brushOpacity(){return clamp(Number(state.opacity)||1,.15,1)}
function hashNoise(x,y,k=0){
  const n=Math.sin(x*12.9898+y*78.233+k*37.719)*43758.5453123;
  return n-Math.floor(n);
}
function segmentBasis(a,b){
  const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
  return {dx,dy,len,tx:dx/len,ty:dy/len,nx:-dy/len,ny:dx/len};
}
function smoothStrokePath(ctx,stroke,p,{width,alpha=1,offset=0,lineCap='round',color=state.color}={}){
  const b=segmentBasis(stroke.last,p),ox=b.nx*offset,oy=b.ny*offset;
  const mid={x:(stroke.last.x+p.x)/2,y:(stroke.last.y+p.y)/2};
  ctx.save();ctx.globalCompositeOperation=brushComposite(state.tool);ctx.strokeStyle=color;ctx.globalAlpha=alpha*brushOpacity();
  ctx.lineCap=lineCap;ctx.lineJoin='round';ctx.lineWidth=Math.max(.45,width);
  ctx.beginPath();ctx.moveTo(stroke.mid.x+ox,stroke.mid.y+oy);ctx.quadraticCurveTo(stroke.last.x+ox,stroke.last.y+oy,mid.x+ox,mid.y+oy);ctx.stroke();ctx.restore();
  return mid;
}
function drawPencilFibers(ctx,a,b,width,pressure=.6,tilt=0){
  const basis=segmentBasis(a,b),step=Math.max(1.25,width*.30),count=Math.max(1,Math.ceil(basis.len/step));
  const lanes=Math.round(2+pressure*4+tilt*2);
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.strokeStyle=state.color;ctx.lineCap='round';
  for(let i=0;i<=count;i++){
    const t=count?i/count:0,cx=a.x+basis.dx*t,cy=a.y+basis.dy*t;
    for(let lane=0;lane<lanes;lane++){
      const n=hashNoise(cx+i*3.1,cy+lane*7.7,lane+11);
      if(n>.48+pressure*.26)continue;
      const off=(hashNoise(cx,cy,lane+31)-.5)*width*.88;
      const along=(hashNoise(cx,cy,lane+47)-.5)*step*.9;
      const len=step*(.48+hashNoise(cx,cy,lane+63)*1.4);
      ctx.globalAlpha=(.035+pressure*.07+hashNoise(cx,cy,lane+79)*.055)*brushOpacity();
      ctx.lineWidth=.38+hashNoise(cx,cy,lane+91)*Math.max(.38,width*.055);
      ctx.beginPath();ctx.moveTo(cx+basis.nx*off+basis.tx*(along-len*.5),cy+basis.ny*off+basis.ty*(along-len*.5));
      ctx.lineTo(cx+basis.nx*off+basis.tx*(along+len*.5),cy+basis.ny*off+basis.ty*(along+len*.5));ctx.stroke();
    }
  }
  ctx.restore();
}
function drawCrayonWax(ctx,a,b,width,pressure=.6){
  const basis=segmentBasis(a,b),step=Math.max(1.35,width*.14),count=Math.max(1,Math.ceil(basis.len/step));
  const density=.52+pressure*.34;
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.strokeStyle=state.color;ctx.lineCap='butt';
  for(let i=0;i<=count;i++){
    const t=count?i/count:0,cx=a.x+basis.dx*t,cy=a.y+basis.dy*t;
    for(let lane=0;lane<9;lane++){
      const q=hashNoise(cx+i*1.7,cy,lane+3);if(q>density)continue;
      const off=(lane/8-.5)*width*.92+(hashNoise(cx,cy,lane+17)-.5)*width*.09;
      const along=(hashNoise(cx,cy,lane+37)-.5)*step*1.1;
      const len=step*(.55+hashNoise(cx,cy,lane+51)*1.65);
      ctx.globalAlpha=(.06+pressure*.085+hashNoise(cx,cy,lane+87)*.11)*brushOpacity();
      ctx.lineWidth=Math.max(.55,width*(.025+hashNoise(cx,cy,lane+71)*.045));
      ctx.beginPath();ctx.moveTo(cx+basis.nx*off+basis.tx*(along-len*.5),cy+basis.ny*off+basis.ty*(along-len*.5));
      ctx.lineTo(cx+basis.nx*off+basis.tx*(along+len*.5),cy+basis.ny*off+basis.ty*(along+len*.5));ctx.stroke();
    }
  }
  ctx.restore();
}
function drawBrushBristles(ctx,stroke,p,width,pressure=.6,velocity=0){
  const offsets=[-.44,-.35,-.26,-.17,-.08,0,.09,.18,.27,.36,.45];
  let mid=null;
  offsets.forEach((o,i)=>{
    const dry=clamp((1-pressure)*.42+velocity*.16,0,.72);
    if(hashNoise(stroke.last.x,stroke.last.y,i)<dry*.42)return;
    const edge=Math.abs(o),alpha=(.17+pressure*.20)*(1-edge*.42);
    const scale=.052+(1-edge)*.060+hashNoise(stroke.last.x,stroke.last.y,i+19)*.028;
    const m=smoothStrokePath(ctx,stroke,p,{width:Math.max(.58,width*scale),alpha,offset:width*o,lineCap:'butt'});if(i===5)mid=m;
  });
  return mid;
}
function drawMarkerStroke(ctx,stroke,p,width){
  // Alcohol marker / felt pen: stable chisel nib at a fixed angle, with a slightly darker outside edge.
  const angle=-Math.PI*.22,ux=Math.cos(angle)*width*.50,uy=Math.sin(angle)*width*.50;
  const last=stroke.last,mid={x:(last.x+p.x)/2,y:(last.y+p.y)/2};
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle=state.color;
  ctx.globalAlpha=.94*brushOpacity();ctx.beginPath();ctx.moveTo(last.x+ux,last.y+uy);ctx.lineTo(p.x+ux,p.y+uy);ctx.lineTo(p.x-ux,p.y-uy);ctx.lineTo(last.x-ux,last.y-uy);ctx.closePath();ctx.fill();
  ctx.globalAlpha=.22*brushOpacity();const ex=ux*.94,ey=uy*.94;ctx.beginPath();ctx.moveTo(last.x+ex,last.y+ey);ctx.lineTo(p.x+ex,p.y+ey);ctx.lineWidth=Math.max(.55,width*.055);ctx.strokeStyle=state.color;ctx.stroke();ctx.restore();
  return mid;
}
function drawChiselStamp(ctx,p,width,alpha=.94){
  const angle=-Math.PI*.22;
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.translate(p.x,p.y);ctx.rotate(angle);ctx.fillStyle=state.color;ctx.globalAlpha=alpha*brushOpacity();
  const w=width*1.03,h=Math.max(2,width*.54);ctx.beginPath();ctx.roundRect(-w/2,-h/2,w,h,Math.min(2,h*.22));ctx.fill();ctx.restore();
}
function drawWatercolorStroke(ctx,stroke,p,width,pressure=.6){
  const body=.07+pressure*.07;
  const halo=.028+pressure*.025;
  let mid=smoothStrokePath(ctx,stroke,p,{width:width*.92,alpha:body,lineCap:'round'});
  smoothStrokePath(ctx,stroke,p,{width:width*1.18,alpha:halo,offset:width*.05,lineCap:'round'});
  smoothStrokePath(ctx,stroke,p,{width:width*.58,alpha:.035+pressure*.03,offset:-width*.15,lineCap:'round'});
  return mid;
}
function drawAirbrushStroke(ctx,a,b,width,pressure=.6){
  const basis=segmentBasis(a,b),step=Math.max(2,width*.12),count=Math.max(1,Math.ceil(basis.len/step));
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle=state.color;
  for(let i=0;i<=count;i++){
    const t=count?i/count:0,cx=a.x+basis.dx*t,cy=a.y+basis.dy*t;
    const dots=Math.max(8,Math.round(width*.8));
    for(let k=0;k<dots;k++){
      const a0=hashNoise(cx+i*2.1,cy,k+7)*Math.PI*2;
      const r=Math.sqrt(hashNoise(cx,cy+i*1.7,k+19))*width*.50;
      const rr=.35+hashNoise(cx,cy,k+31)*Math.max(.7,width*.035);
      ctx.globalAlpha=(.018+pressure*.018+hashNoise(cx,cy,k+43)*.025)*brushOpacity();
      ctx.beginPath();ctx.arc(cx+Math.cos(a0)*r,cy+Math.sin(a0)*r,rr,0,Math.PI*2);ctx.fill();
    }
  }
  ctx.restore();
  return {x:(a.x+b.x)/2,y:(a.y+b.y)/2};
}
function drawAirbrushDot(ctx,p,width,pressure=.62){
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle=state.color;
  const dots=Math.max(22,Math.round(width*2));
  for(let i=0;i<dots;i++){
    const a=hashNoise(p.x,p.y,i)*Math.PI*2,r=Math.sqrt(hashNoise(p.x,p.y,i+33))*width*.50;
    const rr=.35+hashNoise(p.x,p.y,i+71)*Math.max(.8,width*.04);
    ctx.globalAlpha=(.018+pressure*.02+hashNoise(p.x,p.y,i+55)*.026)*brushOpacity();
    ctx.beginPath();ctx.arc(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,rr,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}
function startTaperFactor(tool,distance,width){
  if(tool==='brush'||tool==='watercolor')return clamp(.28+distance/Math.max(9,width*1.35),.28,1);
  if(tool==='pencil')return clamp(.52+distance/Math.max(8,width*1.25),.52,1);
  return 1;
}
function drawBrushSegment(ctx,stroke,p,width){
  const tool=state.tool;let mid;
  const pressure=stroke.currentPressure??.62,velocity=stroke.currentVelocity??0,tilt=stroke.currentTilt??0;
  const basis=segmentBasis(stroke.last,p);stroke.distance=(stroke.distance||0)+basis.len;
  const taper=startTaperFactor(tool,stroke.distance,width);width*=taper;
  if(tool==='pencil'){
    // Graphite / colour pencil: translucent compressed core plus many fine fibres parallel to travel.
    mid=smoothStrokePath(ctx,stroke,p,{width:width*.76,alpha:.23+pressure*.23,lineCap:'butt'});
    smoothStrokePath(ctx,stroke,p,{width:Math.max(.55,width*.18),alpha:.09+pressure*.09,offset:width*.13,lineCap:'butt'});
    smoothStrokePath(ctx,stroke,p,{width:Math.max(.48,width*.12),alpha:.06+pressure*.07,offset:-width*.19,lineCap:'butt'});
    drawPencilFibers(ctx,stroke.last,p,width,pressure,tilt);
  }else if(tool==='crayon'){
    // Crayon is built from broken wax streaks instead of repeated translucent round tubes.
    mid=smoothStrokePath(ctx,stroke,p,{width:width*.70,alpha:.15+pressure*.11,lineCap:'butt'});
    smoothStrokePath(ctx,stroke,p,{width:width*.43,alpha:.09+pressure*.07,offset:width*.16,lineCap:'butt'});
    drawCrayonWax(ctx,stroke.last,p,width,pressure);
  }else if(tool==='brush'){
    // Wet brush body + separated bristles. Fast/light strokes become drier and narrower.
    mid=smoothStrokePath(ctx,stroke,p,{width:width*.72,alpha:.34+pressure*.22,lineCap:'butt'});
    drawBrushBristles(ctx,stroke,p,width,pressure,velocity);
  }else if(tool==='watercolor'){
    mid=drawWatercolorStroke(ctx,stroke,p,width,pressure);
  }else if(tool==='airbrush'){
    mid=drawAirbrushStroke(ctx,stroke.last,p,width,pressure);
  }else if(tool==='marker'){
    mid=drawMarkerStroke(ctx,stroke,p,width);
  }else{
    mid=smoothStrokePath(ctx,stroke,p,{width,alpha:1});
  }
  stroke.prev=stroke.last;stroke.mid=mid||{x:(stroke.last.x+p.x)/2,y:(stroke.last.y+p.y)/2};
  stroke.lastDir={x:basis.tx,y:basis.ty};stroke.last=p;stroke.lastWidth=width;
}
function drawBrushDot(ctx,p,width,pressure=.62){
  ctx.save();ctx.globalCompositeOperation=brushComposite(state.tool);ctx.fillStyle=state.color;
  if(state.tool==='pencil'){
    for(let i=0;i<10;i++){const a=hashNoise(p.x,p.y,i)*Math.PI*2,r=Math.sqrt(hashNoise(p.x,p.y,i+10))*width*.38;ctx.globalAlpha=(.035+pressure*.09+hashNoise(p.x,p.y,i+20)*.07)*brushOpacity();ctx.beginPath();ctx.ellipse(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,.35+hashNoise(p.x,p.y,i+30)*Math.max(.45,width*.065),.25+hashNoise(p.x,p.y,i+50)*Math.max(.3,width*.035),a,0,Math.PI*2);ctx.fill()}
  }else if(state.tool==='crayon'){
    for(let i=0;i<24;i++){const a=hashNoise(p.x,p.y,i)*Math.PI*2,r=Math.sqrt(hashNoise(p.x,p.y,i+20))*width*.48;if(hashNoise(p.x,p.y,i+80)>.52+pressure*.34)continue;ctx.globalAlpha=(.06+pressure*.10+hashNoise(p.x,p.y,i+40)*.12)*brushOpacity();ctx.beginPath();ctx.ellipse(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,.7+hashNoise(p.x,p.y,i+60)*Math.max(.7,width*.10),.35+hashNoise(p.x,p.y,i+70)*Math.max(.4,width*.05),a,0,Math.PI*2);ctx.fill()}
  }else if(state.tool==='brush'){
    ctx.globalAlpha=(.32+pressure*.22)*brushOpacity();ctx.translate(p.x,p.y);ctx.rotate(-.28);ctx.beginPath();ctx.ellipse(0,0,width*.30,width*.18,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=(.14+pressure*.08)*brushOpacity();for(let i=-3;i<=3;i++){ctx.beginPath();ctx.ellipse(i*width*.075,0,width*.028,width*.20,0,0,Math.PI*2);ctx.fill()}
  }else if(state.tool==='watercolor'){
    ctx.globalAlpha=(.09+pressure*.07)*brushOpacity();ctx.beginPath();ctx.arc(p.x,p.y,Math.max(1,width*.42),0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=(.035+pressure*.025)*brushOpacity();ctx.beginPath();ctx.arc(p.x,p.y,Math.max(1,width*.56),0,Math.PI*2);ctx.fill();
  }else if(state.tool==='airbrush'){
    ctx.restore();drawAirbrushDot(ctx,p,width,pressure);return;
  }else if(state.tool==='marker'){
    ctx.restore();drawChiselStamp(ctx,p,width,.58);return;
  }else{
    ctx.globalAlpha=brushOpacity();ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.7,width/2),0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}
function finishBrushStroke(ctx,stroke){
  if(!stroke)return;
  const p=stroke.last,w=stroke.lastWidth||state.size,tool=state.tool;
  if(stroke.mid&&Math.hypot(stroke.mid.x-p.x,stroke.mid.y-p.y)>.2){
    const tail={...stroke,last:{x:stroke.mid.x,y:stroke.mid.y},mid:{x:stroke.mid.x,y:stroke.mid.y},lastWidth:w};
    drawBrushSegment(ctx,tail,p,w);
  }
  // Natural pencil/paintbrush lift: extend only a few pixels while rapidly reducing width.
  if((tool==='pencil'||tool==='brush'||tool==='watercolor')&&stroke.lastDir){
    const ext=clamp((stroke.currentVelocity||0)*4+w*.42,2.5,11),steps=4;
    let temp={...stroke,last:{...p},mid:{...p},distance:999};
    for(let i=1;i<=steps;i++){
      const f=i/steps,q={x:p.x+stroke.lastDir.x*ext*f,y:p.y+stroke.lastDir.y*ext*f};
      const scale=(tool==='brush'||tool==='watercolor')?Math.pow(1-f,1.35):Math.pow(1-f,.95);
      if(scale<.08)break;temp.currentPressure=Math.max(.08,(stroke.currentPressure||.62)*(1-f*.78));drawBrushSegment(ctx,temp,q,Math.max(.45,w*scale));
    }
  }else if(tool==='airbrush')drawAirbrushDot(ctx,p,w,stroke.currentPressure||.62);
  else if(tool==='marker')drawChiselStamp(ctx,p,w,.93);
  else if(tool==='crayon'){const q={x:p.x+(stroke.lastDir?.x||1)*2,y:p.y+(stroke.lastDir?.y||0)*2};drawCrayonWax(ctx,p,q,Math.max(1,w*.72),stroke.currentPressure||.62);}
  else if(tool!=='eraser')drawBrushDot(ctx,p,Math.max(1,w*.50),stroke.currentPressure||.62);
}

function eraseDotAllLayers(p,width){
  drawCtxs.forEach((ctx,i)=>{
    if(state.layerLocked[i]||!state.layerVisible[i])return;ctx.save();ctx.globalCompositeOperation='destination-out';ctx.globalAlpha=1;ctx.fillStyle='#000';
    ctx.beginPath();ctx.arc(p.x,p.y,Math.max(2,width/2),0,Math.PI*2);ctx.fill();ctx.restore();
  });
}
function eraseSegmentAllLayers(stroke,p,width){
  const mid={x:(stroke.last.x+p.x)/2,y:(stroke.last.y+p.y)/2};
  drawCtxs.forEach((ctx,i)=>{
    if(state.layerLocked[i]||!state.layerVisible[i])return;ctx.save();ctx.globalCompositeOperation='destination-out';ctx.globalAlpha=1;
    ctx.strokeStyle='#000';ctx.lineWidth=Math.max(4,width);ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();ctx.moveTo(stroke.mid.x,stroke.mid.y);ctx.quadraticCurveTo(stroke.last.x,stroke.last.y,mid.x,mid.y);ctx.stroke();ctx.restore();
  });
  stroke.mid=mid;stroke.last=p;stroke.lastWidth=width;
}

function clearBrowserSelection(){try{const s=window.getSelection?.();if(s&&s.rangeCount)s.removeAllRanges()}catch{}}
function protectDrawingSurface(el){
  if(!el)return;
  ['selectstart','dragstart','dblclick','contextmenu'].forEach(type=>el.addEventListener(type,e=>{e.preventDefault();clearBrowserSelection()},{capture:true}));
  el.addEventListener('pointerdown',()=>clearBrowserSelection(),{capture:true});
  el.addEventListener('gesturestart',e=>{e.preventDefault?.()},{capture:true});
}
protectDrawingSurface($('#canvasWrap'));
protectDrawingSurface($('.practice-wrap'));

function setupLayerDrawing(canvas){
  let drawing=false,stroke=null,session=0;
  canvas.addEventListener('pointerdown',e=>{
    clearBrowserSelection();
    const index=+canvas.dataset.layer;if(index!==state.activeLayer||ignoreTouch(e))return;e.preventDefault();if(state.layerLocked[index]){toast('🔒 這個圖層已鎖定，請先解鎖');return}
    if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;
    if(drawing)return;
    state.activePointer=e.pointerId;session=state.drawSession;drawing=false;stroke=null;
    drawing=true;try{canvas.setPointerCapture?.(e.pointerId)}catch{};
    const p=pointerPos(e,canvas),pressure=normalizedPressure(e),w=dynamicBrushWidth(e,0);
    stroke={last:p,prev:p,mid:p,lastWidth:w,lastTime:e.timeStamp||performance.now(),distance:0,currentPressure:pressure,currentVelocity:0,currentTilt:penTiltAmount(e),lastDir:null};
    if(state.tool==='eraser'){
      eraseDotAllLayers(p,w);
    }else{
      const startScale=state.tool==='brush'?.34:state.tool==='watercolor'?.58:state.tool==='pencil'?.58:1;
      drawBrushDot(drawCtxs[index],p,w*startScale,pressure);
    }
  });
  canvas.addEventListener('pointermove',e=>{
    if(!drawing||session!==state.drawSession||state.activePointer!==e.pointerId||ignoreTouch(e))return;e.preventDefault();
    const index=+canvas.dataset.layer;if(state.layerLocked[index])return;const ctx=drawCtxs[index],events=e.getCoalescedEvents?e.getCoalescedEvents():[e];
    for(const ev of events){
      const p=pointerPos(ev,canvas),now=ev.timeStamp||performance.now(),dt=Math.max(4,now-stroke.lastTime),dist=Math.hypot(p.x-stroke.last.x,p.y-stroke.last.y),velocity=dist/dt;
      if(dist<.20)continue;
      stroke.currentPressure=normalizedPressure(ev);stroke.currentVelocity=velocity;stroke.currentTilt=penTiltAmount(ev);
      const raw=dynamicBrushWidth(ev,velocity),smooth=(state.tool==='brush'||state.tool==='watercolor')?.52:state.tool==='pencil'?.60:state.tool==='airbrush'?.66:.70,width=(stroke.lastWidth*smooth)+(raw*(1-smooth));
      if(state.tool==='eraser')eraseSegmentAllLayers(stroke,p,width);else drawBrushSegment(ctx,stroke,p,width);
      stroke.lastTime=now;
    }
  });
  const end=e=>{
    if(!drawing||session!==state.drawSession)return;
    if(state.activePointer!==e.pointerId)return;
    const index=+canvas.dataset.layer;if(state.tool!=='eraser')finishBrushStroke(drawCtxs[index],stroke);
    else if(stroke)eraseDotAllLayers(stroke.last,Math.max(26,stroke.lastWidth||state.size*2.85));
    drawing=false;stroke=null;state.activePointer=null;saveHistory();updateAllLayerThumbnails();
  };
  canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);
}
drawCanvases.forEach(setupLayerDrawing);

function bindEraserCursorTracking(){
  const wrap=$('#canvasWrap');if(!wrap)return;
  const pos=e=>{const r=wrap.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}};
  wrap.addEventListener('pointerenter',e=>{
    if(state.tool!=='eraser'||ignoreTouch(e))return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;clearTimeout(eraserCursorHideTimer);const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:(e.buttons||0)>0});
  });
  wrap.addEventListener('pointermove',e=>{
    if(state.tool!=='eraser'||ignoreTouch(e))return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;clearTimeout(eraserCursorHideTimer);const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:(e.buttons||0)>0});
  });
  wrap.addEventListener('pointerdown',e=>{
    if(state.tool!=='eraser'||ignoreTouch(e))return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;clearTimeout(eraserCursorHideTimer);const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:true});
  });
  const finish=e=>{
    if(state.tool!=='eraser')return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:false});
    if(e.pointerType==='touch'){clearTimeout(eraserCursorHideTimer);eraserCursorHideTimer=setTimeout(()=>{const c=$('#eraserCursor');if(c&&state.tool==='eraser'){c.classList.remove('tracking','is-erasing');showEraserCursorPreview()}},650)}
  };
  wrap.addEventListener('pointerup',finish);wrap.addEventListener('pointercancel',finish);
  wrap.addEventListener('pointerleave',e=>{
    if(state.tool!=='eraser'||e.pointerType==='touch')return;const c=$('#eraserCursor');if(c)c.classList.remove('visible','tracking','is-erasing');
  });
}
bindEraserCursorTracking();

function clearLayer(record=true){if(state.layerLocked[state.activeLayer]){toast('🔒 這個圖層已鎖定，請先解鎖');return}clearCanvasPixels(layerCanvas(),layerCtx());if(layerMeta[state.activeLayer]?.id==='trace')resetTraceStats();if(record)saveHistory();updateAllLayerThumbnails()}
function clearAllLayers(record=true){drawCanvases.forEach((c,i)=>clearCanvasPixels(c,drawCtxs[i]));if(record)saveHistory();else{state.history=[];state.historyIndex=-1;saveHistory()}updateAllLayerThumbnails()}
function snapshot(){return drawCanvases.map(c=>c.toDataURL('image/png'))}
function historyLimit(){
  const layers=Math.max(1,drawCanvases.length);
  if(isIPadLike())return Math.max(6,Math.min(14,Math.floor(44/layers)));
  return Math.max(10,Math.min(24,Math.floor(80/layers)));
}
function saveHistory(){const snap=snapshot(),sig=snap.join('|');if(state.history[state.historyIndex]?.sig===sig)return;state.history=state.history.slice(0,state.historyIndex+1);state.history.push({sig,data:snap});const limit=historyLimit();while(state.history.length>limit)state.history.shift();state.historyIndex=state.history.length-1;updateUndoButtons()}
function restoreHistory(i){if(i<0||i>=state.history.length)return;state.historyIndex=i;const {w,h}=canvasCssSize(),snap=state.history[i].data;drawCtxs.forEach((ctx,k)=>{ctx.clearRect(0,0,w,h);if(!snap[k])return;const img=new Image();img.onload=()=>{ctx.drawImage(img,0,0,w,h);updateLayerThumbnail(k)};img.src=snap[k]});updateUndoButtons()}
function updateUndoButtons(){$('#undoBtn').disabled=state.historyIndex<=0;$('#redoBtn').disabled=state.historyIndex>=state.history.length-1}

async function resizePracticeCanvases(preserve=false){
  const r=$('.practice-wrap').getBoundingClientRect(),nextSize={w:r.width,h:r.height};
  if(r.width<2||r.height<2)return false;
  if(preserve&&almostSameSize(state.practiceCanvasSize,nextSize))return false;
  const old=preserve&&practiceCanvas.width?practiceCanvas.toDataURL('image/png'):null;
  sizeCanvas(practiceGuide,r.width,r.height);sizeCanvas(practiceCanvas,r.width,r.height);state.practiceCanvasSize=nextSize;
  clearCanvasPixels(practiceGuide,pgctx);clearCanvasPixels(practiceCanvas,pctx);
  if(old){try{const img=await dataUrlToImage(old);pctx.drawImage(img,0,0,r.width,r.height)}catch{}}
  return true;
}
function spacedTextWidth(ctx,text,tracking){
  const chars=[...String(text)];let w=0;
  chars.forEach((ch,i)=>{w+=ctx.measureText(ch).width;if(i<chars.length-1)w+=ch===' '?tracking*1.8:tracking});
  return w;
}
function fitSpacedText(ctx,text,maxWidth,maxSize,minSize,trackingRatio=.12,fontFamily='ui-rounded, sans-serif'){
  let fs=maxSize,tracking=Math.max(2,fs*trackingRatio);
  for(;fs>minSize;fs-=1){ctx.font=`700 ${fs}px ${fontFamily}`;tracking=Math.max(2,fs*trackingRatio);if(spacedTextWidth(ctx,text,tracking)<=maxWidth)break}
  ctx.font=`700 ${fs}px ${fontFamily}`;return {fs,tracking};
}
function drawCenteredSpacedText(ctx,text,cx,y,tracking){
  const chars=[...String(text)],total=spacedTextWidth(ctx,text,tracking);let x=cx-total/2;
  ctx.textAlign='left';
  chars.forEach((ch,i)=>{const m=ctx.measureText(ch).width;ctx.fillText(ch,x,y);x+=m;if(i<chars.length-1)x+=ch===' '?tracking*1.8:tracking});
  ctx.textAlign='center';
}
function drawPracticeGuide(){
  if(!state.current)return;
  const r=practiceGuide.getBoundingClientRect();
  if(r.width<2||r.height<2)return;
  clearCanvasPixels(practiceGuide,pgctx);pgctx.save();pgctx.lineWidth=1;pgctx.textAlign='center';pgctx.textBaseline='middle';
  const isFull=!!(drawFocusMode&&focusLearningPane==='practice');
  const alpha=state.practiceStage===0?.23:state.practiceStage===1?.10:0;
  if(state.practiceMode==='en'){
    pgctx.strokeStyle='#bfc8d1';
    const lineYs=isFull?[r.height*.19,r.height*.37,r.height*.63,r.height*.81]:[r.height*.18,r.height*.38,r.height*.62,r.height*.82];
    lineYs.forEach((y,i)=>{pgctx.setLineDash(i===1||i===2?[7,8]:[]);pgctx.beginPath();pgctx.moveTo(isFull?r.width*.025:8,y);pgctx.lineTo(isFull?r.width*.975:r.width-8,y);pgctx.stroke()});pgctx.setLineDash([]);
    const txt=state.current.en.toLowerCase(),maxW=r.width*(isFull?.93:.90);
    const maxSize=isFull?Math.min(r.height*.58,r.width*.34):Math.min(66,r.height*.39);
    const minSize=isFull?Math.max(32,Math.min(72,r.width*.09)):25;
    const fitted=fitSpacedText(pgctx,txt,maxW,maxSize,minSize,isFull?.20:.14,'ui-rounded, "Arial Rounded MT Bold", sans-serif');
    pgctx.font=`700 ${fitted.fs}px ui-rounded, "Arial Rounded MT Bold", sans-serif`;
    pgctx.fillStyle=`rgba(60,70,80,${alpha})`;
    if(alpha)drawCenteredSpacedText(pgctx,txt,r.width*.5,r.height*.5,fitted.tracking);
  }else if(state.practiceMode==='zh'){
    const chars=[...state.current.zh],cols=Math.max(1,chars.length);
    if(isFull){
      const side=Math.max(24,r.width*.035),gap=Math.max(12,Math.min(42,r.width*.018));
      const availW=r.width-side*2-gap*(cols-1),availH=r.height*.70;
      const cell=Math.max(24,Math.min(availW/cols,availH));
      const gridW=cell*cols+gap*(cols-1),sx=(r.width-gridW)/2,sy=(r.height-cell)/2;
      for(let i=0;i<cols;i++){
        const x=sx+i*(cell+gap),y=sy;
        pgctx.strokeStyle='#cfc7b7';pgctx.strokeRect(x,y,cell,cell);pgctx.save();pgctx.setLineDash([8,9]);pgctx.strokeStyle='#dfd7ca';pgctx.beginPath();pgctx.moveTo(x+cell/2,y);pgctx.lineTo(x+cell/2,y+cell);pgctx.moveTo(x,y+cell/2);pgctx.lineTo(x+cell,y+cell/2);pgctx.moveTo(x,y);pgctx.lineTo(x+cell,y+cell);pgctx.moveTo(x+cell,y);pgctx.lineTo(x,y+cell);pgctx.stroke();pgctx.restore();
        if(state.practiceStage<2){pgctx.font=`700 ${cell*.79}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=`rgba(70,70,70,${alpha})`;pgctx.fillText(chars[i],x+cell/2,y+cell/2)}
      }
    }else{
      const gap=6,side=gap,vert=gap,availW=r.width-side*2-gap*(cols-1),availH=r.height-vert*2-gap;
      const cell=Math.max(32,Math.min(availW/cols,availH/2));
      const gridW=cell*cols+gap*(cols-1),gridH=cell*2+gap,sx=(r.width-gridW)/2,sy=(r.height-gridH)/2;
      for(let row=0;row<2;row++)for(let i=0;i<cols;i++){
        const x=sx+i*(cell+gap),y=sy+row*(cell+gap);pgctx.strokeStyle='#cfc7b7';pgctx.strokeRect(x,y,cell,cell);pgctx.save();pgctx.setLineDash([6,7]);pgctx.strokeStyle='#dfd7ca';pgctx.beginPath();pgctx.moveTo(x+cell/2,y);pgctx.lineTo(x+cell/2,y+cell);pgctx.moveTo(x,y+cell/2);pgctx.lineTo(x+cell,y+cell/2);pgctx.moveTo(x,y);pgctx.lineTo(x+cell,y+cell);pgctx.moveTo(x+cell,y);pgctx.lineTo(x,y+cell);pgctx.stroke();pgctx.restore();
        if((row===0&&state.practiceStage<2)||(row===1&&state.practiceStage===0)){pgctx.font=`700 ${cell*.74}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=row===0?`rgba(70,70,70,${alpha})`:'rgba(70,70,70,.09)';pgctx.fillText(chars[i],x+cell/2,y+cell/2)}
      }
    }
  }else{
    const syllables=state.current.zhuyin.split(/\s+/).filter(Boolean),cols=Math.max(1,syllables.length);
    if(isFull){
      const side=Math.max(24,r.width*.035),gap=Math.max(14,Math.min(44,r.width*.02));
      const availW=r.width-side*2-gap*(cols-1),cellW=Math.max(16,availW/cols),cellH=Math.min(r.height*.70,cellW*1.05);
      const gridW=cellW*cols+gap*(cols-1),sx=(r.width-gridW)/2,sy=(r.height-cellH)/2;
      for(let i=0;i<cols;i++){
        const x=sx+i*(cellW+gap),y=sy,syllable=syllables[i];
        pgctx.strokeStyle='#c9c3b9';pgctx.strokeRect(x,y,cellW,cellH);pgctx.save();pgctx.setLineDash([8,9]);pgctx.strokeStyle='#ddd7cc';pgctx.beginPath();pgctx.moveTo(x,y+cellH/2);pgctx.lineTo(x+cellW,y+cellH/2);pgctx.stroke();pgctx.restore();
        if(state.practiceStage<2){
          const maxFs=Math.min(cellH*.74,cellW*.72);
          const fitted=fitSpacedText(pgctx,syllable,cellW*.90,maxFs,Math.max(20,Math.min(46,cellW*.28)),.14,'"PingFang TC","Microsoft JhengHei",sans-serif');
          pgctx.font=`700 ${fitted.fs}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=`rgba(70,70,70,${alpha})`;drawCenteredSpacedText(pgctx,syllable,x+cellW/2,y+cellH/2,fitted.tracking);
        }
      }
    }else{
      const gap=Math.max(8,Math.min(14,r.width*.025)),cellW=Math.min(110,(r.width-gap*(cols+1))/cols),cellH=(r.height-gap*3)/2;
      const gridW=cellW*cols+gap*(cols-1),gridH=cellH*2+gap,sx=(r.width-gridW)/2,sy=(r.height-gridH)/2;
      for(let row=0;row<2;row++)for(let i=0;i<cols;i++){
        const x=sx+i*(cellW+gap),y=sy+row*(cellH+gap),syllable=syllables[i];pgctx.strokeStyle='#c9c3b9';pgctx.strokeRect(x,y,cellW,cellH);pgctx.save();pgctx.setLineDash([6,7]);pgctx.strokeStyle='#ddd7cc';pgctx.beginPath();pgctx.moveTo(x,y+cellH/2);pgctx.lineTo(x+cellW,y+cellH/2);pgctx.stroke();pgctx.restore();
        if((row===0&&state.practiceStage<2)||(row===1&&state.practiceStage===0)){
          const maxFs=Math.min(46,cellH*.58),fitted=fitSpacedText(pgctx,syllable,cellW*.82,maxFs,22,.08,'"PingFang TC","Microsoft JhengHei",sans-serif');
          pgctx.font=`700 ${fitted.fs}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=row===0?`rgba(70,70,70,${alpha})`:'rgba(70,70,70,.09)';drawCenteredSpacedText(pgctx,syllable,x+cellW/2,y+cellH/2,fitted.tracking);
        }
      }
    }
  }
  pgctx.restore();
}

function setupPractice(){
  let drawing=false,pid=null,stroke=null;
  practiceCanvas.addEventListener('pointerdown',e=>{clearBrowserSelection();if(ignoreTouch(e))return;if(drawing||pid!==null)return;e.preventDefault();drawing=true;pid=e.pointerId;try{practiceCanvas.setPointerCapture?.(pid)}catch{};const p=pointerPos(e,practiceCanvas),w=Math.max(4,dynamicBrushWidth(e,0)*.72);stroke={last:p,mid:p,lastWidth:w,lastTime:e.timeStamp||performance.now()};drawBrushDot(pctx,p,w)});
  practiceCanvas.addEventListener('pointermove',e=>{if(!drawing||e.pointerId!==pid||ignoreTouch(e))return;e.preventDefault();const events=e.getCoalescedEvents?e.getCoalescedEvents():[e];for(const ev of events){const p=pointerPos(ev,practiceCanvas),now=ev.timeStamp||performance.now(),dt=Math.max(4,now-stroke.lastTime),dist=Math.hypot(p.x-stroke.last.x,p.y-stroke.last.y),velocity=dist/dt;if(dist<.25)continue;const raw=Math.max(4,dynamicBrushWidth(ev,velocity)*.72),w=stroke.lastWidth*.68+raw*.32;drawBrushSegment(pctx,stroke,p,w);stroke.lastTime=now}});
  const end=e=>{if(!drawing||e.pointerId!==pid)return;finishBrushStroke(pctx,stroke);drawing=false;pid=null;stroke=null};practiceCanvas.addEventListener('pointerup',end);practiceCanvas.addEventListener('pointercancel',end);practiceCanvas.addEventListener('lostpointercapture',end)
}
setupPractice();

let speechRunToken=0;
const ENGLISH_VOICE_PREFERRED=['samantha','ava','alex','allison','google us english','microsoft aria','microsoft jenny','zira','guy','joanna'];
const NOVELTY_VOICE_NAMES=['albert','bad news','bahh','bells','boing','bubbles','cellos','good news','jester','organ','superstar','trinoids','whisper','zarvox'];
function cleanEnglishSpeechText(text){return String(text||'').replace(/[‐‑–—-]+/g,' ').replace(/\s+/g,' ').trim()}
function voiceScore(v,lang){
  const want=lang.toLowerCase(),base=want.split('-')[0],vl=(v.lang||'').toLowerCase(),name=(v.name||'').toLowerCase();let score=0;
  if(vl===want)score+=100;else if(vl.startsWith(base+'-')||vl===base)score+=55;else return -999;
  if(v.localService)score+=10;
  if(base==='en'){
    const pref=ENGLISH_VOICE_PREFERRED.findIndex(n=>name.includes(n));if(pref>=0)score+=45-pref;
    if(NOVELTY_VOICE_NAMES.some(n=>name.includes(n)))score-=120;
    if(/english|samantha|ava|alex|allison|aria|jenny|zira|joanna/.test(name))score+=8;
  }
  if(base==='zh'&&/mei-jia|meijia|美佳|ting-ting|tingting|曉臻|xiaozhen|hsiaochen/.test(name))score+=35;
  return score;
}
function pickVoice(lang,voices=speechSynthesis.getVoices()){
  return [...voices].map(v=>({v,s:voiceScore(v,lang)})).filter(x=>x.s>-900).sort((a,b)=>b.s-a.s)[0]?.v||null;
}
function ensureSpeechVoices(timeout=1200){
  if(!('speechSynthesis'in window))return Promise.resolve([]);
  const now=speechSynthesis.getVoices();if(now.length)return Promise.resolve(now);
  return new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;try{speechSynthesis.removeEventListener?.('voiceschanged',onvoices)}catch{};resolve(speechSynthesis.getVoices())};const onvoices=()=>{if(speechSynthesis.getVoices().length)finish()};speechSynthesis.addEventListener?.('voiceschanged',onvoices,{once:true});setTimeout(finish,timeout);speechSynthesis.getVoices()});
}
async function speak(text,lang,rate=.75,{volume=1,pitch=1.02}={}){
  if(!('speechSynthesis'in window)){toast('這台裝置不支援語音播放');return}
  const token=++speechRunToken;speechSynthesis.cancel();try{speechSynthesis.resume()}catch{}
  const voices=await ensureSpeechVoices();if(token!==speechRunToken)return;
  const spoken=lang.toLowerCase().startsWith('en')?cleanEnglishSpeechText(text):String(text||'').trim();if(!spoken)return;
  const u=new SpeechSynthesisUtterance(spoken);u.lang=lang;u.rate=rate;u.pitch=pitch;u.volume=Math.max(0,Math.min(1,volume));const voice=pickVoice(lang,voices);if(voice&&voice.lang.toLowerCase().startsWith(lang.split('-')[0].toLowerCase()))u.voice=voice;
  speechSynthesis.cancel();speechSynthesis.speak(u)
}
async function speakChineseChars(text){
  if(!('speechSynthesis'in window)){toast('這台裝置不支援語音播放');return}
  const token=++speechRunToken,chars=[...String(text)].filter(ch=>!(/\s|[・，。、]/).test(ch));if(!chars.length)return;
  speechSynthesis.cancel();try{speechSynthesis.resume()}catch{};const voices=await ensureSpeechVoices();if(token!==speechRunToken)return;const voice=pickVoice('zh-TW',voices);let i=0;
  const next=()=>{if(token!==speechRunToken||i>=chars.length)return;const u=new SpeechSynthesisUtterance(chars[i++]);u.lang='zh-TW';u.rate=.54;u.pitch=.96;u.volume=1;if(voice)u.voice=voice;u.onend=()=>{if(token===speechRunToken)setTimeout(next,150)};speechSynthesis.speak(u)};next()
}
if('speechSynthesis'in window){speechSynthesis.getVoices();speechSynthesis.addEventListener?.('voiceschanged',()=>speechSynthesis.getVoices());}

async function mergedImage(){const {w,h}=canvasCssSize();const c=document.createElement('canvas');c.width=Math.round(w*2);c.height=Math.round(h*2);const x=c.getContext('2d');x.scale(2,2);x.fillStyle='#fffdf9';x.fillRect(0,0,w,h);if(state.current&&state.guideOpacity>0){const guide=await currentGuideImage();x.save();x.globalAlpha=state.guideOpacity;x.drawImage(guide,0,0,w,h);x.restore()}drawCanvases.forEach((layer,i)=>{if(state.layerVisible[i])x.drawImage(layer,0,0,w,h)});return c.toDataURL('image/png')}
function db(){return new Promise((res,rej)=>{const q=indexedDB.open('kidsDrawingDB',2);q.onupgradeneeded=()=>{if(!q.result.objectStoreNames.contains('works'))q.result.createObjectStore('works',{keyPath:'id'})};q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function saveWork(){
  if(!state.current)return;const data={id:Date.now(),templateId:state.current.id,title:`${state.current.zh}・${state.current.en}`,lv:state.current.lv,created:new Date().toISOString(),traceCompleted:state.traceCompleted.size,traceTotal:state.traceSteps.length,traceRating:traceRatingValue(),image:await mergedImage()};
  try{const d=await db(),tx=d.transaction('works','readwrite');tx.objectStore('works').put(data);await new Promise((r,j)=>{tx.oncomplete=r;tx.onerror=()=>j(tx.error)});const first=!doneTemplates().has(state.current.id);markDone(state.current.id);const earned=first?2:1;setStars(getStars()+earned);showReward(earned);if(settings.rewardSound)setTimeout(()=>speak('完成了，好棒！','zh-TW',.82),250)}catch(e){console.error(e);toast('作品保存失敗')}
}
async function allWorks(){try{const d=await db();return await new Promise((r,j)=>{const q=d.transaction('works').objectStore('works').getAll();q.onsuccess=()=>r(q.result.sort((a,b)=>b.id-a.id));q.onerror=()=>j(q.error)})}catch{return[]}}
async function deleteWork(id){const d=await db(),tx=d.transaction('works','readwrite');tx.objectStore('works').delete(id);return new Promise(r=>tx.oncomplete=r)}
function dataUrlToBlob(dataUrl){
  const parts=String(dataUrl).split(','),meta=parts[0]||'',raw=atob(parts[1]||''),mime=(meta.match(/data:([^;]+)/)||[])[1]||'image/png',bytes=new Uint8Array(raw.length);
  for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
  return new Blob([bytes],{type:mime});
}
async function exportWorkImage(w){
  if(!w)return;const filename=`小小畫家_${w.title}_${w.id}.png`;
  if(isIOSLike()&&navigator.share&&typeof File!=='undefined'){
    try{const file=new File([dataUrlToBlob(w.image)],filename,{type:'image/png'});const payload={files:[file],title:'小小畫家作品'};if(!navigator.canShare||navigator.canShare(payload)){await navigator.share(payload);return}}catch(err){if(err?.name==='AbortError')return;console.warn('iOS share fallback',err)}
  }
  const a=document.createElement('a');a.href=w.image;a.download=filename;a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
}
async function renderGallery(){
  const works=await allWorks();$('#emptyGallery').style.display=works.length?'none':'grid';const levels=new Set(works.map(w=>w.lv));const stars=getStars();$('#gallerySummary').textContent=works.length?`已收藏 ${works.length} 張作品・挑戰 ${levels.size} 個等級・累積 ⭐ ${stars}`:'第一張作品，從今天開始收藏。';
  if($('#galleryWorksCount'))$('#galleryWorksCount').textContent=works.length;
  if($('#galleryLevelsCount'))$('#galleryLevelsCount').textContent=levels.size;
  if($('#galleryStarsCount'))$('#galleryStarsCount').textContent=stars;
  $('#galleryGrid').innerHTML=works.map(w=>`<article class="gallery-item"><div class="gallery-frame"><img src="${w.image}" alt="${w.title}"><span class="gallery-lv-badge">LV${w.lv}</span></div><div class="gallery-body"><strong>${w.title}</strong><small class="gallery-date">📅 ${new Date(w.created).toLocaleString('zh-TW')}</small>${w.traceTotal?`<small class="template-progress">🧭 描圖 ${w.traceCompleted||0}/${w.traceTotal}${w.traceRating?`・${'⭐'.repeat(w.traceRating)}${'☆'.repeat(3-w.traceRating)}`:''}</small>`:''}<div class="gallery-actions"><button class="gallery-download" data-download="${w.id}">${isIOSLike()?'📤 分享／儲存':'⬇️ 下載 PNG'}</button><button class="gallery-delete" data-delete="${w.id}">🗑️ 刪除</button></div></div></article>`).join('');
  $$('[data-download]').forEach(b=>b.onclick=async()=>{const w=works.find(x=>x.id===+b.dataset.download);await exportWorkImage(w)});
  $$('[data-delete]').forEach(b=>b.onclick=async()=>{if(confirm('要刪除這張作品嗎？')){await deleteWork(+b.dataset.delete);renderGallery()}});
}
function showStepFlash(){const o=$('#stepFlash');if(!o)return;o.classList.remove('show');void o.offsetWidth;o.classList.add('show');o.setAttribute('aria-hidden','false');setTimeout(()=>{o.classList.remove('show');o.setAttribute('aria-hidden','true')},900)}
function showTraceComplete(stars){$('#rewardText').textContent=`描圖完成・${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}`;const o=$('#rewardOverlay');o.querySelector('strong').textContent='描圖挑戰完成！';o.classList.add('show');o.setAttribute('aria-hidden','false');setTimeout(()=>{o.classList.remove('show');o.setAttribute('aria-hidden','true');o.querySelector('strong').textContent='完成一張！'},1500)}
function showReward(n){$('#rewardText').textContent=n===2?'第一次完成這張，得到 2 顆星！':'得到 1 顆星！';const o=$('#rewardOverlay');o.querySelector('strong').textContent='完成一張！';o.classList.add('show');o.setAttribute('aria-hidden','false');setTimeout(()=>{o.classList.remove('show');o.setAttribute('aria-hidden','true')},1400)}

function sampleImageForTemplate(id){return simpleColorGuideSrc(id)||STYLE_BOARD}
function openSampleModal(src,title){
  $('#sampleModalTitle').textContent=title||'教材樣板圖';
  $('#sampleModalImg').src=src;
  $('#sampleModal').classList.add('open');
  $('#sampleModal').setAttribute('aria-hidden','false');
}
function closeSampleModal(){
  $('#sampleModal').classList.remove('open');
  $('#sampleModal').setAttribute('aria-hidden','true');
}
function updateSampleReference(){
  const block=$('#sampleRefBlock');
  if(!block||!state.current)return;
  const src=simpleColorGuideSrc(state.current.id);
  if(src){
    $('#sampleRefImg').src=src;
    $('#sampleRefImg').alt=`${state.current.zh} 樣板參考圖`;
    const title=document.querySelector('#sampleRefBlock .practice-title');
    if(title) title.textContent=state.guideStyle==='outline'?'🖼️ 彩色圖案參考':'🖼️ 彩色圖案樣板';
    block.hidden=false;
  }else{
    const title=document.querySelector('#sampleRefBlock .practice-title');
    if(title) title.textContent='🖼️ 樣板參考';
    block.hidden=true;
  }
}

async function openParent(){
  const works=await allWorks();
  $('#parentWorks').textContent=works.length;
  $('#parentLevels').textContent=new Set(works.map(w=>w.lv)).size;
  updateStarUI();
  $('#palmRejectToggle').checked=settings.palmReject;
  $('#pressureToggle').checked=settings.pressure;
  const pcs=$('#pressureCurveSelect');if(pcs)pcs.value=settings.pressureCurve||'normal';
  $('#rewardSoundToggle').checked=settings.rewardSound;
  $('#completionFxToggle').checked=settings.completionFx;
  $('#parentModal').classList.add('open');
  $('#parentModal').setAttribute('aria-hidden','false');
}
function closeParent(){$('#parentModal').classList.remove('open');$('#parentModal').setAttribute('aria-hidden','true')}
function bindSetting(id,key){const el=$(id);if(!el)return;el.onchange=e=>{settings[key]=e.target.checked;saveSettings();if(key==='pressure')$('#penHint').style.display=settings.pressure?'':'none'}}
bindSetting('#palmRejectToggle','palmReject');bindSetting('#pressureToggle','pressure');bindSetting('#rewardSoundToggle','rewardSound');bindSetting('#completionFxToggle','completionFx');
const pressureCurveSelect=$('#pressureCurveSelect');if(pressureCurveSelect)pressureCurveSelect.onchange=e=>{settings.pressureCurve=e.target.value;saveSettings();toast(`Apple Pencil 筆壓：${e.target.options[e.target.selectedIndex].text}`)};

function updateTraceButton(){}
const _traceBtn=$('#traceAssistBtn'); if(_traceBtn){ _traceBtn.onclick=()=>{}; _traceBtn.hidden=true; _traceBtn.disabled=true; }
['#prevTraceStepBtn','#nextTraceStepBtn','#speakTraceStepBtn','#checkTraceStepBtn'].forEach(sel=>{const el=$(sel); if(el) el.onclick=()=>{};});
let lastVisibleGuideOpacity=normalizeGuideOpacity(settings.guideOpacity)||.15;
$('#toggleGuideBtn').onclick=async()=>{
  if(state.guideOpacity>0){lastVisibleGuideOpacity=state.guideOpacity;await setGuideOpacity(0);}
  else{await setGuideOpacity(lastVisibleGuideOpacity||.15);}
};
const guideOpacityRange=$('#guideOpacityRange');
if(guideOpacityRange){
  guideOpacityRange.value=String(Math.round(normalizeGuideOpacity(settings.guideOpacity)*100));
  guideOpacityRange.oninput=e=>{const next=Number(e.target.value)/100;if(next>0)lastVisibleGuideOpacity=next;setGuideOpacity(next,{persist:true,redraw:true});};
}
$$('.guide-style-btn').forEach(btn=>btn.onclick=()=>setGuideStyle(btn.dataset.guideStyle));
$('#resetFilterBtn').onclick=()=>{state.level=null;state.category=null;renderHome()};
$('#backFromCategoryBtn').onclick=()=>{state.category=null;state.categoryPageLevel=null;renderHome();showView('#homeView')};
$('#categoryClearLevelBtn').onclick=()=>{state.categoryPageLevel=null;renderCategoryPage()};
const categoryRandomBtn=$('#categoryRandomBtn');if(categoryRandomBtn)categoryRandomBtn.onclick=()=>openRandomTemplate({fromHome:true});

const homeRandomBtn=$('#homeRandomBtn');if(homeRandomBtn)homeRandomBtn.onclick=()=>openRandomTemplate({fromHome:true});
$('#openStyleBoardBtn').onclick=()=>openSampleModal(STYLE_BOARD,'200 張彩色教材總覽');
$('#openStyleBoardFromDrawBtn').onclick=()=>openSampleModal(STYLE_BOARD,'200 張彩色教材總覽');
$('#openCurrentSampleBtn').onclick=()=>state.current&&openSampleModal(sampleImageForTemplate(state.current.id),`${state.current.zh} 樣板參考圖`);
$('#closeSampleBtn').onclick=closeSampleModal;
$('#sampleModal').onclick=e=>{if(e.target===$('#sampleModal'))closeSampleModal()};
$('#homeBtn').onclick=()=>{exitDrawFullscreen();resetActivePointerSession();state.category=null;state.categoryPageLevel=null;renderHome();showView('#homeView')};
$('#galleryBtn').onclick=async()=>{exitDrawFullscreen();resetActivePointerSession();showView('#galleryView');await renderGallery()};
$('#starBadge').onclick=async()=>{showView('#galleryView');await renderGallery()};
$('#backFromGalleryBtn').onclick=()=>{exitDrawFullscreen();state.category=null;state.categoryPageLevel=null;renderHome();showView('#homeView')};
$('#clearBtn').onclick=()=>{if(confirm(`要清除「${LAYER_NAMES[state.activeLayer]}」層的內容嗎？`))clearLayer()};
const drawFullscreenBtn=$('#drawFullscreenBtn');
const prevTemplateBtn=$('#prevTemplateBtn');if(prevTemplateBtn)prevTemplateBtn.onclick=()=>openAdjacentTemplate(-1);
const nextTemplateBtn=$('#nextTemplateBtn');if(nextTemplateBtn)nextTemplateBtn.onclick=()=>openAdjacentTemplate(1);
const randomTemplateBtn=$('#randomTemplateBtn');if(randomTemplateBtn)randomTemplateBtn.onclick=()=>openRandomTemplate();
$('#undoBtn').onclick=()=>restoreHistory(state.historyIndex-1);$('#redoBtn').onclick=()=>restoreHistory(state.historyIndex+1);$('#saveBtn').onclick=saveWork;
$('#speakEnBtn').onclick=()=>state.current&&speak(state.current.en,'en-US',.78,{volume:1,pitch:1.02});$('#speakEnSlowBtn').onclick=()=>state.current&&speak(state.current.en,'en-US',.52,{volume:1,pitch:1.02});$('#speakZhBtn').onclick=()=>state.current&&speak(state.current.zh,'zh-TW',.68,{volume:1,pitch:.96});$('#speakZhCharBtn').onclick=()=>state.current&&speakChineseChars(state.current.zh);
$('#practiceClearBtn').onclick=()=>clearCanvasPixels(practiceCanvas,pctx);
$('#practiceGuideBtn').onclick=()=>{state.practiceStage=(state.practiceStage+1)%3;$('#practiceGuideBtn').textContent=['描字 → 仿寫','仿寫 → 空白','空白 → 描字'][state.practiceStage];clearCanvasPixels(practiceCanvas,pctx);clearCanvasPixels(practiceGuide,pgctx);drawPracticeGuide()};
const addLayerBtn=$('#addLayerBtn');if(addLayerBtn)addLayerBtn.onclick=addCustomLayer;const layerEyeBtn=$('#layerEyeBtn');if(layerEyeBtn)layerEyeBtn.onclick=toggleActiveLayerVisibility;const layerLockBtn=$('#layerLockBtn');if(layerLockBtn)layerLockBtn.onclick=toggleActiveLayerLock;const layerRenameBtn=$('#layerRenameBtn');if(layerRenameBtn)layerRenameBtn.onclick=renameActiveLayer;const layerDeleteBtn=$('#layerDeleteBtn');if(layerDeleteBtn)layerDeleteBtn.onclick=deleteActiveLayer;const layerMoveUpBtn=$('#layerMoveUpBtn');if(layerMoveUpBtn)layerMoveUpBtn.onclick=()=>moveActiveLayer(1);const layerMoveDownBtn=$('#layerMoveDownBtn');if(layerMoveDownBtn)layerMoveDownBtn.onclick=()=>moveActiveLayer(-1);
$$('.tool-btn').forEach(b=>b.onclick=()=>setTool(b.dataset.tool));
$$('.size-btn').forEach(b=>b.onclick=()=>{$$('.size-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.size=+b.dataset.size;if(state.tool==='eraser'){updateEraserCursorSize();showEraserCursorPreview()}});
const brushOpacityInput=$('#brushOpacityInput');if(brushOpacityInput){brushOpacityInput.oninput=e=>{state.opacity=clamp((+e.target.value||100)/100,.15,1);const out=$('#brushOpacityValue');if(out)out.textContent=`${Math.round(state.opacity*100)}%`};}
$$('.practice-tabs .seg').forEach(b=>b.onclick=()=>{
  if(state.practiceMode===b.dataset.practice)return;
  $$('.practice-tabs .seg').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  state.practiceMode=b.dataset.practice;state.practiceStage=0;
  $('#practiceGuideBtn').textContent='描字 → 仿寫';
  clearCanvasPixels(practiceCanvas,pctx);clearCanvasPixels(practiceGuide,pgctx);drawPracticeGuide();
});
function selectColor(color){
  state.color=color;
  $$('.color-chip').forEach(x=>x.classList.toggle('active',x.dataset.color.toLowerCase()===String(color).toLowerCase()));
  const sw=$('#currentColorSwatch');if(sw)sw.style.background=color;
  if(state.tool==='eraser')setTool('pencil')
}
let colorWheelHSV={h:0,s:0,v:1},colorWheelDragging=false,colorWheelPointerId=null;
function clamp01(n){return Math.max(0,Math.min(1,Number(n)||0))}
function hsvToHex(h,s,v){
  h=((Number(h)%360)+360)%360;s=clamp01(s);v=clamp01(v);const c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c;let r=0,g=0,b=0;
  if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}
  const hx=n=>Math.round((n+m)*255).toString(16).padStart(2,'0');return `#${hx(r)}${hx(g)}${hx(b)}`
}
function hexToHsv(hex){
  const m=String(hex||'').trim().match(/^#([0-9a-f]{6})$/i);if(!m)return {h:0,s:0,v:1};const n=parseInt(m[1],16),r=((n>>16)&255)/255,g=((n>>8)&255)/255,b=(n&255)/255,max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0;
  if(d){if(max===r)h=60*(((g-b)/d)%6);else if(max===g)h=60*((b-r)/d+2);else h=60*((r-g)/d+4)}if(h<0)h+=360;return {h,s:max?d/max:0,v:max}
}
function drawColorWheel(){
  const canvas=$('#colorWheelCanvas');if(!canvas)return;const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,cx=w/2,cy=h/2,R=Math.min(w,h)/2-2,img=ctx.createImageData(w,h),d=img.data;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=x-cx,dy=y-cy,r=Math.hypot(dx,dy),i=(y*w+x)*4;if(r>R){d[i+3]=0;continue}let hue=Math.atan2(dy,dx)*180/Math.PI;if(hue<0)hue+=360;const sat=Math.min(1,r/R),hex=hsvToHex(hue,sat,1),rgb=parseInt(hex.slice(1),16);d[i]=(rgb>>16)&255;d[i+1]=(rgb>>8)&255;d[i+2]=rgb&255;d[i+3]=255}ctx.putImageData(img,0,0)
}
function updateColorWheelPointer(){
  const p=$('#colorWheelPointer'),shell=$('#colorWheelShell');if(!p||!shell)return;const a=colorWheelHSV.h*Math.PI/180,r=colorWheelHSV.s*47;p.style.left=`${50+Math.cos(a)*r}%`;p.style.top=`${50+Math.sin(a)*r}%`;const hex=hsvToHex(colorWheelHSV.h,colorWheelHSV.s,colorWheelHSV.v),preview=$('#colorWheelPreview'),code=$('#colorWheelHex'),range=$('#colorBrightnessRange'),value=$('#colorBrightnessValue');if(preview)preview.style.background=hex;if(code)code.textContent=hex.toUpperCase();if(range)range.value=String(Math.round(colorWheelHSV.v*100));if(value)value.textContent=`${Math.round(colorWheelHSV.v*100)}%`
}
function setWheelFromPoint(e){
  const canvas=$('#colorWheelCanvas'),r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2,dx=x-cx,dy=y-cy,R=Math.min(r.width,r.height)/2,dist=Math.hypot(dx,dy);colorWheelHSV.s=Math.min(1,dist/R);let h=Math.atan2(dy,dx)*180/Math.PI;if(h<0)h+=360;colorWheelHSV.h=h;updateColorWheelPointer()
}
function openColorWheel(){
  const overlay=$('#colorWheelPopover');colorWheelHSV=hexToHsv(state.color);if(colorWheelHSV.v<.2)colorWheelHSV.v=.2;overlay.hidden=false;overlay.setAttribute('aria-hidden','false');requestAnimationFrame(()=>{drawColorWheel();updateColorWheelPointer()})
}
function closeColorWheel(apply=false){
  if(apply)selectColor(hsvToHex(colorWheelHSV.h,colorWheelHSV.s,colorWheelHSV.v));colorWheelDragging=false;colorWheelPointerId=null;const overlay=$('#colorWheelPopover');overlay.hidden=true;overlay.setAttribute('aria-hidden','true')
}
function setupColorWheel(){
  const canvas=$('#colorWheelCanvas');if(!canvas)return;canvas.addEventListener('pointerdown',e=>{if(colorWheelPointerId!==null)return;e.preventDefault();colorWheelDragging=true;colorWheelPointerId=e.pointerId;try{canvas.setPointerCapture(e.pointerId)}catch{};setWheelFromPoint(e)});canvas.addEventListener('pointermove',e=>{if(!colorWheelDragging||colorWheelPointerId!==e.pointerId)return;e.preventDefault();setWheelFromPoint(e)});const end=e=>{if(colorWheelPointerId!==e.pointerId)return;colorWheelDragging=false;colorWheelPointerId=null};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);
  $('#colorBrightnessRange').oninput=e=>{colorWheelHSV.v=Math.max(.2,Math.min(1,Number(e.target.value)/100));updateColorWheelPointer()};$('#openColorWheelBtn').onclick=openColorWheel;$('#closeColorWheelBtn').onclick=()=>closeColorWheel(false);$('#confirmColorWheelBtn').onclick=()=>closeColorWheel(true);$('#colorWheelPopover').addEventListener('pointerdown',e=>{if(e.target===$('#colorWheelPopover'))closeColorWheel(false)})
}

let drawFocusMode=false,focusPaletteRestore=false,focusLearningPane='draw';
let fullscreenShell=null,fullscreenAnchors=new Map();
const focusPronunciationPanel=()=>$('#learnPronunciationPanel');
const focusPracticePanel=()=>$('#learnPracticePanel');
function updateFocusCurrentLabel(){
  const item=state.current;if(!item)return;
  const emoji=$('#focusCurrentEmoji'),word=$('#focusCurrentWord');
  if(emoji)emoji.textContent=item.emoji||'🎨';
  if(word)word.textContent=`${item.zh}・${String(item.en||'').toUpperCase()}`;
}
function moveLearningPanelsToFocus(){
  const host=$('#focusLearningHost');if(!host)return;
  const practice=focusPracticePanel();
  if(practice&&practice.parentElement!==host)host.appendChild(practice);
}
function restoreLearningPanels(){
  const card=$('#learnCard');if(!card)return;
  const sample=$('#learnSamplePanel'),pron=focusPronunciationPanel(),practice=focusPracticePanel();
  if(pron&&pron.parentElement!==card)card.insertBefore(pron,sample||card.firstChild);
  if(practice&&practice.parentElement!==card)card.appendChild(practice);
  if(pron)pron.hidden=false;if(practice)practice.hidden=false;
}
function rememberFullscreenNode(node,key){
  if(!node||fullscreenAnchors.has(key))return;
  const anchor=document.createComment(`fullscreen-${key}-anchor`);
  node.parentNode?.insertBefore(anchor,node);fullscreenAnchors.set(key,anchor);
}
function restoreFullscreenNode(node,key){
  const anchor=fullscreenAnchors.get(key);if(!node||!anchor)return;
  anchor.parentNode?.insertBefore(node,anchor);anchor.remove();fullscreenAnchors.delete(key);
}
function updateFullscreenViewportBox(){
  const shell=$('#drawFullscreenShell');if(!shell)return;
  const vv=window.visualViewport;
  const w=Math.max(320,Math.round(vv?.width||window.innerWidth||document.documentElement.clientWidth||320));
  const h=Math.max(320,Math.round(vv?.height||window.innerHeight||document.documentElement.clientHeight||320));
  const left=Math.round(vv?.offsetLeft||0),top=Math.round(vv?.offsetTop||0);
  shell.style.setProperty('--focus-vw',`${w}px`);shell.style.setProperty('--focus-vh',`${h}px`);
  shell.style.width=`${w}px`;shell.style.height=`${h}px`;shell.style.left=`${left}px`;shell.style.top=`${top}px`;
}
function createFullscreenShell(){
  if(fullscreenShell?.isConnected)return fullscreenShell;
  const shell=document.createElement('div');shell.id='drawFullscreenShell';shell.className='draw-fullscreen-shell focus-pane-draw';shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','全螢幕畫板');
  shell.innerHTML='<div id="drawFullscreenTop" class="draw-fullscreen-top"></div><div id="drawFullscreenMain" class="draw-fullscreen-main"></div><div id="drawFullscreenBottom" class="draw-fullscreen-bottom"></div>';
  document.body.appendChild(shell);fullscreenShell=shell;updateFullscreenViewportBox();return shell;
}
function mountFullscreenWorkspace(){
  const shell=createFullscreenShell(),top=$('#drawFullscreenTop'),main=$('#drawFullscreenMain'),bottom=$('#drawFullscreenBottom');
  const bar=$('#focusLearningBar'),panel=$('#focusLearningPanel'),stage=$('.workspace-card .canvas-stage'),toolbar=$('.workspace-card .toolbar');
  if(!top||!main||!bottom||!bar||!panel||!stage||!toolbar)throw new Error('fullscreen workspace nodes missing');
  rememberFullscreenNode(bar,'bar');rememberFullscreenNode(panel,'panel');rememberFullscreenNode(stage,'stage');rememberFullscreenNode(toolbar,'toolbar');
  top.appendChild(bar);main.appendChild(stage);main.appendChild(panel);bottom.appendChild(toolbar);
  bar.hidden=false;panel.hidden=true;moveLearningPanelsToFocus();
}
function unmountFullscreenWorkspace(){
  const bar=$('#focusLearningBar'),panel=$('#focusLearningPanel'),stage=$('#drawFullscreenShell .canvas-stage'),toolbar=$('#drawFullscreenShell .toolbar');
  restoreLearningPanels();
  if(bar)bar.hidden=true;if(panel)panel.hidden=true;
  restoreFullscreenNode(bar,'bar');restoreFullscreenNode(panel,'panel');restoreFullscreenNode(stage,'stage');restoreFullscreenNode(toolbar,'toolbar');
  fullscreenAnchors.forEach(a=>a?.remove());fullscreenAnchors.clear();
  fullscreenShell?.remove();fullscreenShell=null;
}
function clearFullscreenCanvasBox(){
  const wrap=$('#canvasWrap');if(!wrap)return;
  wrap.style.removeProperty('width');wrap.style.removeProperty('height');wrap.style.removeProperty('max-width');wrap.style.removeProperty('max-height');wrap.style.removeProperty('aspect-ratio');
}
function setFullscreenBrushControlsCollapsed(collapsed=true){
  const shell=$('#drawFullscreenShell'),btn=$('#fullscreenBrushToggle');
  if(shell)shell.classList.toggle('brush-controls-collapsed',!!collapsed);
  if(btn){btn.setAttribute('aria-expanded',String(!collapsed));btn.textContent=collapsed?'🖌️ 筆觸':'✕ 收合筆觸'}
}
function fitFullscreenCanvasBox(){
  if(!drawFocusMode||focusLearningPane!=='draw')return false;
  const shell=$('#drawFullscreenShell'),host=$('#drawFullscreenMain'),stage=$('#drawFullscreenShell .canvas-stage'),wrap=$('#canvasWrap');
  if(!shell||!host||!stage||!wrap)return false;
  updateFullscreenViewportBox();
  const r=host.getBoundingClientRect();
  if(r.width<2||r.height<2)return false;
  wrap.style.setProperty('width','100%','important');
  wrap.style.setProperty('height','100%','important');
  wrap.style.setProperty('max-width','none','important');
  wrap.style.setProperty('max-height','none','important');
  wrap.style.setProperty('aspect-ratio','auto','important');
  return true;
}
async function setFocusLearningPane(pane='draw'){
  if(!['draw','practice'].includes(pane))pane='draw';
  focusLearningPane=pane;
  const shell=$('#drawFullscreenShell'),panel=$('#focusLearningPanel'),practice=focusPracticePanel();
  shell?.classList.toggle('focus-pane-practice',pane==='practice');
  shell?.classList.toggle('focus-pane-draw',pane==='draw');
  shell?.classList.remove('focus-pane-speech');
  $$('.focus-mode-btn').forEach(b=>{const active=b.dataset.focusPane===pane;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});
  if(panel)panel.hidden=pane==='draw';if(practice)practice.hidden=pane!=='practice';
  updateFocusCurrentLabel();
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  if(pane==='practice'){
    state.practiceCanvasSize=null;
    await resizePracticeCanvases(true);drawPracticeGuide();
  }else{
    fitFullscreenCanvasBox();await new Promise(r=>requestAnimationFrame(r));state.mainCanvasSize=null;await resizeMainCanvases(true);showEraserCursorPreview();
  }
}
async function setDrawFullscreen(on){
  const btn=$('#drawFullscreenBtn');on=!!on;if(on===drawFocusMode)return;resetActivePointerSession();
  try{
    if(on){
      focusPaletteRestore=state.paletteCollapsed;setPaletteCollapsed(true,false);drawFocusMode=true;focusLearningPane='draw';document.body.classList.add('draw-focus-mode');
      mountFullscreenWorkspace();updateFocusCurrentLabel();setFullscreenBrushControlsCollapsed(true);if(btn){btn.setAttribute('aria-pressed','true');btn.textContent='✕ 離開全螢幕'}
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));fitFullscreenCanvasBox();state.mainCanvasSize=null;await resizeMainCanvases(true);showEraserCursorPreview();
    }else{
      drawFocusMode=false;clearFullscreenCanvasBox();document.body.classList.remove('draw-focus-mode');focusLearningPane='draw';unmountFullscreenWorkspace();setPaletteCollapsed(focusPaletteRestore,false);
      if(btn){btn.setAttribute('aria-pressed','false');btn.textContent='⛶ 全螢幕畫板'}
      state.mainCanvasSize=null;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));await resizeMainCanvases(true);await resizePracticeCanvases(true);drawPracticeGuide();showEraserCursorPreview();
    }
  }catch(err){
    console.error('fullscreen drawing mode failed',err);toast('全螢幕畫板載入失敗，請再試一次');
    drawFocusMode=false;clearFullscreenCanvasBox();document.body.classList.remove('draw-focus-mode');try{unmountFullscreenWorkspace()}catch{};setPaletteCollapsed(focusPaletteRestore,false);if(btn){btn.setAttribute('aria-pressed','false');btn.textContent='⛶ 全螢幕畫板'}
  }
}
function exitDrawFullscreen(){if(drawFocusMode)setDrawFullscreen(false)}
function bindDrawFullscreenButton(){
  const btn=$('#drawFullscreenBtn');if(!btn)return;btn.style.touchAction='manipulation';btn.addEventListener('click',e=>{e.preventDefault();setDrawFullscreen(!drawFocusMode)});
  const exit=$('#focusExitBtn');if(exit){exit.style.touchAction='manipulation';exit.addEventListener('click',e=>{e.preventDefault();exitDrawFullscreen()})}
}
function renderPalette(){
  $('#colorRow').innerHTML=COLORS.map(c=>`<button class="color-chip ${c===state.color?'active':''}" data-color="${c}" style="background:${c}" aria-label="選擇顏色 ${c}"></button>`).join('');
  $$('.color-chip').forEach(b=>b.onclick=()=>selectColor(b.dataset.color));
  selectColor(state.color);
}
function defaultPaletteCollapsed(){const saved=localStorage.getItem(STORAGE_PALETTE_COLLAPSED);if(saved!==null)return saved==='1';return matchMedia('(max-width:650px)').matches}
function setPaletteCollapsed(collapsed,persist=true){
  state.paletteCollapsed=!!collapsed;const dock=$('#paletteDock'),btn=$('#paletteToggleBtn');dock.classList.toggle('collapsed',state.paletteCollapsed);btn.setAttribute('aria-expanded',String(!state.paletteCollapsed));btn.innerHTML=state.paletteCollapsed?'🎨<span>展開</span>':'🎨<span>收合</span>';if(persist)localStorage.setItem(STORAGE_PALETTE_COLLAPSED,state.paletteCollapsed?'1':'0');
}
renderPalette();setupColorWheel();state.paletteCollapsed=defaultPaletteCollapsed();setPaletteCollapsed(state.paletteCollapsed,false);$('#paletteToggleBtn').onclick=()=>{setPaletteCollapsed(!state.paletteCollapsed);setTimeout(()=>{if($('#drawView').classList.contains('active'))resizeMainCanvases(true)},190)};
$$('.focus-mode-btn').forEach(b=>b.addEventListener('click',()=>{if(drawFocusMode)setFocusLearningPane(b.dataset.focusPane)}));
bindDrawFullscreenButton();
const fullscreenBrushToggle=$('#fullscreenBrushToggle');if(fullscreenBrushToggle)fullscreenBrushToggle.addEventListener('click',e=>{e.preventDefault();const shell=$('#drawFullscreenShell');if(!shell)return;setFullscreenBrushControlsCollapsed(!shell.classList.contains('brush-controls-collapsed'))});
$$('.compact-tool-panel').forEach(panel=>panel.addEventListener('toggle',()=>{if(panel.open)$$('.compact-tool-panel').forEach(other=>{if(other!==panel)other.open=false})}));

let holdTimer=null;const parentBtn=$('#parentBtn');const beginHold=e=>{e.preventDefault();clearTimeout(holdTimer);holdTimer=setTimeout(()=>openParent(),1200)};const endHold=()=>clearTimeout(holdTimer);parentBtn.addEventListener('pointerdown',beginHold);['pointerup','pointercancel','pointerleave'].forEach(ev=>parentBtn.addEventListener(ev,endHold));
$('#closeParentBtn').onclick=closeParent;$('#closeParentBottomBtn').onclick=closeParent;$('#parentModal').onclick=e=>{if(e.target===$('#parentModal'))closeParent()};

window.addEventListener('keydown',e=>{if(e.key==='Escape'){const cw=$('#colorWheelPopover');if(cw&&!cw.hidden){closeColorWheel(false);return}if(drawFocusMode)exitDrawFullscreen()}});
let resizeTimer;const scheduleResponsiveCanvasResize=()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(async()=>{if(!$('#drawView').classList.contains('active'))return;if(drawFocusMode&&focusLearningPane==='draw')fitFullscreenCanvasBox();if(!drawFocusMode||focusLearningPane==='draw')await resizeMainCanvases(true);if(!drawFocusMode||focusLearningPane==='practice'){await resizePracticeCanvases(true);drawPracticeGuide()}},180)};window.addEventListener('resize',scheduleResponsiveCanvasResize);window.addEventListener('orientationchange',()=>setTimeout(scheduleResponsiveCanvasResize,180));if(window.visualViewport)window.visualViewport.addEventListener('resize',scheduleResponsiveCanvasResize);
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
$('#penHint').style.display=settings.pressure?'':'none';updateStarUI();updateLayerUI();updateUndoButtons();renderHome();updateGuideStyleUI();
