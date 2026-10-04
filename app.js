/* ============================== DATA ============================== */
const KINDS = {
  spirit:  {label:'Spirits',             color:'var(--tang)',  shape:'tall',   bottle:true, store:'Liquor store'},
  liqueur: {label:'Liqueurs & cordials', color:'var(--coral)', shape:'round',  bottle:true, store:'Liquor store'},
  wine:    {label:'Vermouth & wine',     color:'var(--lilac)', shape:'wine',   bottle:true, store:'Liquor store', perish:42},
  bitters: {label:'Bitters',             color:'var(--yolk)',  shape:'dasher', bottle:true, store:'Liquor store'},
  fresh:   {label:'Fresh',               color:'var(--mint)',  pantry:true, store:'Grocery'},
  mixer:   {label:'Mixers & juice',      color:'var(--mint)',  pantry:true, store:'Grocery'},
  syrup:   {label:'Syrups & cordials',   color:'var(--yolk)',  pantry:true, store:'Grocery'},
  kitchen: {label:'Kitchen odds & ends', color:'var(--lilac)', pantry:true, store:'Grocery'},
};
const BOTTLE_KINDS = ['spirit','liqueur','wine','bitters'];
const PANTRY_KINDS = ['fresh','mixer','syrup','kitchen'];

const ING = {};
[
 ['gin','Gin','spirit'],['vodka','Vodka','spirit'],['bourbon','Bourbon','spirit'],['rye','Rye whiskey','spirit'],
 ['scotch','Blended Scotch','spirit'],['islay','Islay Scotch (peaty)','spirit'],['irish','Irish whiskey','spirit'],
 ['white-rum','White rum','spirit'],['aged-rum','Aged / gold rum','spirit'],['dark-rum','Dark rum','spirit'],['agricole','Rhum agricole','spirit'],
 ['tequila','Tequila','spirit'],['mezcal','Mezcal','spirit'],['cognac','Cognac / brandy','spirit'],
 ['apple-brandy','Apple brandy / Calvados','spirit'],['pisco','Pisco','spirit'],['cachaca','Cachaça','spirit'],['grappa','Grappa','spirit'],['absinthe','Absinthe','spirit'],
 ['triple-sec','Orange liqueur (Cointreau, triple sec)','liqueur',{rn:'orange liqueur'}],['curacao','Dry curaçao','liqueur'],['maraschino','Maraschino liqueur','liqueur'],
 ['campari','Campari','liqueur'],['aperol','Aperol','liqueur'],['green-chartreuse','Green Chartreuse','liqueur'],
 ['yellow-chartreuse','Yellow Chartreuse','liqueur'],['benedictine','Bénédictine','liqueur'],['amaretto','Amaretto','liqueur'],
 ['coffee-liqueur','Coffee liqueur','liqueur'],['elderflower','Elderflower liqueur','liqueur'],['violette','Crème de violette','liqueur'],
 ['cassis','Crème de cassis','liqueur'],['mure','Crème de mûre','liqueur'],['cacao','Crème de cacao','liqueur'],['menthe','Crème de menthe','liqueur'],
 ['amaro','Amaro (Averna, Cynar…)','liqueur',{rn:'amaro'}],['nonino','Amaro Nonino','liqueur'],['fernet','Fernet-Branca','liqueur'],
 ['drambuie','Drambuie','liqueur'],['falernum','Falernum','liqueur'],['apricot','Apricot liqueur','liqueur'],['cherry-liqueur','Cherry liqueur (Heering)','liqueur'],
 ['raspberry-liqueur','Raspberry liqueur (Chambord)','liqueur'],['peach-liqueur','Peach liqueur / schnapps','liqueur'],['passion-liqueur','Passion fruit liqueur','liqueur'],
 ['frangelico','Frangelico','liqueur'],['allspice','Allspice dram','liqueur'],['grenadine','Grenadine','liqueur'],['orgeat','Orgeat','liqueur'],
 ['sweet-vermouth','Sweet vermouth','wine'],['dry-vermouth','Dry vermouth','wine'],['blanc-vermouth','Blanc vermouth','wine'],
 ['lillet','Lillet Blanc','wine'],['sherry','Sherry','wine'],['port','Tawny port','wine',{perish:60}],
 ['white-wine','Dry white wine','wine',{perish:5}],['red-wine','Red wine','wine',{perish:5}],['sparkling','Prosecco / Champagne','wine',{perish:3}],
 ['angostura','Angostura bitters','bitters'],['orange-bitters','Orange bitters','bitters'],['peychauds',"Peychaud's bitters",'bitters'],
 ['lime','Limes','fresh',{rn:'lime juice'}],['lemon','Lemons','fresh',{rn:'lemon juice'}],['grapefruit','Grapefruit','fresh',{rn:'grapefruit juice'}],['orange','Oranges','fresh',{rn:'orange'}],
 ['mint','Mint','fresh',{rn:'mint leaves'}],['basil','Basil','fresh'],['ginger','Fresh ginger','fresh'],['chili','Red chili','fresh'],
 ['egg','Eggs','fresh',{rn:'egg white'}],['cream','Heavy cream','fresh'],['coffee','Coffee / espresso','fresh',{rn:'espresso'}],
 ['passion-fruit','Passion fruit purée','fresh'],['peach-puree','White peach purée','fresh'],
 ['soda','Soda water','mixer'],['tonic','Tonic','mixer'],['ginger-beer','Ginger beer','mixer'],['ginger-ale','Ginger ale','mixer'],['cola','Cola','mixer'],
 ['grapefruit-soda','Grapefruit soda','mixer'],['cranberry','Cranberry juice','mixer'],['pineapple','Pineapple juice','mixer'],
 ['oj','Orange juice','mixer'],['tomato','Tomato juice','mixer'],['coconut-cream','Cream of coconut','mixer'],
 ['simple','Simple syrup','syrup'],['demerara','Demerara syrup','syrup'],['honey','Honey syrup','syrup'],['agave','Agave nectar','syrup'],
 ['raspberry-syrup','Raspberry syrup','syrup'],['passion-syrup','Passion fruit syrup','syrup'],['elderflower-cordial','Elderflower cordial','syrup'],
 ['chamomile-cordial','Chamomile cordial','syrup'],['donns-mix',"Donn's Mix (grapefruit-cinnamon)",'syrup'],
 ['sugar','Sugar','kitchen'],['salt','Salt','kitchen'],['worcestershire','Worcestershire','kitchen'],['hot-sauce','Hot sauce','kitchen'],
 ['cloves','Cloves','kitchen'],['orange-flower','Orange flower water','kitchen'],['vanilla','Vanilla extract','kitchen'],
].forEach(([id,n,k,o])=>ING[id]={id,n,k,rn:(o&&o.rn)||null,perish:o&&o.perish});

