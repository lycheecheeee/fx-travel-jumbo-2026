// 自動翻譯生成器 - 將廣東話自動轉換為簡體中文、英文、日文、韓文
const fs = require('fs');

// 原始廣東話消息
const cantoneseMessages = [
  { greeting: '🐘 象寶有嘢講', message: '人情還人情<br>象寶好分明！' },
  { greeting: '💭 象寶提醒', message: '唔洗扮唔記得<br>象寶幫你記低曬。' },
  { greeting: '💰 分帳專家', message: '有得玩有得畀<br>象寶幫你check邊個未畀錢！' },
  { greeting: '🧾 收據管理', message: '收據長過行程表？<br>交俾象寶啦！' },
  { greeting: '📈 滙率監控', message: '滙率升得快過你叫外賣...' },
  { greeting: '⏰ 耐心等候', message: '唔洗急<br>象寶幫你Mon緊啦' },
  { greeting: '🍽️ 食飯分帳', message: '食飯容易<br>分帳難。' },
  { greeting: '💱 滙率更新', message: '滙率update中...<br>睇下啱唔啱換。' },
  { greeting: '🔋 充電時間', message: '我幫你記緊帳<br>你幫我充下電ok？' },
  { greeting: '😤 小氣簿', message: '牙明未畀錢？<br>小氣寶幫你mark入小氣簿' },
  { greeting: '🧠 記憶力', message: '象寶記得啲數<br>人記得啲仇。' },
  { greeting: '💡 記帳哲學', message: '記帳唔代表孤寒<br>代表你有腦。' },
  { greeting: '📉 止蝕提醒', message: '滙率再咁跌<br>我都想幫你止蝕。' },
  { greeting: '👀 清晣見底', message: '你玩得幾盡<br>象寶舊睇得幾清！' },
  { greeting: '😴 Loading中', message: '其實象寶都鍾意hea下。' },
  { greeting: '⚠️ 重要提醒', message: '乜都可以hea<br>數唔可以。' },
  { greeting: '💸 錢嘅問題', message: '錢唔係問題<br>分帳先係。' },
  { greeting: '📒 數簿專家', message: '象寶幫你做數簿' },
  { greeting: '🤝 兄弟情', message: '數未清<br>唔好講兄弟情' },
  { greeting: '⚡ 成熟表現', message: '畀錢快過覆message<br>呢啲叫成熟。' },
  { greeting: '💔 感情比喻', message: '滙率浮沉如感情...' },
  { greeting: '⚖️ AA制哲學', message: 'AA制唔代表公平<br>但至少象寶好公平' },
  { greeting: '🔮 預知未來', message: '象寶見過嘅數亂過分岔的感情線' },
  { greeting: '⏳ 時間問題', message: '象寶都想知<br>「遲啲畀」係幾遲畀' },
  // 旅行毒雞湯系列
  { greeting: '✈️ 旅行真相', message: '旅行就係由一個你厭倦嘅地方<br>去另一個你都會厭倦嘅地方' },
  { greeting: '📸 打卡哲學', message: '影相5分鐘<br>P圖2小時' },
  { greeting: '🧳 執行李', message: '帶咗一堆唔著嘅衫<br>冇帶最重要嗰件' },
  { greeting: '🍜 旅行飲食', message: '喺屋企諗住食當地美食<br>去到發現最懷念係公仔麵' },
  { greeting: '💸 旅行預算', message: '出發前話要慳錢<br>回來後發現信用卡爆數' },
  { greeting: '🗺️ 迷路體驗', message: '導航話前方右轉<br>我見到嘅係死路' },
  { greeting: '😴 時差困擾', message: '當地時間下午3點<br>我嘅身體認為係凌晨3點' },
  { greeting: '🛍️ 手信陷阱', message: '講好只買少少<br>結果行李箱都塞唔落' },
  { greeting: '🌤️ 天氣預測', message: '天氣預報話晴天<br>我帶咗傘就落雨' },
  { greeting: '📱 網絡依賴', message: '冇WiFi嘅旅行<br>等於與世隔絕' },
  { greeting: '🚶 步行裏程', message: '旅行一日行咗2萬步<br>回家躺咗三日' },
  { greeting: '🎭 遊客模式', message: '平時返工懶到死<br>旅行早起比雞早' },
  { greeting: '💭 旅行意義', message: '旅行就係花錢買罪受<br>但下次仲會去' }
];

