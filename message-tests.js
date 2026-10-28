const fs=require('fs'),vm=require('vm'),assert=require('assert');
const c=vm.createContext({});c.window=c;
for(const file of ['flowers.js','scoring.js','messages.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),c);
vm.runInContext('function flowerName(f){return f.color?`${f.color}の${f.name}`:f.name}',c);
const scenarios=[['gift',[1,3,3,0,2,0,3,0,3,4]],['self',[5,3,1,2,2,4,2,0,4,3]]];
for(const [mode,a] of scenarios){
 c.mode=mode;c.answers=a;
 const r=vm.runInContext('rankFlowers(mode,answers)',c);
 c.flower=r.main;
 const text=vm.runInContext('resultCopy(flower,mode,answers,true)',c);
 assert(text.title&&text.body&&text.message);
 assert(text.body.includes(r.main.meaning));
 assert(mode==='self'?text.message.includes('自分'):text.message.includes('ありがとう'));
 console.log(mode,`${r.main.color}の${r.main.name}`,text.title,'\n',text.body,'\n',text.message);
}
console.log('結果文テストOK');
