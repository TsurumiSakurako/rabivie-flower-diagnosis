const $=s=>document.querySelector(s);
const questionSets={
gift:[
['今回のお花は、誰のために選びますか？',['恋人・パートナー','友人・親友','家族・両親','憧れや尊敬する人','その他の大切な人','自分自身']],
['その人を思い浮かべると、どんな気持ちになる？',['心が温かくなる','自然と笑顔になれる','ドキドキする','安心して落ち着く','もっと頑張ろうと思える']],
['その人との関係を一言で表すなら？',['深く想い合う関係','何でも話せる信頼関係','ずっと変わらない絆','お互いに成長できる関係','そっと支え合う関係']],
['その人のどんなところが一番素敵だと思う？',['優しくて思いやりがある','夢に向かって頑張っている','明るく周りを幸せにする','芯が強くて尊敬できる','自分らしく自由に生きている']],
['もしその人に魔法をかけられるなら？',['夢を叶えてあげたい','ずっと幸せでいてほしい','心の疲れを癒してあげたい','新しい一歩を後押ししたい','大切な思い出を残してあげたい']],
['その人と過ごす時間で、一番幸せなのは？',['何気ない日常を一緒に過ごすとき','新しいことに挑戦するとき','心から笑い合えるとき','お互いの気持ちを確かめ合うとき','静かに寄り添っているとき']],
['その人との間で、一番大切にしたいことは？',['気持ちを素直に伝え合うこと','お互いを信じること','思いやりを忘れないこと','一緒に成長すること','お互いの自由を尊重すること']],
['その人が落ち込んでいたら、どうしてあげたい？',['そっと隣にいてあげたい','明るい話で笑顔にしたい','頑張りを認めてあげたい','新しい楽しみを一緒に探したい','変わらず味方でいると伝えたい']],
['10年後、その人とどんな関係でいたい？',['変わらず大切に想い合っていたい','何でも話せる関係でいたい','お互いを尊敬し合っていたい','一緒に夢を叶えていたい','穏やかに寄り添っていたい']],
['もし、その人に小さな贈り物を添えるなら？',['心のこもった手紙','一緒に撮った思い出の写真','これから使える新しいアイテム','ほっと一息つけるもの','相手の好きなものを詰め合わせたもの']]
],self:[
null,
['最近のあなたが、一番求めている気持ちは？',['心が温まるような安心感','自然と笑顔になれる楽しさ','新しいことへのワクワク','穏やかで落ち着く時間','前に進むための勇気']],
['今の自分を一言で表すなら？',['好きなことにまっすぐ','自分のペースを大切にする','新しいことに挑戦している','周りの人を大切にする','少しずつ自信をつけている']],
['自分のどんなところを大切にしたい？',['人に優しくできるところ','目標に向かって努力できるところ','小さな幸せを見つけられるところ','自分の考えを持っているところ','好奇心のままに行動できるところ']],
['もし自分に魔法をかけられるなら？',['ずっと温めていた夢を叶えたい','毎日をもっと幸せに過ごしたい','心の疲れを癒したい','新しい一歩を踏み出したい','忘れられない経験をしてみたい']],
['自分らしくいられるのは、どんな時間？',['のんびり好きなことを楽しむ時間','新しいことに挑戦する時間','大切な人と笑い合う時間','目標に向かって集中する時間','静かに自分と向き合う時間']],
['これからの毎日で、一番大切にしたいことは？',['自分の気持ちに素直でいること','自分を信じて進むこと','小さな幸せに気づくこと','昨日より少し成長すること','自分らしい生き方を楽しむこと']],
['少し落ち込んだとき、どう過ごしたい？',['静かにゆっくり休みたい','楽しいことをして気分転換したい','頑張った自分を褒めたい','新しい楽しみを見つけたい','大切な人とのつながりを感じたい']],
['10年後、どんな自分になっていたい？',['大切な人と笑顔で過ごしていたい','自分らしく自由に生きていたい','自信を持って前に進んでいたい','夢や目標を叶えていたい','穏やかで満たされた毎日を送りたい']],
['もし今日、自分に小さなご褒美をあげるなら？',['自分に向けた小さな手紙','思い出を残せるもの','新しいことを始めるアイテム','ゆっくり癒される時間','ずっと欲しかったお気に入りのもの']]
]};
let screen='start',step=0,mode='gift',answers=Array(10).fill(null),result=null;
function qAt(i){return i===0?questionSets.gift[0]:questionSets[mode][i]}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function flowerName(f){return f.color?`${f.color}の${f.name}`:f.name}
function explanation(f){
  const mainTags=f.matched.slice(0,2);
  if(!mainTags.length) return `あなたの回答に込められた想いに、${flowerName(f)}の花言葉が寄り添います。`;
  return `あなたの回答からは「${mainTags.join('・')}」を大切にする気持ちが伝わってきました。そんな想いに重なる花言葉を持つのが、${flowerName(f)}です。`;
}
const config=window.RABIVIE_CONFIG;
function productUrl(f){return config.singleFlowerUrls[f.name] || config.fallbackShopUrl}
function hasDirectProduct(f){return Boolean(config.singleFlowerUrls[f.name])}
const orderUrl=config.fullOrderUrl;
function flowerImage(f){return config.colorImages[`${f.name}|${f.color}`] || config.flowerImages[f.name] || ''}
function imageOrPlaceholder(src,cls,alt,placeholder='✿'){
 return src ? `<img class="${cls}" src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="image-fallback ${cls}-fallback" style="display:none" aria-hidden="true">✿</div>` : `<div class="image-fallback ${cls}-fallback" aria-label="${escapeHTML(alt)}">${placeholder}</div>`;
}
function productLinkText(f){return hasDirectProduct(f)?'シングルフラワーを見る　›':'シングルフラワー一覧を見る　›'}
function shopNote(f){return f.color?`商品ページで「${escapeHTML(f.color)}」を選択してください。`:''}
const optionIcons=['♡','✿','✧','❀','☘','☼'];
function render(){
 const app=$('#app');
 if(screen==='start'){
  app.innerHTML=`<div class="panel hero">${config.logo?`<img class="hero-logo" src="${escapeHTML(config.logo)}" alt="RabiVie ロゴ">`: '<div class="hero-ornament">✿ — ♡ — ✿</div>'}<div class="eyebrow">A FLOWER FOR YOUR FEELINGS</div><h1>言葉にできない想いを、<br><em>花言葉に。</em></h1><div class="hero-illustration">${imageOrPlaceholder(config.heroImage,"hero-photo","RabiVie 花言葉診断のメイン画像","❀ ✿ ❁")}</div><p>大切な人にも、自分自身にも。<br>10の質問を通して、あなたの想いに<br>ぴったりの一輪を見つけましょう。</p><div class="hero-tags"><span>♡ 想いを込めて</span><span>✿ あなただけの花言葉</span><span>約3〜5分</span></div><button class="button" id="start">花言葉診断をはじめる　›</button><p class="meta">自分へのご褒美や、大切な人への贈り物にも ♡</p></div>`;
  $('#start').onclick=()=>{screen='quiz';render()};return;
 }
 if(screen==='quiz'){
  const [question,opts]=qAt(step);
  app.innerHTML=`<div class="panel quiz-panel"><div class="counter"><span>QUESTION ${String(step+1).padStart(2,'0')}</span><span>${step+1} / 10</span></div><div class="progress"><div style="width:${(step+1)*10}%"></div></div><div class="question-ornament">✿ — ♡ — ✿</div><h2 class="question">${escapeHTML(question)}</h2><p class="hint">心にいちばん近いものを選んでください</p><div class="options">${opts.map((v,i)=>`<button class="option ${answers[step]===i?'selected':''}" data-i="${i}" aria-pressed="${answers[step]===i}"><span class="option-check">${answers[step]===i?'✓':''}</span><span class="option-icon" aria-hidden="true">${optionIcons[i%optionIcons.length]}</span><span class="option-text">${escapeHTML(v)}</span></button>`).join('')}</div><div class="actions"><button class="button secondary" id="back" ${step===0?'disabled':''}>‹ 戻る</button><button class="button" id="next" ${answers[step]===null?'disabled':''}>${step===9?'診断結果を見る　›':'次へ　›'}</button></div></div>`;
  document.querySelectorAll('.option').forEach(el=>el.onclick=()=>{
    const selected=Number(el.dataset.i);
    if(step===0){const nextMode=selected===5?'self':'gift';if(mode!==nextMode){answers=Array(10).fill(null);mode=nextMode}}
    answers[step]=selected;render();
  });
  $('#back').onclick=()=>{if(step>0){step--;render()}};
  $('#next').onclick=()=>{if(step===9){result=rankFlowers(mode,answers);screen='result';render()}else{step++;render()}};
  return;
 }
 const f=result.main;
 const mainCopy=resultCopy(f,mode,answers,true);
 const otherCards=result.others.map((item,i)=>`<article class="recommend-card"><div class="recommend-label">${i+2}　OTHER FLOWER 0${i+1}</div><div class="mini-flower">${imageOrPlaceholder(flowerImage(item),"recommend-photo",`${flowerName(item)}の商品画像`)}</div><h3>${escapeHTML(flowerName(item))}</h3><p class="mini-meaning">花言葉「${escapeHTML(item.meaning)}」</p><p>${escapeHTML(resultCopy(item,mode,answers,false).body)}</p><a class="mini-link" href="${escapeHTML(productUrl(item))}" target="_blank" rel="noopener noreferrer">${productLinkText(item)}</a><small>${shopNote(item)}</small></article>`).join('');
 app.innerHTML=`<div class="results"><div class="result-heading"><div class="eyebrow">YOUR FLOWER LANGUAGE</div><h1>診断結果 ✿</h1><p>あなたの想いにぴったりの一輪が見つかりました ♡</p></div><section class="panel result"><div class="eyebrow">♡ あなたにぴったりの一輪 ♡</div><div class="result-flower-art">${imageOrPlaceholder(flowerImage(f),"result-photo",`${flowerName(f)}の商品画像`)}</div><p class="type-caption">YOUR FLOWER TYPE</p><p class="type-name">${escapeHTML(mainCopy.title)}</p><h2 class="name">${escapeHTML(flowerName(f))}</h2><div class="meaning">花言葉<br><strong>「${escapeHTML(f.meaning)}」</strong></div><div class="result-text"><h3>♡ このお花が選ばれた理由</h3><p class="reason">${escapeHTML(mainCopy.body)}</p></div><div class="message"><strong>✉ このお花に込めたいメッセージ</strong><p>「${escapeHTML(mainCopy.message)}」</p></div></section><section class="panel purchase"><div class="eyebrow">MAKE YOUR FLOWER A GIFT</div><h2>この想いを、お花に込めて ♡</h2><p class="meta">診断されたお花を、お好きな形で楽しめます。</p><div class="purchase-choice"><h3>✿ 一輪のお花として楽しむ</h3><p>花言葉をそのまま贈りたい方に。診断されたカラーを商品ページで選んでください。</p><a class="button" href="${escapeHTML(productUrl(f))}" target="_blank" rel="noopener noreferrer">${productLinkText(f)}</a><small>${shopNote(f)}</small></div><div class="purchase-choice"><h3>♡ ブーケやアレンジにする</h3><p>このお花を取り入れたブーケやアレンジを、フルオーダーでご相談いただけます。</p><a class="button secondary outline" href="${orderUrl}" target="_blank" rel="noopener noreferrer">フルオーダーについて詳しく見る　›</a></div></section><section class="recommend"><h2>こちらの花言葉もおすすめ ♡</h2><p class="meta">あなたの想いに近い、もう2つのお花</p><div class="recommend-grid">${otherCards}</div></section><div class="bottom-actions"><button class="button secondary" id="again">↶ もう一度診断する</button></div><p class="meta result-note">※画像・商品URLは設定状況に応じて表示されます。個別商品ページが未登録のお花は一覧へ移動します。季節のお花は販売確認まで診断対象外です。</p></div>`;
 $('#again').onclick=()=>{screen='start';step=0;mode='gift';answers=Array(10).fill(null);render()};
}
render();