// 簡體中文映射表 (常用詞彙轉換)
const traditionalToSimplified = {
  '象寶': '象宝',
  '嘢': '东西',
  '嘅': '的',
  '佢': '他',
  '哋': '们',
  '喺': '在',
  '唔': '不',
  '係': '是',
  '嘞': '了',
  '晒': '了',
  '畀': '给',
  '俾': '给',
  '睇': '看',
  '諗': '想',
  '傾': '聊',
  '計': '计',
  '夠': '够',
  '鍾意': '喜欢',
  '佢地': '他们',
  '我地': '我们',
  '你地': '你们',
  '邊個': '谁',
  '幾多': '多少',
  '幾時': '何时',
  '點解': '为什么',
  '做咩': '做什么',
  '搞掂': '搞定',
  '著數': '划算',
  '蝕底': '亏本',
  '孤寒': '吝啬',
  '小氣': '小气',
  'Mon緊': '盯着',
  'check': '检查',
  'mark': '标记',
  'message': '消息',
  'update': '更新',
  'Loading': '加载中',
  'OK': '好的',
  'AA制': 'AA制'
};

// 英文翻譯映射
const englishTranslations = [
  { greeting: '🐘 Jumbo Says', message: 'Favors are favors<br>Jumbo keeps them clear!' },
  { greeting: '💭 Jumbo Reminds', message: 'No need to pretend forget<br>Jumbo remembers everything.' },
  { greeting: '💰 Split Expert', message: 'Play and pay<br>Jumbo checks who hasn\'t paid!' },
  { greeting: '🧾 Receipt Manager', message: 'Receipts longer than itinerary?<br>Give them to Jumbo!' },
  { greeting: '📈 Rate Monitor', message: 'Exchange rate rises faster than your food delivery...' },
  { greeting: '⏰ Patient Wait', message: 'No rush<br>Jumbo is watching it for you' },
  { greeting: '🍽️ Meal Split', message: 'Eating is easy<br>Splitting bills is hard.' },
  { greeting: '💱 Rate Update', message: 'Rate updating...<br>Check if it\'s good to exchange.' },
  { greeting: '🔋 Charging Time', message: 'I track your expenses<br>You charge my battery ok?' },
  { greeting: '😤 Petty Book', message: 'Ah Ming hasn\'t paid?<br>Petty Jumbo marks it in the petty book' },
  { greeting: '🧠 Memory Power', message: 'Jumbo remembers numbers<br>People remember grudges.' },
  { greeting: '💡 Accounting Philosophy', message: 'Tracking doesn\'t mean stingy<br>It means you have brains.' },
  { greeting: '📉 Stop Loss Alert', message: 'If rates keep dropping<br>Even I want to help you stop loss.' },
  { greeting: '👀 Crystal Clear', message: 'How wild you play<br>Is how clear Jumbo sees!' },
  { greeting: '😴 Loading', message: 'Actually Jumbo likes to chill too.' },
  { greeting: '⚠️ Important Reminder', message: 'Everything can chill<br>But not accounts.' },
  { greeting: '💸 Money Matters', message: 'Money isn\'t the problem<br>Splitting bills is.' },
  { greeting: '📒 Ledger Expert', message: 'Jumbo handles your ledger' },
  { greeting: '🤝 Brotherhood', message: 'Bills unsettled<br>Don\'t talk about brotherhood' },
  { greeting: '⚡ Maturity Sign', message: 'Paying faster than replying messages<br>That\'s called maturity.' },
  { greeting: '💔 Relationship Metaphor', message: 'Exchange rates fluctuate like relationships...' },
  { greeting: '⚖️ AA Philosophy', message: 'AA doesn\'t mean fair<br>But at least Jumbo is fair' },
  { greeting: '🔮 Future Prediction', message: 'The messiest accounts Jumbo has seen are more chaotic than tangled love lines' },
  { greeting: '⏳ Time Question', message: 'Jumbo also wants to know<br>When exactly is "pay later"' },
  // 旅行毒雞湯系列
  { greeting: '✈️ Travel Truth', message: 'Travel is going from a place you\'re tired of<br>to another place you\'ll also be tired of' },
  { greeting: '📸 Photo Philosophy', message: '5 minutes taking photos<br>2 hours editing' },
  { greeting: '🧳 Packing Luggage', message: 'Packed a bunch of clothes I won\'t wear<br>Forgot the most important one' },
  { greeting: '🍜 Travel Food', message: 'At home dreaming of local cuisine<br>Arrive and miss instant noodles the most' },
  { greeting: '💸 Travel Budget', message: 'Said I\'d save money before leaving<br>Came back to find my credit card maxed out' },
  { greeting: '🗺️ Getting Lost', message: 'GPS says turn right ahead<br>All I see is a dead end' },
  { greeting: '😴 Jet Lag Struggle', message: 'Local time is 3 PM<br>My body thinks it\'s 3 AM' },
  { greeting: '🛍️ Souvenir Trap', message: 'Promised to buy just a little<br>Now my suitcase won\'t close' },
  { greeting: '🌤️ Weather Forecast', message: 'Forecast said sunny<br>I brought an umbrella and it rained' },
  { greeting: '📱 WiFi Dependency', message: 'Travel without WiFi<br>Equals total isolation' },
  { greeting: '🚶 Walking Distance', message: 'Walked 20,000 steps in one day<br>Lay in bed for three days after' },
  { greeting: '🎭 Tourist Mode', message: 'Lazy as hell at work normally<br>Wake up earlier than chickens when traveling' },
  { greeting: '💭 Travel Meaning', message: 'Travel is paying to suffer<br>But I\'ll still go next time' }
];