// Brand and plain words → ingredient. Order matters: specific before generic.
const BRANDS = [
 ['ginger beer','ginger-beer'],['ginger ale','ginger-ale'],['ginger syrup','honey'],['grapefruit soda','grapefruit-soda'],['squirt','grapefruit-soda'],['tonic','tonic'],
 ['club soda','soda'],['soda water','soda'],['seltzer','soda'],['topo chico','soda'],['cola','cola'],['coke','cola'],['cranberry','cranberry'],
 ['pineapple','pineapple'],['orange juice','oj'],['tomato','tomato'],['coco lopez','coconut-cream'],['coconut','coconut-cream'],
 ['raspberry syrup','raspberry-syrup'],['passion fruit syrup','passion-syrup'],['elderflower cordial','elderflower-cordial'],['simple syrup','simple'],['demerara','demerara'],
 ['honey','honey'],['agave','agave'],['limes?','lime'],['lemons?','lemon'],['grapefruits?','grapefruit'],['oranges?','orange'],['mint','mint'],['basil','basil'],['eggs?','egg'],
 ['heavy cream','cream'],['espresso','coffee'],['sugar','sugar'],['worcestershire','worcestershire'],['tabasco','hot-sauce'],['hot sauce','hot-sauce'],
 ['yellow chartreuse','yellow-chartreuse'],['chartreuse','green-chartreuse'],['nonino','nonino'],['fernet','fernet'],
 ['dry curacao','curacao'],['curacao','curacao'],['cointreau','triple-sec'],['grand marnier','triple-sec'],['triple sec','triple-sec'],
 ['maraschino','maraschino'],['heering','cherry-liqueur'],['cherry liqueur','cherry-liqueur'],['cherry brandy','cherry-liqueur'],['chambord','raspberry-liqueur'],
 ['peach schnapps','peach-liqueur'],['peach','peach-liqueur'],['passoa','passion-liqueur'],['passoã','passion-liqueur'],['frangelico','frangelico'],
 ['allspice','allspice'],['pimento dram','allspice'],['apricot','apricot'],['menthe','menthe'],
 ['st-germain','elderflower'],['st germain','elderflower'],['elderflower','elderflower'],
 ['kahlua','coffee-liqueur'],['kahlúa','coffee-liqueur'],['mr black','coffee-liqueur'],['coffee liqueur','coffee-liqueur'],
 ['disaronno','amaretto'],['amaretto','amaretto'],['averna','amaro'],['montenegro','amaro'],['ramazzotti','amaro'],['cynar','amaro'],['meletti','amaro'],['amaro','amaro'],
 ['benedictine','benedictine'],['bénédictine','benedictine'],['campari','campari'],['aperol','aperol'],['drambuie','drambuie'],
 ['violette','violette'],['cassis','cassis'],['mure','mure'],['mûre','mure'],['blackberry','mure'],['cacao','cacao'],
 ['falernum','falernum'],['grenadine','grenadine'],['orgeat','orgeat'],
 ['dry vermouth','dry-vermouth'],['noilly','dry-vermouth'],['dolin blanc','blanc-vermouth'],['blanc vermouth','blanc-vermouth'],
 ['dolin rouge','sweet-vermouth'],['carpano','sweet-vermouth'],['antica','sweet-vermouth'],['punt e mes','sweet-vermouth'],['cocchi di torino','sweet-vermouth'],['sweet vermouth','sweet-vermouth'],['rosso','sweet-vermouth'],['dolin','dry-vermouth'],['vermouth','sweet-vermouth'],
 ['lillet','lillet'],['cocchi americano','lillet'],['sherry','sherry'],['fino','sherry'],['amontillado','sherry'],['manzanilla','sherry'],['tio pepe','sherry'],
 ['port','port'],['porto','port'],['prosecco','sparkling'],['champagne','sparkling'],['cava','sparkling'],['cremant','sparkling'],['crémant','sparkling'],
 ['sauvignon','white-wine'],['pinot grigio','white-wine'],['chardonnay','white-wine'],['white wine','white-wine'],['malbec','red-wine'],['shiraz','red-wine'],['red wine','red-wine'],
 ['orange bitters','orange-bitters'],['regans','orange-bitters'],['angostura','angostura'],['peychaud','peychauds'],["peychaud's",'peychauds'],['bitters','angostura'],
 ['absinthe','absinthe'],['pernod','absinthe'],['herbsaint','absinthe'],['pisco','pisco'],['grappa','grappa'],['cachaca','cachaca'],['cachaça','cachaca'],['leblon','cachaca'],
 ['laird','apple-brandy'],['calvados','apple-brandy'],['applejack','apple-brandy'],['apple brandy','apple-brandy'],
 ['hennessy','cognac'],['remy','cognac'],['rémy','cognac'],['courvoisier','cognac'],['cognac','cognac'],['brandy','cognac'],['ferrand','cognac'],
 ['laphroaig','islay'],['ardbeg','islay'],['lagavulin','islay'],['bowmore','islay'],['caol ila','islay'],['islay','islay'],
 ['johnnie walker','scotch'],['monkey shoulder','scotch'],['dewar','scotch'],['famous grouse','scotch'],['glenlivet','scotch'],['glenfiddich','scotch'],['macallan','scotch'],['balvenie','scotch'],['scotch','scotch'],
 ['jameson','irish'],['redbreast','irish'],['powers','irish'],['tullamore','irish'],['bushmills','irish'],['irish','irish'],
 ['rye','rye'],['rittenhouse','rye'],
 ['maker','bourbon'],['buffalo trace','bourbon'],['woodford','bourbon'],['four roses','bourbon'],['wild turkey','bourbon'],['bulleit','bourbon'],['elijah craig','bourbon'],['knob creek','bourbon'],['eagle rare','bourbon'],['weller','bourbon'],['evan williams','bourbon'],['old forester','bourbon'],['bourbon','bourbon'],['whiskey','bourbon'],['whisky','scotch'],
 ['mezcal','mezcal'],['del maguey','mezcal'],['montelobos','mezcal'],['ilegal','mezcal'],
 ['espolon','tequila'],['casamigos','tequila'],['patron','tequila'],['patrón','tequila'],['fortaleza','tequila'],['olmeca','tequila'],['herradura','tequila'],['cazadores','tequila'],['don julio','tequila'],['el tesoro','tequila'],['tequila','tequila'],
 ['agricole','agricole'],['clement','agricole'],['clément','agricole'],['rhum j','agricole'],['neisson','agricole'],
 ['gosling','dark-rum'],['myers','dark-rum'],['blackstrap','dark-rum'],['cruzan black','dark-rum'],['dark rum','dark-rum'],['black rum','dark-rum'],
 ['appleton','aged-rum'],['smith & cross','aged-rum'],['el dorado','aged-rum'],['diplomatico','aged-rum'],['plantation','aged-rum'],['gold rum','aged-rum'],
 ['white rum','white-rum'],['silver rum','white-rum'],['bacardi','white-rum'],['havana club','white-rum'],['rum','aged-rum'],
 ['hendrick','gin'],['tanqueray','gin'],['beefeater','gin'],['bombay','gin'],['plymouth','gin'],['monkey 47','gin'],['botanist','gin'],['sipsmith','gin'],['gin','gin'],
 ['tito','vodka'],['grey goose','vodka'],['ketel','vodka'],['absolut','vodka'],['belvedere','vodka'],['stoli','vodka'],['smirnoff','vodka'],['vodka','vodka'],
].map(([w,t])=>[new RegExp('(^|[^a-zà-ÿ])'+(/s\?$/.test(w) ? w : w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))+'($|[^a-zà-ÿ])','i'),t]).filter(([,t])=>ING[t]);
function guessTag(name){ for(const [re,t] of BRANDS) if(re.test(name)) return t; return null; }

const GLASS = {rocks:'a rocks glass',coupe:'a chilled coupe',highball:'a highball glass',collins:'a collins glass',wine:'a wine glass',flute:'a flute',mug:'a mug',julep:'a julep cup',copa:'a footed glass',goblet:'a large goblet',tiki:'a tiki mug'};
const STYLES = {stirred:'Stirred & boozy',sour:'Sours',highball:'Highballs',bubbly:'Bubbly & wine',tiki:'Tiki-ish',bitter:'Bitter & Italian',creamy:'Creamy & coffee'};

const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function mkRecipe(t){
  const [name,method,glass,garnish,style,ings,note,how,iba] = t;
  return {id: slug(name), name, method, glass, garnish, style, note, how: how||'', iba: iba||null, custom:false,
    ings: ings.map(([tags,a,u,opt,label])=>({tags:String(tags).split('|'), a:+a||0, u:u||'ml', opt:!!opt, label:label||''}))};
}
const BUILTIN = IBA.map(mkRecipe).concat(EXTRA.map(mkRecipe));

/* ============================== STATE ============================== */
const COLS = ['bottles','pantry','shopping','myrecipes','log','meta'];
const S = {bottles:{},pantry:{},shopping:{},myrecipes:{},log:{},meta:{}};
const CFG = window.FIREBASE_CONFIG || null;
let fs=null, cartKey=null, mode='loading', gotBottles=false, joinedNow=false;
const ui = load('cb.ui', {tab:'cart', units:'oz', serv:1, cartQ:'', outOnly:false, kindF:'all', dseg:'ready', dstyle:'all', dQ:''});
if(['cart','drinks','list'].includes(location.hash.slice(1))) ui.tab = location.hash.slice(1);
if(![1,2,4].includes(ui.serv)) ui.serv = 1;

function load(k, d){ try{ const v = JSON.parse(localStorage.getItem(k)); return v? Object.assign({}, d, v) : d; }catch{ return d; } }
function lsGet(k){ try{ return localStorage.getItem(k); }catch{ return null; } }
function lsSet(k, v){ try{ localStorage.setItem(k, v); }catch{} }
function saveUI(){ lsSet('cb.ui', JSON.stringify(ui)); }
function saveLocal(){ if(mode==='sync') return; lsSet('cb.data', JSON.stringify(S)); }
function loadLocal(){ try{ const d = JSON.parse(lsGet('cb.data')); if(d) COLS.forEach(c=>S[c]=d[c]||{}); }catch{} }

const uid = () => Date.now().toString(36)+Math.random().toString(36).slice(2,7);
function newKey(){ const a='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'; const v=new Uint32Array(24); crypto.getRandomValues(v); return Array.from(v,x=>a[x%a.length]).join(''); }
const colRef = col => fs.collection('carts').doc(cartKey).collection(col);
function put(col, id, data){
  S[col][id] = data; bump();
  if(mode==='sync') colRef(col).doc(id).set(data).catch(writeErr); else saveLocal();
}
function del(col, id){
  delete S[col][id]; bump();
  if(mode==='sync') colRef(col).doc(id).delete().catch(writeErr); else saveLocal();
}
function writeErr(){ toast("That didn't sync. It'll retry when you're back online."); }
function loadScript(src){ return new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }

async function boot(){
  loadLocal();
  const m = location.hash.match(/k=([A-Za-z0-9]{20,})/);
  if(m){ lsSet('cb.cart', m[1]); joinedNow = true; history.replaceState(null,'', location.pathname + '#' + ui.tab); }
  if(!CFG){ mode='local'; gotBottles=true; bump(); return; }
  try{
    const V='10.12.2';
    await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-app-compat.js`);
    await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-compat.js`);
    firebase.initializeApp(CFG); fs = firebase.firestore();
    try{ await fs.enablePersistence({synchronizeTabs:true}); }catch{}
    cartKey = lsGet('cb.cart') || newKey(); lsSet('cb.cart', cartKey);
    const hadLocal = ['bottles','pantry','shopping','myrecipes','log'].some(c=>Object.keys(S[c]).length);
    if(hadLocal && !joinedNow && lsGet('cb.migrated')!==cartKey){
      const snaps = await Promise.all(COLS.map(c=>colRef(c).limit(1).get()));
      if(snaps.every(x=>x.empty)){
        let batch = fs.batch(), n = 0; const commits = [];
        COLS.forEach(c => Object.entries(S[c]).forEach(([id,d]) => { batch.set(colRef(c).doc(id), d); if(++n % 400 === 0){ commits.push(batch.commit()); batch = fs.batch(); } }));
        commits.push(batch.commit()); await Promise.all(commits);
      }
      lsSet('cb.migrated', cartKey);
    }
    if(joinedNow) COLS.forEach(c=>S[c]={});
    mode='sync';
    COLS.forEach(col => colRef(col).onSnapshot(snap => {
      const o = {}; snap.docs.forEach(d => { o[d.id] = d.data(); });
      S[col] = o; if(col==='bottles') gotBottles = true; bump();
    }, () => { mode='offline'; bump(); }));
    if(joinedNow) setTimeout(()=>toast("You're in. This phone now shares the household cart."), 400);
  }catch(e){
    mode='local'; gotBottles=true;
  }
  bump();
}

if('serviceWorker' in navigator && location.protocol==='https:') navigator.serviceWorker.register('sw.js').catch(()=>{});

