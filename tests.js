// node tests.js で診断ロジックを検証できます。
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx=vm.createContext({console,Date});ctx.window=ctx;
for(const file of ['flowers.js','scoring.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),ctx);
const rank=(mode,answers)=>vm.runInContext(`rankFlowers(${JSON.stringify(mode)},${JSON.stringify(answers)})`,ctx);
const samples=[
 ['親友に癒しを贈りたい','gift',[1,3,3,0,2,0,3,0,3,4]],
 ['恋人への愛情','gift',[0,2,0,0,1,3,0,4,0,0]],
 ['親友に感謝','gift',[1,0,1,0,1,2,2,4,1,0]],
 ['自分に新しい一歩','self',[5,4,2,4,3,1,3,3,2,2]],
 ['自分を癒したい','self',[5,3,1,2,2,4,2,0,4,3]],
 ['尊敬する人を応援','gift',[3,4,3,3,0,1,3,2,2,2]],
];
assert.strictEqual(vm.runInContext('FLOWERS.length',ctx),72);
for(const [name,mode,answers] of samples){
 const result=rank(mode,answers);
 assert(result.main && result.others.length===2);
 assert(new Set([result.main.index,...result.others.map(x=>x.index)]).size===3);
 for(const f of [result.main,...result.others])assert(!['嫉妬','望みのない愛','失われた愛','私を忘れてください','別れの春','気まぐれ'].some(w=>f.meaning.split('・').includes(w)));
 console.log(name,'=>',[result.main,...result.others].map(f=>`${f.color||''}${f.name}(${f.score.toFixed(1)})`).join(' / '));
}
const healing=rank('gift',samples[0][2]);
assert.strictEqual(healing.main.name,'カーネーション');
assert.strictEqual(healing.main.color,'グリーン');
console.log('検証OK：72件・6シナリオ・安全フィルタ・癒しの既知ケース');
// 再現性・結果の重複・安全性・入力の検証
for(const [name,mode,answers] of samples){
 const a=rank(mode,answers),b=rank(mode,answers);
 assert.strictEqual(a.main.index,b.main.index,`${name}: 同じ回答で結果が変わった`);
 assert.strictEqual(a.others.length,2);
}
for(let n=0;n<1000;n++){
 const mode=n%2?'self':'gift';
 const answers=[mode==='self'?5:n%5,...Array.from({length:9},(_,i)=>(n*7+i*11+Math.floor(n/7))%5)];
 const r=rank(mode,answers);
 assert(r.main&&r.others.length===2);
 assert.strictEqual(new Set([r.main.index,...r.others.map(x=>x.index)]).size,3);
 for(const f of [r.main,...r.others])assert(!['嫉妬','望みのない愛','失われた愛','私を忘れてください','別れの春','気まぐれ'].some(w=>f.meaning.split('・').includes(w)));
}
console.log('追加検証OK：1000パターン・重複防止・再現性・不適切な花言葉の除外');