// 日文翻譯映射
const japaneseTranslations = [
  { greeting: '🐘 ジャンボの一言', message: '借りは借り<br>ジャンボはハッキリしてる！' },
  { greeting: '💭 ジャンボの提醒', message: '忘れたふりしなくていいよ<br>ジャンボが全部覚えてるから。' },
  { greeting: '💰 割り勘の達人', message: '遊ぶなら払って<br>ジャンボが誰が未払いかチェックするよ！' },
  { greeting: '🧾 レシート管理', message: 'レシートが旅程より長い？<br>ジャンボに任せて！' },
  { greeting: '📈 為替レート監視', message: '為替レートが外卖より早く上がる...' },
  { greeting: '⏰ 辛抱強く待って', message: '焦らないで<br>ジャンボが見張ってるから' },
  { greeting: '🍽️ 食事の割り勘', message: '食べるのは簡単<br>割り勘は難しい。' },
  { greeting: '💱 レート更新中', message: 'レート更新中...<br>交換に適しているか確認して。' },
  { greeting: '🔋 チャージ時間', message: '私が会計を記録するから<br>あなたは私のバッテリーを充電してねok？' },
  { greeting: '😤 ケチ帳', message: '牙明がまだ払ってない？<br>ケチジャンボがケチ帳にマークするよ' },
  { greeting: '🧠 記憶力', message: 'ジャンボは数字を覚えてる<br>人は恨みを覚えてる。' },
  { greeting: '💡 記帳の哲学', message: '記帳してもケチじゃない<br>頭があるってこと。' },
  { greeting: '📉 損切り提醒', message: 'レートがこれ以上下がったら<br>私も損切りを手伝いたい。' },
  { greeting: '👀 クリアに見通す', message: 'あなたがどれだけ遊んでも<br>ジャンボはそれだけハッキリ見える！' },
  { greeting: '😴 ロード中', message: '実はジャンボもダラダラするのが好き。' },
  { greeting: '⚠️ 重要なお知らせ', message: '何でもダラダラできるけど<br>会計はダメ。' },
  { greeting: '💸 お金の問題', message: 'お金は問題じゃない<br>割り勘が問題。' },
  { greeting: '📒 帳簿の達人', message: 'ジャンボがあなたの帳簿をつける' },
  { greeting: '🤝 兄弟の絆', message: '清算が終わるまで<br>兄弟愛の話はなし' },
  { greeting: '⚡ 成熟の証', message: 'メッセージを返すより早く払う<br>それが成熟。' },
  { greeting: '💔 恋愛の比喩', message: '為替レートは恋愛のように浮き沈み...' },
  { greeting: '⚖️ AA制の哲学', message: 'AA制が公平とは限らない<br>でも少なくともジャンボは公平' },
  { greeting: '🔮 未来予知', message: 'ジャンボが見た中で一番乱れた会計は<br>絡まり合った恋愛模様よりカオス' },
  { greeting: '⏳ 時間の問題', message: 'ジャンボも知りたい<br>「後で払う」はいつ払うの' },
  // 旅行毒雞湯系列
  { greeting: '✈️ 旅行の真実', message: '旅行とは飽きた場所から<br>また別の飽きる場所へ移動すること' },
  { greeting: '📸 写真哲学', message: '撮影5分<br>加工2時間' },
  { greeting: '🧳 荷造り', message: '着ない服ばかり持ってきて<br>一番大切なものを忘れた' },
  { greeting: '🍜 旅行の食事', message: '家では現地の美食を夢見て<br>着いたら一番恋しいのはカップ麺' },
  { greeting: '💸 旅行予算', message: '出発前は節約すると言って<br>帰ったらクレジットカードが限界' },
  { greeting: '🗺️ 道に迷う体験', message: 'ナビが前方右折と言う<br>目にするのは行き止まり' },
  { greeting: '😴 時差ボケの悩み', message: '現地時間は午後3時<br>私の体は凌晨3時だと思ってる' },
  { greeting: '🛍️ お土産の罠', message: 'ちょっとだけ買うと言ったのに<br>結果スーツケースが閉まらない' },
  { greeting: '🌤️ 天気予報', message: '予報は晴天<br>傘を持ったら雨が降る' },
  { greeting: '📱 WiFi依存', message: 'WiFiのない旅行は<br>世の中から隔離されたも同然' },
  { greeting: '🚶 歩行距離', message: '旅行で一日2万歩歩いて<br>帰宅後3日間寝込んだ' },
  { greeting: '🎭 ツーリストモード', message: '普段の仕事は死ぬほど怠け者なのに<br>旅行中は鶏より早起き' },
  { greeting: '💭 旅行の意味', message: '旅行とは金を出して苦しみを買うこと<br>でも次もまた行く' }
];