/* label reading via the household's Anthropic API key */
function apiKey(){ return (S.meta.ai && S.meta.ai.key) || lsGet('cb.akey') || ''; }
const canSee = () => !!apiKey();
async function askClaude(dataUrl, prompt){
  const b64 = dataUrl.split(',')[1];
  let res;
  try{
    res = await fetch('https://api.anthropic.com/v1/messages', {method:'POST',
      headers:{'content-type':'application/json','x-api-key':apiKey(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({model:'claude-sonnet-5-5', max_tokens:2000,
        messages:[{role:'user', content:[{type:'image', source:{type:'base64', media_type:'image/jpeg', data:b64}},{type:'text', text:prompt}]}]})});
  }catch{ const e = new Error('offline'); e.code='offline'; throw e; }
  if(!res.ok){ const e = new Error('api'); e.code = res.status===401||res.status===403 ? 'badkey' : res.status===429 ? 'rate' : res.status===400 ? 'billing' : 'busy'; try{ e.detail = (await res.json()).error.message; }catch{} throw e; }
  const j = await res.json();
  const txt = (j.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('');
  const mm = txt.match(/\{[\s\S]*\}/); if(!mm){ const e = new Error('parse'); e.code='parse'; throw e; }
  return JSON.parse(mm[0]);
}

/* ============================== LOGIC ============================== */
const ingName = t => ING[t] ? ING[t].n : t;
const lineName = t => ING[t] ? (ING[t].rn || ING[t].n.toLowerCase().replace(/\s*\(.*\)$/,'')) : t;
const kindOf = t => ING[t] ? ING[t].k : null;
const isPantry = t => { const k = kindOf(t); return !!(k && KINDS[k].pantry); };
const isOut = b => b.out === true || b.level === 0;
const allRecipes = () => BUILTIN.concat(Object.entries(S.myrecipes).map(([id,r])=>({...r, id:'my-'+id, _doc:id, custom:true, iba:null, ings:(r.ings||[]).map(i=>({label:'',...i}))})));

let memo={};
function bump(){ memo={}; scheduleRender(); }
function haveSet(){
  if(memo.have) return memo.have;
  const h = new Set();
  Object.values(S.bottles).forEach(b => { if(b.tag && !isOut(b)) h.add(b.tag); });
  Object.entries(S.pantry).forEach(([t,p]) => { if(p && p.have) h.add(t); });
  return memo.have = h;
}
function status(r){
  memo.st = memo.st || {};
  if(memo.st[r.id]) return memo.st[r.id];
  const h = haveSet(); const missing = []; const seen = new Set();
  r.ings.forEach(i => { const key = i.tags.join('|'); if(!i.opt && !i.tags.some(t=>h.has(t)) && !seen.has(key)){ seen.add(key); missing.push(i.tags); } });
  return memo.st[r.id] = {missing, ready: missing.length===0};
}
function unlocks(){
  if(memo.un) return memo.un;
  const m = {};
  allRecipes().forEach(r => {
    const s = status(r);
    if(s.missing.length===1) s.missing[0].forEach(t => { (m[t] = m[t] || []).push(r.name); });
  });
  return memo.un = Object.entries(m).map(([t,names])=>({t,names})).sort((a,b)=>b.names.length-a.names.length || ingName(a.t).localeCompare(ingName(b.t)));
}
function readyCount(){ return allRecipes().filter(r=>status(r).ready).length; }
function outBottles(){ return Object.entries(S.bottles).filter(([,b])=>isOut(b)); }
function onList(tag, name){ return Object.values(S.shopping).some(s => !s.done && ((tag && s.tag===tag) || (!tag && s.name.toLowerCase()===String(name).toLowerCase()))); }
function addToList(tag, name, why){
  name = name || ingName(tag);
  if(onList(tag, name)){ toast(`${name} is already on the list.`); return false; }
  put('shopping', uid(), {name, tag: tag||null, why: why||'', done:false, at:Date.now()});
  return true;
}
function daysSince(d){ if(!d) return null; const t = new Date(d+'T12:00:00').getTime(); return Math.floor((Date.now()-t)/864e5); }
function perishBadge(b){
  const k = kindOf(b.tag); if(k!=='wine' || !b.opened || isOut(b)) return '';
  const lim = (ING[b.tag] && ING[b.tag].perish) || KINDS.wine.perish; const d = daysSince(b.opened);
  if(d==null || d < lim) return '';
  return `<span class="badge warn">Opened ${d<14? d+' days' : Math.round(d/7)+' wks'} ago. Sniff test.</span>`;
}

/* amounts */
const FRACS = [[0,''],[1/8,'⅛'],[1/4,'¼'],[1/3,'⅓'],[3/8,'⅜'],[1/2,'½'],[5/8,'⅝'],[2/3,'⅔'],[3/4,'¾'],[7/8,'⅞'],[1,'']];
function frac(v){
  let w = Math.floor(v), r = v - w, best = FRACS[0];
  FRACS.forEach(f => { if(Math.abs(f[0]-r) < Math.abs(best[0]-r)) best = f; });
  if(best[0]===1){ w += 1; best = FRACS[0]; }
  return (w || !best[1] ? String(w) : '') + best[1];
}
const num = v => frac(v);
const plural = (n, one, many) => `${num(n)} ${n>1?many:one}`;
function fmtAmt(i, mult){
  const v = i.a * mult;
  switch(i.u){
    case 'top': return 'top';
    case 'splash': return 'splash';
    case 'rinse': return 'rinse';
    case 'few': return 'few drops';
    case 'taste': return 'to taste';
    case 'pinch': return mult>1 ? `${mult} pinches` : 'pinch';
    case 'dash': return plural(v,'dash','dashes');
    case 'drops': return `${num(v)} drops`;
    case 'bsp': return plural(v,'bar spoon','bar spoons');
    case 'tsp': return `${num(v)} tsp`;
    case 'tbsp': return `${num(v)} tbsp`;
    case 'cube': case 'ea': return num(v);
    default: return ui.units==='ml' ? `${+v.toFixed(1)} ml` : `${frac(v/30)} oz`;
  }
}
function ingLine(i, which){ return i.label || lineName(which || i.tags[0]); }
function methodText(r){
  if(r.how) return r.how;
  const g = GLASS[r.glass] || 'a glass';
  const top = r.ings.find(i=>i.u==='top' || i.u==='splash'), rinse = r.ings.find(i=>i.u==='rinse');
  const egg = r.ings.some(i=>i.tags.includes('egg') && !i.opt);
  const iced = ['rocks','highball','collins','julep'].includes(r.glass);
  let s = rinse ? `Rinse ${g} with ${lineName(rinse.tags[0])} and dump the excess. ` : '';
  if(r.method==='stir') s += `Stir with ice for about 30 seconds, then strain into ${g}${iced?' over fresh ice':''}.`;
  else if(r.method==='shake') s += egg ? `Shake everything hard without ice first, then again with ice. Strain into ${g}${iced?' over fresh ice':''}.` : `Shake hard with ice for 10 to 12 seconds. Strain into ${g}${iced?' over fresh ice':''}.`;
  else if(r.method==='blend') s += `Flash-blend with crushed ice for a few seconds and pour into ${g}. Top with more crushed ice.`;
  else s += `Build in ${g} over ice and give it one lazy stir.`;
  if(top) s += ` ${top.u==='splash'?'Add a splash of':'Top with'} ${ingLine(top).toLowerCase()}.`;
  return s;
}

/* ============================== VIEW HELPERS ============================== */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let gid = 0;
const SHAPES = {
  tall:'M16 2h8v14c0 4 10 6 10 14v42a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V30c0-8 10-10 10-14z',
  round:'M16 4h8v12c8 3 14 12 14 26v30a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V42C2 28 8 19 16 16z',
  wine:'M17 2h6v22c6 3 9 7 9 13v35a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V37c0-6 3-10 9-13z',
  dasher:'M15 14h10v8c5 2 8 5 8 10v40a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V32c0-5 3-8 8-10z',
};
function glyph(kind, full){
  const K = KINDS[kind] || KINDS.spirit; const d = SHAPES[K.shape||'tall']; const id = 'g'+(++gid);
  const y = full ? 28 : 76;
  return `<svg viewBox="0 0 40 80" aria-hidden="true"><defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
    <path d="${d}" fill="var(--plum2)"/>
    <rect clip-path="url(#${id})" x="0" y="${y}" width="40" height="${80-y}" fill="${K.color}"/>
    <rect x="11" y="46" width="18" height="13" rx="2" fill="var(--cream)" opacity=".9"/>
    <path d="M14 51h12M14 55h8" stroke="var(--night)" stroke-width="1.6" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="var(--cream)" stroke-width="2" stroke-linejoin="round"/></svg>`;
}
function bottleVisual(b, big){
  const k = kindOf(b.tag) || 'spirit';
  if(b.photo) return big ? `<img class="bigph" src="${esc(b.photo)}" alt="">` : `<img class="thumb" src="${esc(b.photo)}" alt="">`;
  return glyph(k, !isOut(b));
}
function inOutToggle(id, out){
  return `<button class="tog ${out?'out':''}" data-act="toggle-out" data-id="${id}" aria-pressed="${!out}" aria-label="${out?'Out. Tap when restocked':'In the cart. Tap when it runs out'}"><span>${out?'Out':'Got it'}</span></button>`;
}

/* ============================== RENDER ============================== */
let rq = false;
function scheduleRender(){ if(rq) return; rq = true; requestAnimationFrame(()=>{ rq=false; render(); }); }
function render(){
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.id==='tab-'+ui.tab));
  document.querySelectorAll('.nav .t').forEach(b => { if(b.dataset.tab===ui.tab) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
  $('#syncnote').textContent = mode==='loading' ? 'Unlocking the cabinet…' : mode==='sync' ? 'Synced with your household.' : mode==='offline' ? "Offline. Changes sync when you're back." : 'Saved on this phone only.';
  const open = Object.values(S.shopping).filter(s=>!s.done).length;
  $('#listDot').hidden = !open; $('#listDot').textContent = open;
  if(ui.tab==='cart') renderCart();
  if(ui.tab==='drinks') renderDrinks();
  if(ui.tab==='list') renderList();
  if(sheetRefresh) sheetRefresh();
}

function renderCart(){
  const bottles = Object.entries(S.bottles);
  const live = bottles.filter(([,b])=>!isOut(b)).length;
  const out = outBottles().length;
  $('#cartStats').innerHTML = `
    <span class="stat a"><b>${live}</b> bottles</span>
    <button class="stat b" data-act="goto-ready"><b>${readyCount()}</b> drinks ready</button>
    <button class="stat c ${out?'':'off'}" data-act="toggle-outonly"><b>${out}</b> ran out</button>`;
  const empty = bottles.length===0 && gotBottles;
  $('#cartTools').hidden = bottles.length===0;
  $('#cartEmpty').innerHTML = empty ? `<div class="empty">
      <h3>Your cart is suspiciously sober.</h3>
      <p>Tap in what you've got. The quick-pick takes about a minute; a photo of the whole cart is even faster.</p>
      <div class="btnrow">
        <button class="btn" data-act="quickpick">Quick-pick bottles</button>
        <button class="btn ghost" data-act="snap">Snap the cart</button>
      </div></div>` : '';

  const kinds = ['all', ...BOTTLE_KINDS.filter(k => bottles.some(([,b])=>(kindOf(b.tag)||'spirit')===k))];
  $('#cartChips').innerHTML = kinds.map(k=>`<button class="chip" data-act="kindf" data-k="${k}" aria-pressed="${ui.kindF===k}">${k==='all'?'Everything':KINDS[k].label}</button>`).join('')
    + `<button class="chip" data-act="toggle-outonly" aria-pressed="${ui.outOnly}">Ran out</button>`;

  const q = ui.cartQ.trim().toLowerCase();
  let html = '';
  BOTTLE_KINDS.forEach(k => {
    if(ui.kindF!=='all' && ui.kindF!==k) return;
    const rows = bottles.filter(([,b]) => (kindOf(b.tag)||'spirit')===k)
      .filter(([,b]) => !q || (b.name+' '+ingName(b.tag)).toLowerCase().includes(q))
      .filter(([,b]) => !ui.outOnly || isOut(b))
      .sort((a,b)=> isOut(a[1]) - isOut(b[1]) || a[1].name.localeCompare(b[1].name));
    if(!rows.length) return;
    html += `<h2 class="h2">${KINDS[k].label} <small>${rows.length}</small></h2><div class="blist">`;
    rows.forEach(([id,b]) => {
      const out = isOut(b);
      const sub = (b.name.toLowerCase()!==ingName(b.tag).toLowerCase() ? `<span>${esc(ingName(b.tag))}</span>` : '') + perishBadge(b);
      html += `<div class="brow ${out?'dead':''}">
        <button class="bglyph" data-act="open-bottle" data-id="${id}" aria-label="Open ${esc(b.name)}">${bottleVisual(b)}</button>
        <div class="bmid"><button class="bname" data-act="open-bottle" data-id="${id}">${esc(b.name)}</button>
          ${sub?`<div class="bsub">${sub}</div>`:''}</div>
        ${inOutToggle(id, out)}</div>`;
    });
    html += '</div>';
  });
  if(bottles.length && !html) html = `<p class="sub" style="margin-top:16px">${ui.outOnly ? "Nothing's run out. Well stocked." : 'Nothing matches.'}</p>`;
  $('#cartList').innerHTML = html;

  $('#pantry').innerHTML = PANTRY_KINDS.map(k => `<div class="pgroup"><p class="plabel">${KINDS[k].label}</p><div class="pchips">` +
    Object.values(ING).filter(i=>i.k===k).map(i => { const h = !!(S.pantry[i.id]&&S.pantry[i.id].have);
      return `<button class="pchip ${h?'have':''}" data-act="pantry" data-t="${i.id}" aria-pressed="${h}">${esc(i.n)}</button>`; }).join('') +
    `</div></div>`).join('');
}

function drinkCard(r){
  const s = status(r); const lg = S.log[r.id] || {}; const h = haveSet();
  const seen = new Set();
  const ings = r.ings.filter(i => { const k = i.tags.join('|'); if(seen.has(k)) return false; seen.add(k); return true; }).map(i => {
    const ok = i.tags.some(t=>h.has(t));
    return `<span class="${i.opt?'opt':ok?'':'miss'}">${esc(i.tags.map(ingName).join(' / '))}</span>`;
  }).join(' · ');
  const pill = s.ready ? `<span class="pill ready">Pour it</span>` : s.missing.length===1 ? `<span class="pill one">Need ${esc(s.missing[0].map(ingName).join(' or '))}</span>` : `<span class="pill far">Need ${s.missing.length}</span>`;
  return `<button class="dcard" data-act="open-recipe" data-rid="${esc(r.id)}">
    <div class="dtop"><span class="dname">${lg.fav?'<span class="star">★</span> ':''}${esc(r.name)}${r.custom?' <span class="badge">yours</span>':''}${r.iba?' <span class="badge">IBA</span>':''}</span>${pill}</div>
    <div class="dings">${ings}</div>
    ${lg.made?`<div class="bsub">Made ${lg.made}×</div>`:''}</button>`;
}
function filteredDrinks(seg){
  const q = ui.dQ.trim().toLowerCase();
  return allRecipes().filter(r => {
    const s = status(r);
    if(seg==='ready' && !s.ready) return false;
    if(seg==='one' && s.missing.length!==1) return false;
    if(ui.dstyle==='favs' && !(S.log[r.id]||{}).fav) return false;
    if(ui.dstyle==='iba' && !r.iba) return false;
    if(!['all','favs','iba'].includes(ui.dstyle) && r.style!==ui.dstyle) return false;
    if(q){ const hay = (r.name+' '+r.ings.map(i=>i.tags.map(ingName).join(' ')+' '+i.label).join(' ')).toLowerCase(); if(!hay.includes(q)) return false; }
    return true;
  }).sort((a,b) => {
    const la = S.log[a.id]||{}, lb = S.log[b.id]||{};
    return (!!lb.fav - !!la.fav) || status(a).missing.length - status(b).missing.length || (lb.made||0)-(la.made||0) || a.name.localeCompare(b.name);
  });
}
function renderDrinks(){
  const all = allRecipes();
  const nReady = all.filter(r=>status(r).ready).length, nOne = all.filter(r=>status(r).missing.length===1).length;
  if(ui.dseg==='ready' && nReady===0 && Object.keys(S.bottles).length===0) ui.dseg='all';
  $('#drinkSeg').innerHTML = [['ready','Ready',nReady],['one','1 away',nOne],['all','Everything',all.length]]
    .map(([k,l,n])=>`<button data-act="dseg" data-k="${k}" aria-pressed="${ui.dseg===k}">${l} <b>${n}</b></button>`).join('');
  $('#choiceSub').textContent = nReady ? `${nReady} drinks you can make right now. Let the cart pick one.` : 'Stock the cart and the cart will pick for you.';
  const styles = [['all','All styles'],['favs','★ Favorites'],['iba','IBA official'],...Object.entries(STYLES)];
  $('#drinkChips').innerHTML = styles.map(([k,l])=>`<button class="chip" data-act="dstyle" data-k="${k}" aria-pressed="${ui.dstyle===k}">${l}</button>`).join('');
  $('#drinkUnlock').innerHTML = ui.dseg==='one' ? unlockPanel(4, 'One bottle, more drinks') : '';
  const list = filteredDrinks(ui.dseg);
  $('#drinkList').innerHTML = list.length ? `<div class="dlist">${list.map(drinkCard).join('')}</div>` :
    `<div class="empty"><h3>${ui.dseg==='ready' ? 'Dry as a bone.' : 'Nothing here.'}</h3><p>${ui.dseg==='ready' ? "Nothing's fully pourable yet. Check \"1 away\" to see what a single bottle or a lime would unlock." : 'Try a different filter or search.'}</p></div>`;
}
function unlockPanel(n, title){
  const u = unlocks().slice(0, n);
  if(!u.length) return '';
  return `<h2 class="h2">${title}</h2><p class="sub">What a single purchase would unlock, given what you already own.</p><div class="unlock">` +
    u.map(x => `<div class="urow"><div class="unum">+${x.names.length}<small>drinks</small></div>
      <div style="min-width:0"><div class="uname">${esc(ingName(x.t))}</div><div class="uwhat">${esc(x.names.slice(0,4).join(', '))}${x.names.length>4?` +${x.names.length-4} more`:''}</div></div>
      ${onList(x.t)?'<span class="badge">listed</span>':`<button class="btn small" data-act="list-tag" data-t="${x.t}" data-why="Unlocks ${esc(x.names.slice(0,3).join(', '))}">+ List</button>`}</div>`).join('') + '</div>';
}

function storeOf(s){ return s.tag && kindOf(s.tag) ? KINDS[kindOf(s.tag)].store : 'Wherever'; }
function renderList(){
  const items = Object.entries(S.shopping).sort((a,b)=>a[1].done-b[1].done || a[1].at-b[1].at);
  const open = items.filter(([,s])=>!s.done).length;
  $('#listCount').textContent = items.length ? `${open} to get` : '';
  const groups = {};
  items.forEach(([id,s]) => { (groups[storeOf(s)] = groups[storeOf(s)] || []).push([id,s]); });
  let h = '';
  if(!items.length) h = `<div class="empty"><h3>Nothing to buy. Suspicious.</h3><p>Add things from any drink you're missing, from bottles that ran out, or right here.</p></div>`;
  ['Liquor store','Grocery','Wherever'].forEach(g => {
    if(!groups[g]) return;
    h += `<h2 class="h2">${g} <small>${groups[g].length}</small></h2><div class="slist">` + groups[g].map(([id,s]) => `
      <div class="srow ${s.done?'done':''}">
        <button class="check ${s.done?'on':''}" data-act="list-check" data-id="${id}" aria-label="${s.done?'Uncheck':'Got it'}: ${esc(s.name)}" aria-pressed="${!!s.done}">${s.done?'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 8.5l3 3 7-7"/></svg>':''}</button>
        <div style="min-width:0"><div class="sname">${esc(s.name)}</div>${s.why?`<div class="swhy">${esc(s.why)}</div>`:''}</div>
        <button class="x" data-act="list-del" data-id="${id}" aria-label="Remove ${esc(s.name)}">×</button></div>`).join('') + '</div>';
  });
  if(items.length) h += `<div class="btnrow" style="margin-top:12px"><button class="btn ghost small" data-act="list-copy">Share list</button>${items.some(([,s])=>s.done)?'<button class="btn ghost small" data-act="list-clear">Clear checked</button>':''}</div>`;
  $('#listItems').innerHTML = h;

  const done = items.filter(([,s])=>s.done).length;
  $('#listStock').innerHTML = done ? `<div class="stockbar"><button class="btn mint wide" data-act="stock">Got ${done}. Put ${done===1?'it':'them'} in the cart</button></div>` : '';

  const outs = outBottles().filter(([,b])=>!onList(b.tag, b.name));
  $('#listLow').innerHTML = outs.length ? `<h2 class="h2">Ran out</h2><div class="slist">` + outs.map(([id,b]) => `
    <div class="srow"><span style="width:28px"></span><div style="min-width:0"><div class="sname">${esc(b.name)}</div><div class="swhy">${esc(ingName(b.tag))}</div></div>
    <button class="btn small" data-act="list-bottle" data-id="${id}">+ List</button></div>`).join('') + '</div>' : '';
  $('#listUnlock').innerHTML = unlockPanel(6, 'Biggest bang for your buck');
}

/* ============================== SHEETS ============================== */
let sheetRefresh = null;
function openSheet(html, refresh){
  $('#sheetRoot').innerHTML = `<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div><div id="sheetBody">${html}</div></div></div>`;
  sheetRefresh = refresh || null;
  document.body.style.overflow = 'hidden'; document.body.classList.add('sheet-open');
}
function closeSheet(){ $('#sheetRoot').innerHTML=''; sheetRefresh=null; document.body.style.overflow=''; document.body.classList.remove('sheet-open'); }
const head = (title, meta) => `<div class="shead"><div style="min-width:0"><h2 class="stitle">${title}</h2>${meta?`<p class="smeta">${meta}</p>`:''}</div><button class="close" data-act="close" aria-label="Close">×</button></div>`;

function tagOptions(sel, includePantry){
  const kinds = includePantry ? [...BOTTLE_KINDS, ...PANTRY_KINDS] : BOTTLE_KINDS;
  return kinds.map(k => `<optgroup label="${KINDS[k].label}">` + Object.values(ING).filter(i=>i.k===k)
    .map(i=>`<option value="${i.id}" ${i.id===sel?'selected':''}>${esc(i.n)}</option>`).join('') + '</optgroup>').join('');
}

/* recipe */
let recipeState = {rid:null, made:false};
function openRecipe(rid){
  recipeState = {rid, made:false};
  openSheet(recipeHTML(), () => { if(!allRecipes().find(x=>x.id===recipeState.rid)){ closeSheet(); return; } $('#sheetBody').innerHTML = recipeHTML(); });
}
function recipeHTML(){
  const r = allRecipes().find(x=>x.id===recipeState.rid); if(!r) return '';
  const s = status(r); const h = haveSet(); const lg = S.log[r.id] || {}; const m = ui.serv;
  const lis = r.ings.map(i => {
    const ok = i.tags.some(t=>h.has(t));
    const which = (ok && i.tags.find(t=>h.has(t))) || i.tags[0];
    const others = i.tags.filter(t=>t!==which);
    const alt = others.length ? ` <small>or ${esc(others.map(lineName).join(' or '))}</small>` : '';
    const opt = i.opt ? ' <small>(optional)</small>' : '';
    const name = i.label && which===i.tags[0] ? i.label : lineName(which);
    return `<li class="${ok||i.opt?'':'n'}"><span class="mk ${ok?'y':i.opt?'':'n'}">${ok?'✓':i.opt?'·':'✕'}</span><span class="amt">${fmtAmt(i,m)}</span><span class="nm">${esc(name)}${alt}${opt}</span></li>`;
  }).join('');
  const meta = [STYLES[r.style], GLASS[r.glass] ? GLASS[r.glass].replace(/^a (chilled |large )?/,'') : '', r.garnish ? 'Garnish: '+r.garnish : ''].filter(Boolean).map(esc).join(' · ');
  const st = s.ready ? `<div class="status ready">You've got everything. Go on.</div>` :
    `<div class="status miss">Missing ${esc(s.missing.map(g=>g.map(ingName).join(' or ')).join(', '))}</div>`;
  const src = r.iba ? `<a class="src" href="https://iba-world.com/iba-cocktail/${esc(r.iba)}/" target="_blank" rel="noopener">IBA official spec ↗</a>` : r.custom ? '<span class="src">Your recipe</span>' : '<span class="src">Standard bar spec</span>';
  let used = '';
  if(recipeState.made){
    const rows = []; const seen = new Set();
    r.ings.forEach(i => { const t = i.tags.find(t=>h.has(t)) || i.tags[0]; if(isPantry(t)) return;
      Object.entries(S.bottles).filter(([id,b])=>b.tag===t && !seen.has(id)).forEach(([id,b])=>{ seen.add(id); rows.push([id,b]); }); });
    used = rows.length ? `<div class="used"><p class="flabel" style="margin:0 0 6px">Cheers. Finish anything off?</p>` + rows.map(([id,b]) =>
      `<div class="urow2"><span style="min-width:0;font-weight:700">${esc(b.name)}</span>${inOutToggle(id, isOut(b))}</div>`).join('') + '</div>' : '';
  }
  return head(esc(r.name), meta) + st +
    `<div class="minirow"><div class="stepper" role="group" aria-label="Servings">${[1,2,4].map(n=>`<button data-act="serv" data-n="${n}" aria-pressed="${m===n}">${n===1?'1 drink':'×'+n}</button>`).join('')}</div>
     <div class="stepper" role="group" aria-label="Units">${['oz','ml'].map(u=>`<button data-act="units" data-u="${u}" aria-pressed="${ui.units===u}">${u}</button>`).join('')}</div></div>
    <ul class="ings">${lis}</ul>
    <p class="how">${esc(methodText(r))}</p>${r.note?`<p class="note">${esc(r.note)}</p>`:''}<p class="smeta">${src}</p>${used}
    <div class="actions">
      <button class="btn ${lg.fav?'':'ghost'}" data-act="fav">${lg.fav?'★ Favorite':'☆ Favorite'}</button>
      <button class="btn mint" data-act="made" ${s.ready?'':'disabled'}>Made one${lg.made?` (${lg.made})`:''}</button>
      ${s.missing.length?`<button class="btn coral" data-act="list-missing" style="grid-column:1/-1">Add missing to the list</button>`:''}
      ${r.custom?`<button class="btn ghost" data-act="del-recipe" style="grid-column:1/-1">Delete this recipe</button>`:''}
    </div>`;
}

/* bottle detail */
let bottleState = {id:null, confirm:false};
function openBottle(id){ bottleState = {id, confirm:false}; openSheet(bottleHTML()); }
function bottleHTML(){
  const b = S.bottles[bottleState.id]; if(!b) return head('Gone', 'That bottle is no longer in the cart.');
  const k = kindOf(b.tag) || 'spirit'; const out = isOut(b);
  const uses = allRecipes().filter(r => r.ings.some(i=>i.tags.includes(b.tag)));
  const readyUses = uses.filter(r=>status(r).ready);
  return head(esc(b.name), esc(ingName(b.tag))) +
   `<div class="hero">${bottleVisual(b, true)}<div style="min-width:0">
      <p class="smeta" style="margin:0">${readyUses.length ? `Goes into <b style="color:var(--cream)">${readyUses.length}</b> drinks you can make now` : 'Not in any drink you can make yet'}${uses.length>readyUses.length?`, and ${uses.length-readyUses.length} more you almost can.`:'.'}</p>
      <div class="btnrow" style="margin-top:10px"><button class="btn ghost small" data-act="bottle-photo">${b.photo?'Retake photo':'Add photo'}</button></div></div></div>
    <div class="field"><span class="flabel">Status</span><div class="lvlseg two" style="--c:${KINDS[k].color}">
      <button data-act="bset" data-out="0" aria-pressed="${!out}">In the cart</button><button data-act="bset" data-out="1" aria-pressed="${out}">Ran out</button></div></div>
    <div class="field"><label for="bName">Name on the label</label><input class="inp" id="bName" value="${esc(b.name)}"></div>
    <div class="field"><label for="bTag">What it is</label><select class="inp" id="bTag">${tagOptions(b.tag)}</select></div>
    ${k==='wine'?`<div class="field"><label for="bOpened">Opened on</label><div class="btnrow"><input class="inp" type="date" id="bOpened" value="${esc(b.opened||'')}" style="flex:1"><button class="btn ghost small" data-act="opened-today">Today</button></div></div>`:''}
    <div class="field"><label for="bNotes">Notes</label><textarea class="inp" id="bNotes" placeholder="Tasting notes, where you bought it, who gifted it…">${esc(b.notes||'')}</textarea></div>
    ${uses.length?`<div class="field"><span class="flabel">Drinks it's in</span><div class="qgrid">${uses.slice(0,16).map(r=>`<button class="qchip" data-act="open-recipe" data-rid="${esc(r.id)}" aria-pressed="${status(r).ready}" style="--c:var(--mint)">${esc(r.name)}</button>`).join('')}</div></div>`:''}
    <div class="actions">
      <button class="btn" data-act="bottle-save">Save changes</button>
      <button class="btn ghost" data-act="list-bottle" data-id="${bottleState.id}">+ Shopping list</button>
      ${bottleState.confirm ? `<button class="btn coral" data-act="bottle-del" data-sure="1" style="grid-column:1/-1">Yes, toss ${esc(b.name)}</button>` : `<button class="btn ghost" data-act="bottle-del" style="grid-column:1/-1">Remove from cart</button>`}
    </div>`;
}

/* add */
function openAdd(){
  openSheet(head('Add to the cart') + `<div class="addopts">
    <button class="addopt" data-act="snap"><span class="ic" style="background:var(--coral)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></span>
      <span><b>Snap a photo</b><span>${canSee() ? 'One bottle or the whole cart. Claude reads the labels.' : 'Attach a photo, then fill in the details. Add an API key in Settings to have Claude read labels.'}</span></span></button>
    <button class="addopt" data-act="quickpick"><span class="ic" style="background:var(--yolk)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h7M4 12h7M4 17h7M15 7l2 2 4-4M15 15l2 2 4-4"/></svg></span>
      <span><b>Quick-pick</b><span>Tap everything you own from the usual suspects.</span></span></button>
    <button class="addopt" data-act="manual"><span class="ic" style="background:var(--mint)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg></span>
      <span><b>Type it in</b><span>Brand and bottle. We'll guess what it is.</span></span></button>
    <button class="addopt" data-act="new-recipe"><span class="ic" style="background:var(--lilac)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 4h16l-8 8z"/><path d="M12 12v8M8 20h8"/></svg></span>
      <span><b>A recipe of your own</b><span>House specials, family secrets.</span></span></button>
  </div>`);
}

let qpSel = new Set();
function openQuickPick(){ qpSel = new Set(); openSheet(qpHTML()); }
function qpHTML(){
  const h = haveSet();
  return head('Quick-pick', 'Tap everything you have. Generic names now, rename later if you care.') +
    [...BOTTLE_KINDS, ...PANTRY_KINDS].map(k => `<div class="field"><span class="flabel">${KINDS[k].label}</span><div class="qgrid">` +
      Object.values(ING).filter(i=>i.k===k).map(i => { const got = h.has(i.id);
        return `<button class="qchip ${got?'got':''}" data-act="qp" data-t="${i.id}" aria-pressed="${got||qpSel.has(i.id)}" ${got?'disabled':''} style="--c:${KINDS[k].color}">${esc(i.n)}</button>`; }).join('') + `</div></div>`).join('') +
    `<div class="stockbar" style="bottom:0;margin-top:16px"><button class="btn wide" data-act="qp-save" ${qpSel.size?'':'disabled'}>${qpSel.size?`Add ${qpSel.size} to the cart`:'Tap a few things'}</button></div>`;
}

let manualPhoto = null;
function openManual(pre){
  pre = pre || {}; manualPhoto = pre.photo || null;
  openSheet(head('Type it in') + `
    ${manualPhoto?`<div class="hero"><img class="bigph" src="${esc(manualPhoto)}" alt=""></div>`:''}
    <div class="field"><label for="mName">Name on the label</label><input class="inp" id="mName" placeholder="Rittenhouse Rye, Carpano Antica…" value="${esc(pre.name||'')}" autocomplete="off"></div>
    <div class="field"><label for="mTag">What it is</label><select class="inp" id="mTag"><option value="">Pick one…</option>${tagOptions(pre.tag || '', true)}</select></div>
    <div class="field"><label for="mNotes">Notes</label><textarea class="inp" id="mNotes" placeholder="Optional"></textarea></div>
    <div class="actions"><button class="btn ghost" data-act="manual-photo">${manualPhoto?'Change photo':'Add photo'}</button><button class="btn" data-act="manual-save">Add it</button></div>`);
}

/* photo flow */
let photoTarget = 'snap';
async function thumb(file, max){
  const url = URL.createObjectURL(file);
  try{
    const img = new Image(); await new Promise((ok,no)=>{ img.onload=ok; img.onerror=no; img.src=url; });
    const s = Math.min(1, max/Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth*s); c.height = Math.round(img.naturalHeight*s);
    c.getContext('2d').drawImage(img,0,0,c.width,c.height);
    return c.toDataURL('image/jpeg', .72);
  } finally { URL.revokeObjectURL(url); }
}
let found = [];
async function handlePhoto(file){
  let t = null; try{ t = await thumb(file, 360); }catch{ toast("Couldn't read that image. Try a JPEG or PNG."); return; }
  if(photoTarget==='bottle'){ const b = S.bottles[bottleState.id]; if(b){ put('bottles', bottleState.id, {...b, photo:t}); openBottle(bottleState.id); } return; }
  if(photoTarget==='manual'){ manualPhoto = t; const n=$('#mName')?.value, g=$('#mTag')?.value; openManual({name:n, tag:g, photo:t}); return; }
  if(!canSee()){ openManual({photo:t}); return; }
  openSheet(head('Reading the labels', '') + `<p class="how"><span class="spin"></span>&nbsp; Squinting at the fine print. Usually 5 to 20 seconds.</p><div class="actions"><button class="btn ghost" data-act="manual-from-photo" style="grid-column:1/-1">Skip and type it myself</button></div>`);
  window._pendingThumb = t;
  let big; try{ big = await thumb(file, 1400); }catch{ big = t; }
  const ids = Object.values(ING).filter(i=>KINDS[i.k].bottle || i.k==='mixer' || i.k==='syrup').map(i=>`${i.id} = ${i.n}`).join('\n');
  const prompt = `This is a photo of one or more bottles from someone's home bar cart. Identify each distinct bottle you can see.
For each one give:
- "name": the product name as printed on the label (brand plus expression, e.g. "Rittenhouse Rye", "Carpano Antica Formula"). If unreadable, describe it briefly (e.g. "Green bottle, unreadable label").
- "tag": exactly one id from this list that best describes what it is, or "other":
${ids}
Reply with only JSON: {"bottles":[{"name":"...","tag":"..."}]}. If there are no bottles, reply {"bottles":[]}.`;
  try{
    const res = await askClaude(big, prompt);
    if(!$('#sheetBody') || window._pendingThumb!==t) return;
    const list = (res && Array.isArray(res.bottles) ? res.bottles : []).slice(0, 40);
    if(!list.length){ openManual({photo:t}); toast("Couldn't spot a bottle. Fill it in by hand."); return; }
    found = list.map(x => ({name: String(x.name||'').slice(0,80), tag: ING[x.tag] ? x.tag : (guessTag(String(x.name||'')) || ''), on:true}));
    openSheet(foundHTML());
  }catch(e){
    if(!$('#sheetBody') || window._pendingThumb!==t) return;
    openManual({photo:t});
    const msg = {badkey:"That API key didn't work. Check it in Settings.", rate:'Too many photos at once. Give it a minute.', billing:'Claude turned that down. Check your API credit balance.', offline:"You're offline. Type it in for now.", parse:"Couldn't make sense of that one. Fill it in by hand."}[e.code] || 'Claude is busy. Try again in a bit, or type it in.';
    toast(msg);
  }
}
function foundHTML(){
  return head(found.length===1 ? 'Found it' : `Found ${found.length} bottles`, "Fix anything Claude got wrong, untick anything you don't want.") +
    `<div class="found">${found.map((f,i)=>`<div class="frow">
      <button class="check ${f.on?'on':''}" data-act="found-toggle" data-i="${i}" aria-pressed="${f.on}" aria-label="Include">${f.on?'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 8.5l3 3 7-7"/></svg>':''}</button>
      <div class="two"><input class="inp" id="fName${i}" value="${esc(f.name)}" aria-label="Name">
      <select class="inp" id="fTag${i}" aria-label="What it is"><option value="">Pick one…</option>${tagOptions(f.tag, true)}</select></div></div>`).join('')}</div>
    <div class="actions"><button class="btn wide" data-act="found-save" style="grid-column:1/-1">Add to the cart</button></div>`;
}

/* custom recipe */
let draft = null;
function openNewRecipe(){
  const u = ui.units==='ml' ? 'ml' : 'oz';
  draft = {name:'', style:'stirred', method:'stir', glass:'rocks', garnish:'', note:'', ings:[{t:'',a:u==='ml'?60:2,u},{t:'',a:u==='ml'?30:1,u}]};
  openSheet(draftHTML());
}
function syncDraft(){
  if(!draft || !$('#rName')) return;
  draft.name=$('#rName').value; draft.style=$('#rStyle').value; draft.method=$('#rMethod').value; draft.glass=$('#rGlass').value; draft.garnish=$('#rGarnish').value; draft.note=$('#rNote').value;
  draft.ings.forEach((g,i)=>{ g.t=$('#iT'+i).value; g.a=parseFloat($('#iA'+i).value)||0; g.u=$('#iU'+i).value; });
}
function draftHTML(){
  const sel = (id, opts, v) => `<select class="inp" id="${id}">${opts.map(([k,l])=>`<option value="${k}" ${k===v?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
  return head('Your own recipe') + `
    <div class="field"><label for="rName">Name</label><input class="inp" id="rName" value="${esc(draft.name)}" placeholder="The house special"></div>
    <div class="field"><span class="flabel">Ingredients</span>${draft.ings.map((g,i)=>`<div class="ingrow">
      <select class="inp" id="iT${i}" aria-label="Ingredient"><option value="">Ingredient…</option>${tagOptions(g.t, true)}</select>
      <input class="inp" id="iA${i}" type="number" inputmode="decimal" step="0.25" min="0" value="${g.a}" aria-label="Amount">
      ${sel('iU'+i, [['oz','oz'],['ml','ml'],['dash','dash'],['bsp','bar spoon'],['tsp','tsp'],['ea','each'],['top','top']], g.u)}
      <button class="x" data-act="ing-del" data-i="${i}" aria-label="Remove ingredient">×</button></div>`).join('')}
      <button class="linkish" data-act="ing-add" style="margin-top:8px;align-self:flex-start">+ another ingredient</button></div>
    <div class="field"><label for="rMethod">Method</label>${sel('rMethod',[['stir','Stirred'],['shake','Shaken'],['build','Built in the glass'],['blend','Blended']],draft.method)}</div>
    <div class="field"><label for="rGlass">Glass</label>${sel('rGlass',Object.entries(GLASS).map(([k,v])=>[k,v.replace(/^a (chilled |large )?/,'')]),draft.glass)}</div>
    <div class="field"><label for="rStyle">Style</label>${sel('rStyle',Object.entries(STYLES),draft.style)}</div>
    <div class="field"><label for="rGarnish">Garnish</label><input class="inp" id="rGarnish" value="${esc(draft.garnish)}" placeholder="Orange peel"></div>
    <div class="field"><label for="rNote">Notes</label><textarea class="inp" id="rNote" placeholder="Where it came from, what to tweak">${esc(draft.note)}</textarea></div>
    <div class="actions"><button class="btn wide" data-act="recipe-save" style="grid-column:1/-1">Save recipe</button></div>`;
}

/* settings */
let wipeArmed = false, keyEdit = false;
const inviteLink = () => location.origin + location.pathname + '#k=' + cartKey;
function settingsHTML(){
  const k = apiKey();
  const sync = mode==='sync' || mode==='offline';
  return head('Settings') + `
    <div class="field"><span class="flabel">Household</span>
      ${sync ? `<p class="smeta" style="margin:0">Everyone who opens your invite link shares this cart, shopping list and favorites live.</p>
        <div class="btnrow" style="margin-top:8px"><button class="btn small" data-act="invite">Send invite link</button></div>`
      : `<p class="smeta" style="margin:0">${CFG ? "Can't reach the sync service right now. Changes are saved on this phone." : 'Sync isn’t set up yet, so everything is saved on this phone only.'}</p>`}</div>
    <div class="field"><span class="flabel">Photo label reading</span>
      ${k && !keyEdit ? `<p class="smeta" style="margin:0">On. Claude reads your bottle photos using the API key ending in <b style="color:var(--cream)">${esc(k.slice(-4))}</b>${sync?', shared with your household':''}.</p>
        <div class="btnrow" style="margin-top:8px"><button class="btn ghost small" data-act="key-edit">Change key</button><button class="btn ghost small" data-act="key-clear">Turn off</button></div>`
      : `<p class="smeta" style="margin:0">Paste an Anthropic API key from console.anthropic.com. Each photo costs a cent or two of API credit.</p>
        <div class="addrow"><input class="inp" id="akey" type="password" autocomplete="off" placeholder="sk-ant-…"><button class="btn small" data-act="key-save">Save</button></div>`}</div>
    <div class="field"><span class="flabel">Measure in</span><div class="stepper" style="align-self:flex-start">${['oz','ml'].map(u=>`<button data-act="units" data-u="${u}" aria-pressed="${ui.units===u}">${u==='oz'?'Ounces':'Milliliters'}</button>`).join('')}</div></div>
    <div class="field"><span class="flabel">Recipes</span><p class="smeta" style="margin:0">${IBA.length} official IBA cocktails (iba-world.com), ${EXTRA.length} standard bar classics, ${Object.keys(S.myrecipes).length} of your own.</p></div>
    <div class="actions"><button class="btn ${wipeArmed?'coral':'ghost'}" data-act="wipe" style="grid-column:1/-1">${wipeArmed?'Really empty everything? Tap again.':'Empty the whole cart'}</button></div>`;
}
function openSettings(){ wipeArmed = false; keyEdit = false; openSheet(settingsHTML(), () => { if(document.activeElement && document.activeElement.id==='akey') return; $('#sheetBody').innerHTML = settingsHTML(); }); }
function shareOrCopy(text, title, done){
  if(navigator.share){ navigator.share({title, text}).catch(()=>{}); return; }
  const fallback = () => { openSheet(head(title) + `<textarea class="inp" id="copyBox" style="min-height:160px;margin-top:12px">${esc(text)}</textarea>`); setTimeout(()=>{ const b=$('#copyBox'); if(b){ b.focus(); b.select(); } }, 50); };
  try{ navigator.clipboard.writeText(text).then(()=>toast(done), fallback); }catch{ fallback(); }
}

/* toast */
let toastT;
function toast(msg, actLabel, fn){
  clearTimeout(toastT);
  $('#toastRoot').innerHTML = `<div class="toast" role="status"><span>${esc(msg)}</span>${actLabel?`<button id="toastAct">${esc(actLabel)}</button>`:''}</div>`;
  if(actLabel) $('#toastAct').onclick = () => { fn(); $('#toastRoot').innerHTML=''; };
  toastT = setTimeout(()=>{ $('#toastRoot').innerHTML=''; }, actLabel ? 6000 : 3200);
}

/* ============================== ACTIONS ============================== */
function setOut(id, out){
  const b = S.bottles[id]; if(!b) return;
  const next = {...b, out}; delete next.level;
  if(!out && kindOf(b.tag)==='wine' && isOut(b)) next.opened = null;
  put('bottles', id, next);
  if(out) toast(`${b.name} is a dead soldier.`, onList(b.tag,b.name)?null:'Add to list', () => { addToList(b.tag, b.name, 'Ran out') && toast('On the list.'); });
}
function today(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function newBottle(name, tag, extra){ return Object.assign({name, tag, out:false, at:Date.now(), opened: kindOf(tag)==='wine' ? today() : null}, extra||{}); }
function syncFound(){ found.forEach((f,i)=>{ const n=$('#fName'+i), t=$('#fTag'+i); if(n) f.name=n.value.trim(); if(t) f.tag=t.value; }); }

const ACT = {
  tab: t => { ui.tab = t.dataset.tab; saveUI(); history.replaceState(null,'','#'+ui.tab); window.scrollTo(0,0); render(); },
  'goto-ready': () => { ui.tab='drinks'; ui.dseg='ready'; saveUI(); window.scrollTo(0,0); render(); },
  'toggle-outonly': () => { ui.outOnly = !ui.outOnly; saveUI(); render(); },
  kindf: t => { ui.kindF = t.dataset.k; saveUI(); render(); },
  'toggle-out': t => {
    const id = t.dataset.id; const b = S.bottles[id]; if(!b) return;
    setOut(id, !isOut(b));
    requestAnimationFrame(()=>{ const g = document.querySelector(`.bglyph[data-id="${id}"]`); g && g.classList.add('wob'); });
  },
  pantry: t => { const id = t.dataset.t; const have = !(S.pantry[id] && S.pantry[id].have); put('pantry', id, {have, at:Date.now()});
    if(!have) toast(`Out of ${ingName(id).toLowerCase()}.`, onList(id)?null:'Add to list', () => addToList(id, null, 'Ran out') && toast('On the list.')); },
  'open-bottle': t => openBottle(t.dataset.id),
  'open-recipe': t => openRecipe(t.dataset.rid),
  dseg: t => { ui.dseg = t.dataset.k; saveUI(); render(); },
  dstyle: t => { ui.dstyle = t.dataset.k; saveUI(); render(); },
  surprise: () => {
    const ready = allRecipes().filter(r=>status(r).ready);
    if(!ready.length){ toast('Nothing pourable yet. Stock up first.'); return; }
    const w = ready.map(r => { const l = S.log[r.id]||{}; const recent = l.last && Date.now()-l.last < 3*864e5; return [r, (l.fav?3:1) * (recent?0.3:1)]; });
    let x = Math.random() * w.reduce((s,[,v])=>s+v,0); let pick = w[0][0];
    for(const [r,v] of w){ x -= v; if(x<=0){ pick=r; break; } }
    openRecipe(pick.id);
    toast(['The cart has spoken.','Trust the cart.','Bold choice. The cart approves.','No take-backs.'][Math.floor(Math.random()*4)]);
  },
  serv: t => { ui.serv = +t.dataset.n; saveUI(); sheetRefresh && sheetRefresh(); },
  units: t => { ui.units = t.dataset.u; saveUI(); sheetRefresh && sheetRefresh(); },
  fav: () => { const id = recipeState.rid; const l = S.log[id]||{}; put('log', id, {...l, fav:!l.fav}); },
  made: () => { const id = recipeState.rid; const l = S.log[id]||{}; recipeState.made = true; put('log', id, {...l, made:(l.made||0)+ui.serv, last:Date.now()}); },
  'list-missing': () => { const r = allRecipes().find(x=>x.id===recipeState.rid); let n=0;
    status(r).missing.forEach(g => { if(!g.some(t=>onList(t))) { put('shopping', uid(), {name:ingName(g[0]), tag:g[0], why:`For ${r.name}${g.length>1?` (or ${g.slice(1).map(ingName).join(', ')})`:''}`, done:false, at:Date.now()+n}); n++; } });
    toast(n ? `Added ${n} to the list.` : 'Already on the list.'); },
  'del-recipe': () => { const r = allRecipes().find(x=>x.id===recipeState.rid); if(r && r._doc){ del('myrecipes', r._doc); closeSheet(); toast(`${r.name} deleted.`); } },
  close: closeSheet,
  scrim: (t,e) => { if(e.target===t) closeSheet(); },
  add: openAdd,
  quickpick: openQuickPick,
  manual: () => openManual(),
  snap: () => { photoTarget='snap'; $('#photoIn').value=''; $('#photoIn').click(); },
  'bottle-photo': () => { photoTarget='bottle'; $('#photoIn').value=''; $('#photoIn').click(); },
  'manual-photo': () => { photoTarget='manual'; $('#photoIn').value=''; $('#photoIn').click(); },
  'manual-from-photo': () => { const t = window._pendingThumb; window._pendingThumb = null; openManual({photo:t}); },
  qp: t => { const id=t.dataset.t; qpSel.has(id)?qpSel.delete(id):qpSel.add(id); $('#sheetBody').innerHTML = qpHTML(); },
  'qp-save': () => { let n=0;
    qpSel.forEach(id => { if(isPantry(id)) put('pantry', id, {have:true, at:Date.now()});
      else { const dead = Object.entries(S.bottles).find(([,b])=>b.tag===id && isOut(b)); if(dead) setOut(dead[0], false); else put('bottles', uid(), newBottle(ingName(id), id)); }
      n++; });
    closeSheet(); toast(`${n} things in the cart. ${readyCount()} drinks ready.`, 'See drinks', () => ACT['goto-ready']()); },
  'manual-save': () => {
    const name = $('#mName').value.trim(); const tag = $('#mTag').value || guessTag(name);
    if(!name && !tag){ toast('Give it a name or pick what it is.'); return; }
    if(!tag){ toast('Pick what it is so the recipes can find it.'); $('#mTag').focus(); return; }
    if(isPantry(tag)){ put('pantry', tag, {have:true, at:Date.now()}); closeSheet(); toast(`${ingName(tag)} marked as stocked.`); return; }
    put('bottles', uid(), newBottle(name || ingName(tag), tag, {notes:$('#mNotes').value.trim(), photo:manualPhoto}));
    closeSheet(); toast(`${name || ingName(tag)} is in. ${readyCount()} drinks ready.`, 'Add another', openManual);
  },
  'found-toggle': t => { syncFound(); const f = found[+t.dataset.i]; f.on=!f.on; $('#sheetBody').innerHTML = foundHTML(); },
  'found-save': () => { syncFound(); const on = found.filter(f=>f.on); const single = on.length===1;
    const unresolved = on.filter(f => !(f.tag || guessTag(f.name)));
    if(unresolved.length){ toast(`Pick what ${unresolved.length===1?'one bottle is':unresolved.length+' bottles are'} so the recipes can find ${unresolved.length===1?'it':'them'}.`); return; }
    on.forEach(f => { const tag = f.tag || guessTag(f.name);
      if(isPantry(tag)) put('pantry', tag, {have:true, at:Date.now()});
      else put('bottles', uid(), newBottle(f.name || ingName(tag), tag, {photo: single ? window._pendingThumb : null})); });
    closeSheet(); toast(`${on.length} added. ${readyCount()} drinks ready.`, 'See drinks', () => ACT['goto-ready']()); },
  bset: t => { setOut(bottleState.id, t.dataset.out==='1'); $('#sheetBody').innerHTML = bottleHTML(); },
  'opened-today': () => { $('#bOpened').value = today(); },
  'bottle-save': () => { const b = S.bottles[bottleState.id]; if(!b) return;
    put('bottles', bottleState.id, {...b, name: $('#bName').value.trim() || ingName($('#bTag').value), tag: $('#bTag').value, notes: $('#bNotes').value.trim(), opened: $('#bOpened') ? ($('#bOpened').value || null) : (b.opened||null)});
    closeSheet(); toast('Saved.'); },
  'bottle-del': t => { if(!t.dataset.sure){ bottleState.confirm = true; $('#sheetBody').innerHTML = bottleHTML(); return; }
    const b = S.bottles[bottleState.id]; del('bottles', bottleState.id); closeSheet(); toast(`${b?b.name:'Bottle'} removed.`); },
  'list-tag': t => { addToList(t.dataset.t, null, t.dataset.why) && toast(`${ingName(t.dataset.t)} is on the list.`); },
  'list-bottle': t => { const b = S.bottles[t.dataset.id]; if(b && addToList(b.tag, b.name, isOut(b) ? 'Ran out' : 'Backup bottle')) toast(`${b.name} is on the list.`); },
  'list-add': () => { const v = $('#listAdd').value.trim(); if(!v) return;
    const tag = guessTag(v) || (Object.values(ING).find(i=>i.n.toLowerCase()===v.toLowerCase())||{}).id || null;
    if(addToList(tag, v, '')) $('#listAdd').value=''; },
  'list-check': t => { const s = S.shopping[t.dataset.id]; if(s) put('shopping', t.dataset.id, {...s, done:!s.done}); },
  'list-del': t => del('shopping', t.dataset.id),
  'list-clear': () => Object.entries(S.shopping).filter(([,s])=>s.done).forEach(([id])=>del('shopping', id)),
  'list-copy': () => {
    const g = {}; Object.values(S.shopping).filter(s=>!s.done).forEach(s => { (g[storeOf(s)]=g[storeOf(s)]||[]).push(s.name); });
    const txt = Object.entries(g).map(([k,v])=>`${k}:\n${v.map(x=>'- '+x).join('\n')}`).join('\n\n') || 'Nothing to buy.';
    const fallback = () => { openSheet(head('Copy this') + `<textarea class="inp" id="copyBox" style="min-height:200px;margin-top:12px">${esc(txt)}</textarea>`); setTimeout(()=>{ const b=$('#copyBox'); if(b){ b.focus(); b.select(); } }, 50); };
    if(navigator.share){ navigator.share({title:'Shopping list', text:txt}).catch(()=>{}); return; }
    try{ navigator.clipboard.writeText(txt).then(()=>toast('Copied. Text it to whoever is shopping.'), fallback); }catch{ fallback(); }
  },
  stock: () => { let n=0;
    Object.entries(S.shopping).filter(([,s])=>s.done).forEach(([id,s]) => {
      if(s.tag && isPantry(s.tag)) put('pantry', s.tag, {have:true, at:Date.now()});
      else if(s.tag){ const dead = Object.entries(S.bottles).find(([,b])=>b.tag===s.tag && isOut(b));
        if(dead){ const nb = {...dead[1], out:false}; delete nb.level; if(kindOf(s.tag)==='wine') nb.opened = today(); put('bottles', dead[0], nb); }
        else put('bottles', uid(), newBottle(s.name, s.tag)); }
      del('shopping', id); n++; });
    toast(`Stocked ${n}. ${readyCount()} drinks ready.`, 'See drinks', () => ACT['goto-ready']()); },
  'new-recipe': openNewRecipe,
  'ing-add': () => { syncDraft(); draft.ings.push({t:'',a:ui.units==='ml'?30:1,u:ui.units==='ml'?'ml':'oz'}); $('#sheetBody').innerHTML = draftHTML(); },
  'ing-del': t => { syncDraft(); draft.ings.splice(+t.dataset.i,1); $('#sheetBody').innerHTML = draftHTML(); },
  'recipe-save': () => { syncDraft();
    const ings = draft.ings.filter(g=>g.t).map(g=>({tags:[g.t], a: g.u==='oz' ? g.a*30 : g.a, u: g.u==='oz' ? 'ml' : g.u, opt:false, label:''}));
    if(!draft.name.trim()){ toast('Your drink needs a name.'); return; }
    if(!ings.length){ toast('Add at least one ingredient.'); return; }
    const id = uid();
    put('myrecipes', id, {name:draft.name.trim(), method:draft.method, glass:draft.glass, garnish:draft.garnish.trim(), style:draft.style, note:draft.note.trim(), how:'', ings});
    closeSheet(); toast(`${draft.name.trim()} is in the book.`, 'Open it', () => openRecipe('my-'+id)); },
  settings: openSettings,
  wipe: () => { if(!wipeArmed){ wipeArmed=true; sheetRefresh && sheetRefresh(); return; }
    COLS.filter(c=>c!=='meta').forEach(c => Object.keys(S[c]).forEach(id => del(c, id))); closeSheet(); toast('Cart emptied. Fresh start.'); },
  invite: () => shareOrCopy(`Join our bar cart on Cart Blanche: ${inviteLink()}`, 'Cart Blanche invite', 'Invite link copied.'),
  'key-edit': () => { keyEdit = true; $('#sheetBody').innerHTML = settingsHTML(); $('#akey') && $('#akey').focus(); },
  'key-clear': () => { put('meta','ai',{key:''}); try{ localStorage.removeItem('cb.akey'); }catch{} keyEdit=false; toast('Label reading is off.'); },
  'key-save': () => { const v = ($('#akey').value||'').trim();
    if(!/^sk-ant-/.test(v)){ toast('That doesn’t look like an Anthropic key. It starts with sk-ant-.'); return; }
    lsSet('cb.akey', v); put('meta','ai',{key:v}); keyEdit=false; $('#sheetBody').innerHTML = settingsHTML(); toast('Saved. Snap a bottle to try it.'); },
};

document.addEventListener('click', e => { const t = e.target.closest('[data-act]'); if(!t || t.disabled) return; const f = ACT[t.dataset.act]; if(f) f(t, e); });
document.addEventListener('keydown', e => { if(e.key==='Escape' && $('#sheetRoot').innerHTML) closeSheet(); if(e.key==='Enter' && e.target.id==='listAdd'){ e.preventDefault(); ACT['list-add'](); } });
$('#cartSearch').addEventListener('input', e => { ui.cartQ = e.target.value; render(); });
$('#drinkSearch').addEventListener('input', e => { ui.dQ = e.target.value; render(); });
$('#cartSearch').value = ui.cartQ; $('#drinkSearch').value = ui.dQ;
$('#photoIn').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if(f) handlePhoto(f); });
document.addEventListener('input', e => { if(e.target.id==='mName'){ const g = guessTag(e.target.value); const s = $('#mTag'); if(g && s && !s.dataset.touched) s.value = g; } });
document.addEventListener('change', e => { if(e.target.id==='mTag') e.target.dataset.touched = '1'; });

(function(){
  const d = new Date(), h = d.getHours(), day = d.getDay();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const t = d.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'});
  let q;
  if(h < 11) q = `It's ${t}. The cart is closed. (It isn't.)`;
  else if(h < 16) q = `${t}. Somewhere, it's five o'clock.`;
  else if(day===5 || day===6) q = `${days[day]} night. The cart has been expecting you.`;
  else if(h < 21) q = `${t} on a ${days[day]}. One won't hurt.`;
  else q = `${t}. Nightcap territory.`;
  $('#quip').textContent = q;
})();
render();
boot();
