// 結果文章は花言葉の原文を変更せず、回答に応じて生成します。
const TYPE_COPY = [
  {keys:['癒し','穏やか','心安らぐ','温もり','健やか'],title:'そっと寄り添う、ぬくもりタイプ',wish:'心がほっとする時間を大切にしたい'},
  {keys:['感謝','ありがとう','献身'],title:'ありがとうを届ける、まごころタイプ',wish:'日頃の感謝を丁寧に伝えたい'},
  {keys:['希望','夢','未来','芽吹き','成功','一歩'],title:'未来を照らす、きらめきタイプ',wish:'これからの可能性を信じて応援したい'},
  {keys:['絆','信頼','友情','永遠'],title:'つながりを育む、きずなタイプ',wish:'大切なつながりを長く育んでいきたい'},
  {keys:['尊敬','誇り','気品','高潔'],title:'憧れを力に変える、凛としたタイプ',wish:'相手の素晴らしさを認め、敬意を伝えたい'},
  {keys:['愛','情熱','恋','一途'],title:'想いをまっすぐ届ける、愛情タイプ',wish:'かけがえのない存在への想いを伝えたい'},
  {keys:['門出','新しい','自由'],title:'新しい風を呼ぶ、はじまりタイプ',wish:'新しい一歩を明るい気持ちで迎えたい'},
  {keys:['幸福','幸せ','喜び','祝福','幸運'],title:'幸せを分かち合う、ほほえみタイプ',wish:'小さな喜びを重ねていきたい'},
  {keys:['記憶','思い出'],title:'思い出を抱きしめる、たいせつタイプ',wish:'かけがえのない時間を大切にしたい'}
];
const QUESTION_HINTS = {
 gift: {
  4:['夢に向かう姿を応援したい','毎日を幸せに過ごしてほしい','心の疲れをそっと癒してあげたい','新しい一歩を後押ししたい','大切な思い出を残したい'],
  7:['そっと隣で支えていたい','笑顔になれる時間を増やしたい','その人の頑張りを認めたい','一緒に新しい楽しみを見つけたい','変わらず味方でいたい']
 },
 self: {
  4:['自分の夢を叶えたい','毎日をもっと幸せに過ごしたい','心の疲れを癒したい','新しい一歩を踏み出したい','忘れられない経験をしたい'],
  7:['自分に休む時間をあげたい','気持ちを切り替えて楽しみたい','頑張った自分を認めたい','新しい楽しみを見つけたい','大切な人とのつながりを感じたい']
 }
};
function copyType(f){
 const meaning=f.meaning||'';
 return TYPE_COPY.find(t=>t.keys.some(k=>meaning.includes(k)))||{title:'想いを大切にする、花ひらくタイプ',wish:'自分らしい想いを大切にしたい'};
}
function resultCopy(f,mode,answers,isMain){
 const type=copyType(f);
 const selected=(QUESTION_HINTS[mode]||QUESTION_HINTS.gift);
 const primary=selected[4][answers[4]];
 const secondary=selected[7][answers[7]];
 const firstMeaning=(f.meaning||'幸せ').split('・')[0];
 const intro=mode==='self'?'あなたが今、大切にしているのは':'あなたが大切な人に届けたいのは';
 const body=isMain
   ?`${intro}、「${primary}」という気持ち。さらに「${secondary}」という回答からも、あなたらしい優しさが伝わってきます。${flowerName(f)}の花言葉「${f.meaning}」は、そんな想いに寄り添う一輪です。`
   :`「${type.wish}」という想いに寄り添う、もうひとつの候補。花言葉は「${f.meaning}」です。`;
 const message=mode==='self'
  ?`今日の自分へ。${firstMeaning}を大切に、私らしく歩んでいこう。`
  :`いつもありがとう。あなたの毎日に、${firstMeaning}が咲きますように。`;
 return {title:type.title,body,message};
}