// 韓文 번역 매핑
const koreanTranslations = [
  { greeting: '🐘 점보의 한마디', message: '빚은 빚이다<br>점보는 분명하게 구분해!' },
  { greeting: '💭 점보의 알림', message: '잊은 척하지 않아도 돼<br>점보가 다 기억하고 있어.' },
  { greeting: '💰 더치페이 전문가', message: '놀았으면 내야지<br>점보가 누가 안 냈는지 체크할게!' },
  { greeting: '🧾 영수증 관리', message: '영수증이 일정표보다 길어？<br>점보에게 맡겨!' },
  { greeting: '📈 환율 모니터링', message: '환율이 배달음식 시키는 것보다 빨리 오르네...' },
  { greeting: '⏰ 인내심 있게 기다림', message: '급하지 않아<br>점보가 지켜보고 있으니까' },
  { greeting: '🍽️ 식사 더치페이', message: '먹기는 쉬운데<br>더치페이는 어려워.' },
  { greeting: '💱 환율 업데이트', message: '환율 업데이트 중...<br>교환하기 좋은지 확인해봐.' },
  { greeting: '🔋 충전 시간', message: '내가 네 지출을 기록해줄게<br>너는 내 배터리를 충전시켜줘 ok?' },
  { greeting: '😤 짠돌이 장부', message: '아명이 아직 안 냈어？<br>짠돌이 점보가 짠돌이 장부에 마크할게' },
  { greeting: '🧠 기억력', message: '점보는 숫자를 기억해<br>사람은 원한을 기억해.' },
  { greeting: '💡记账 철학', message: '기록한다고 구두쇠인 게 아니야<br>머리가 있다는 거지.' },
  { greeting: '📉 손절매 알림', message: '환율이 더 떨어지면<br>나도 손절매를 도와주고 싶어.' },
  { greeting: '👀 선명하게 파악', message: '네가 얼마나 신나게 놀든<br>점보는 그만큼 선명하게 봐!' },
  { greeting: '😴 로딩 중', message: '사실 점보도 늘어지는 걸 좋아해.' },
  { greeting: '⚠️ 중요 알림', message: '뭐든 늘어질 수 있지만<br>계산은 안 돼.' },
  { greeting: '💸 돈 문제', message: '돈은 문제가 아니야<br>더치페이가 문제지.' },
  { greeting: '📒 장부 전문가', message: '점보가 네 장부를 정리해줄게' },
  { greeting: '🤝 의리', message: '정산이 끝날 때까지<br>의리 이야기는 하지 마' },
  { greeting: '⚡ 성숙의 증거', message: '답장보다 빠르게 계산하는 것<br>그게 성숙이야.' },
  { greeting: '💔 연애 비유', message: '환율은 연애처럼 오르내려...' },
  { greeting: '⚖️ 더치페이 철학', message: '더치페이가 공평한 건 아니지만<br>적어도 점보는 공평해' },
  { greeting: '🔮 미래 예측', message: '점보가 본 가장 엉망인 계산은<br>꼬인 연애사보다 더 카오스야' },
  { greeting: '⏳ 시간 문제', message: '점보도 궁금해<br>「나중에 낼게」가 언제인지' },
  // 旅行毒雞湯系列
  { greeting: '✈️ 여행의 진실', message: '여행이란 지친 곳에서<br>또 다른 지칠 곳으로 이동하는 것' },
  { greeting: '📸 사진 철학', message: '사진 촬영 5분<br>보정 2시간' },
  { greeting: '🧳 짐 싸기', message: '입지 않을 옷만 잔뜩 가져오고<br>제일 중요한 건 잊어버림' },
  { greeting: '🍜 여행 음식', message: '집에서는 현지 음식을 꿈꾸다가<br>막상 가면 라면이 가장 그리워짐' },
  { greeting: '💸 여행 예산', message: '출발 전엔 아끼겠다고 하더니<br>돌아와선 카드 한도 초과' },
  { greeting: '🗺️ 길 잃기 체험', message: '내비게이션은 앞쪽 우회전이라고 하는데<br>눈에 보이는 건 막다른 길' },
  { greeting: '😴 시차 고민', message: '현지 시간은 오후 3시<br>내 몸은 새벽 3시라고 생각함' },
  { greeting: '🛍️ 기념품 함정', message: '조금만 사겠다고 해놓고<br>결국 여행 가방이 닫히지 않음' },
  { greeting: '🌤️ 날씨 예보', message: '예보는 맑음<br>우산 챙기니 비 옴' },
  { greeting: '📱 WiFi 의존', message: 'WiFi 없는 여행은<br>세상과 단절된 것과 같음' },
  { greeting: '🚶 걷기 거리', message: '여행 하루에 2만 걸음 걷고<br>집에 와서 3일간 누워있음' },
  { greeting: '🎭 관광객 모드', message: '평소 출근할 땐 게으르기 짝이 없는데<br>여행 중엔 닭보다 일찍 일어남' },
  { greeting: '💭 여행의 의미', message: '여행이란 돈 내고 고생 사는 것<br>그래도 다음에도 또 감' }
];

// 繁體轉簡體函數
function traditionalToSimplifiedText(text) {
  let result = text;
  for (const [trad, simp] of Object.entries(traditionalToSimplified)) {
    result = result.replace(new RegExp(trad, 'g'), simp);
  }
  return result;
}

// 生成簡體中文翻譯
console.log('// 簡體中文翻譯\n');
cantoneseMessages.forEach((msg, index) => {
  const simpGreeting = traditionalToSimplifiedText(msg.greeting);
  const simpMessage = traditionalToSimplifiedText(msg.message);
  console.log(`    'jumbo.msg.${index}.greeting': '${simpGreeting}',`);
  console.log(`    'jumbo.msg.${index}.message': '${simpMessage}',`);
});

console.log('\n\n// 英文翻譯\n');
englishTranslations.forEach((msg, index) => {
  console.log(`    'jumbo.msg.${index}.greeting': '${msg.greeting}',`);
  console.log(`    'jumbo.msg.${index}.message': '${msg.message.replace(/'/g, "\\'")}',`);
});

console.log('\n\n// 日文翻譯\n');
japaneseTranslations.forEach((msg, index) => {
  console.log(`    'jumbo.msg.${index}.greeting': '${msg.greeting}',`);
  console.log(`    'jumbo.msg.${index}.message': '${msg.message.replace(/'/g, "\\'")}',`);
});

console.log('\n\n// 韓文翻譯\n');
koreanTranslations.forEach((msg, index) => {
  console.log(`    'jumbo.msg.${index}.greeting': '${msg.greeting}',`);
  console.log(`    'jumbo.msg.${index}.message': '${msg.message.replace(/'/g, "\\'")}',`);
});
