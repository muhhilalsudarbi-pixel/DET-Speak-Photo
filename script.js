/***** ===== DOM SAFE INIT ===== *****/
const $$ = id => {
  const el = document.getElementById(id);
  if (!el) console.error(`❌ Missing #${id}`);
  return el;
};
const els = {};
function hydrateElements(){
  [
    'setSelect','sentSelect','showTarget','guideToggle','fullToggle','timerToggle',
    'startBtn','resetBtn','openCustomBtn','openCustomBtn2','timeCount','progressBar',
    'setTitle','partTitle','targetLine','recLine','listenBtn','listenFullBtn',
    'recBtn','recFullBtn','stopBtn','acc','words','used','wpm','prevBtn','nextBtn',
    'againBtn','guidePanel','customPanel','cTitle','cS1','cS2','cS3','cS4','cS5',
    'saveCustomBtn','clearCustomBtn','customList','progressText',
    'recFileBtn','stopFileBtn','downloadBtn','playback','fileInfo'
  ].forEach(id=>els[id]=$$(id));
}
window.addEventListener('DOMContentLoaded', () => {
  hydrateElements();
  safeInit();
});

/***** ===== DATA: 18 SETS x 5 SENTENCES ===== *****/
const bank = [
  { id:1, title:"🌲 Forest trail", sentences:[
    "This picture shows a narrow dirt path winding through a dense forest.",
    "No people are visible, but the trail seems to invite hikers to walk surrounded by tall evergreen trees.",
    "The sunlight filtering through branches suggests it is late afternoon with a calm atmosphere.",
    "Perhaps this is a hiking trail in a national park designed for nature lovers.",
    "This photo reminds me how refreshing it feels to escape busy city life outdoors."
  ]},
  { id:2, title:"🚤 Lake with boats", sentences:[
    "This picture shows several wooden boats tied to a dock by a clear mountain lake.",
    "The boats are neatly arranged, waiting to be used, while calm water reflects the mountains.",
    "The setting suggests a peaceful alpine scene during daytime under bright skies.",
    "Perhaps this is a tourist spot where visitors rent boats for sightseeing or fishing.",
    "This photo gives me a sense of serenity and the joy of being close to nature."
  ]},
  { id:3, title:"🚂 Train on viaduct", sentences:[
    "This picture shows a long train crossing a tall stone bridge with many arches.",
    "The red carriages and white smoke contrast with the lush green hills.",
    "The daylight suggests a countryside setting, possibly in Europe during the afternoon.",
    "Perhaps this is a scenic railway route designed for tourists to enjoy mountain views.",
    "This photo gives me a sense of adventure and nostalgia about classic train travel."
  ]},
  { id:4, title:"⛲ City fountain", sentences:[
    "This picture shows a tall decorative fountain in the middle of a public park.",
    "Water flows from the statue on top while people sit nearby on the grass.",
    "Green trees and bright sky suggest a pleasant day in an urban park.",
    "Perhaps this fountain is a landmark or central meeting spot for visitors.",
    "This photo feels peaceful and reminds me of the value of public spaces in cities."
  ]},
  { id:5, title:"🚇 Crowded subway train", sentences:[
    "This picture shows a subway train with its doors open at an underground station.",
    "The train is crowded with passengers, some standing inside and others near the door.",
    "The bright lights suggest evening travel in a busy metropolitan area.",
    "Perhaps it is rush hour when most people depend on the subway to commute.",
    "This photo reminds me of the balance between convenience and crowded travel in cities."
  ]},
  { id:6, title:"☕ Outdoor café friends", sentences:[
    "This picture shows three young people sitting together at an outdoor café table.",
    "They are smiling, working on a laptop, and sipping drinks in a lively mood.",
    "The greenery around and daylight suggest a modern café with outdoor seating.",
    "Perhaps they are students or colleagues discussing a project or enjoying free time.",
    "This photo feels inspiring, showing how people mix productivity with relaxation."
  ]},
  { id:7, title:"🚲 Bicycles in rain", sentences:[
    "This picture shows bicycles parked near a tree on a rainy street.",
    "The wet ground and raindrops make the scene look damp and quiet.",
    "Closed shops and car headlights suggest an urban area in the afternoon.",
    "Perhaps the bikes are part of a public bike-sharing system unused due to rain.",
    "This photo makes me think about how weather changes our commuting choices."
  ]},
  { id:8, title:"🚶 Family crossing street", sentences:[
    "This picture shows a family crossing a street at a pedestrian crosswalk.",
    "An older man, a woman, and a child are walking carefully while carrying bags.",
    "Shops, motorbikes, and traffic lights in the background suggest a busy neighborhood.",
    "Perhaps they are returning from shopping, using the crosswalk for safety.",
    "This photo reminds me of the importance of family care and pedestrian safety."
  ]},
  { id:9, title:"🌈 Children & rainbow", sentences:[
    "This picture shows two young girls walking hand in hand through a wooden gate.",
    "Behind them stretches a green field with a beautiful rainbow in the sky.",
    "Stone walls, farmhouses, and trees suggest a peaceful countryside setting.",
    "Perhaps they are siblings enjoying nature after a rainfall.",
    "This photo feels calm and hopeful, reminding me of the beauty after storms."
  ]},
  { id:10, title:"🎡 Ferris wheel landmark", sentences:[
    "This picture shows a giant Ferris wheel standing tall in an urban area.",
    "The wheel has capsules for passengers and looks like a popular attraction.",
    "The fading light and clear sky suggest it is taken in the evening.",
    "Perhaps this landmark is built for sightseeing and tourism.",
    "This photo inspires me to explore new cities and enjoy their architecture."
  ]},
  { id:11, title:"🏯 Traditional temple", sentences:[
    "This picture shows red wooden temple buildings with curved roofs and a pagoda.",
    "Visitors are walking in the courtyard, enjoying the heritage site.",
    "The golden sunset light makes the architecture glow beautifully.",
    "Perhaps this is a famous cultural landmark in Japan visited by tourists.",
    "This photo makes me think about history, culture, and spiritual traditions."
  ]},
  { id:12, title:"🚋 City trams", sentences:[
    "This picture shows several green trams moving along a busy city street.",
    "People are walking, cycling, and crossing while the trams transport passengers.",
    "Tall buildings and daylight suggest a European city center.",
    "Perhaps this is a common commuting route supported by efficient transport.",
    "This photo shows the rhythm of modern city life with organized movement."
  ]},
  { id:13, title:"🐄 Cows in field", sentences:[
    "This picture shows two cows standing in a grassy countryside field.",
    "They are calmly grazing under the open sky and lush greenery.",
    "The poles and hills in the background suggest a rural farm setting.",
    "Perhaps this is farmland where livestock are raised for milk or meat.",
    "This photo feels peaceful, reminding me of the simplicity of rural life."
  ]},
  { id:14, title:"👩‍👧‍👦 Family in kitchen", sentences:[
    "This picture shows a mother with her two children spending time in the kitchen.",
    "One child sits on the counter, while another smiles holding food, and the mother stands nearby.",
    "Bright daylight through the window creates a warm family atmosphere.",
    "Perhaps they are preparing lunch or sharing a snack together.",
    "This photo feels joyful and shows how food brings families closer."
  ]},
  { id:15, title:"☕ Barista making coffee", sentences:[
    "This picture shows a barista preparing a cup of coffee at a café counter.",
    "He is carefully pouring ingredients while surrounded by bottles and a coffee machine.",
    "The blackboard menu and cozy interior suggest a modern coffee shop.",
    "Perhaps he is making a fresh order for a customer with attention to detail.",
    "This photo reminds me how coffee culture creates inviting social spaces."
  ]},
  { id:16, title:"👶 Child & books", sentences:[
    "This picture shows a small child exploring a room filled with plants and books.",
    "The baby is reaching toward a wooden crate full of books with curiosity.",
    "Sunlight through the window and wooden floors make the space cozy.",
    "Perhaps the child is learning by touching objects and discovering new things.",
    "This photo feels innocent and joyful, reminding me of curiosity in childhood."
  ]},
  { id:17, title:"🚇 Subway platform", sentences:[
    "This picture shows people waiting at an underground subway platform.",
    "A man in a coat is looking at his phone while others walk with backpacks.",
    "Fluorescent lights and tiled walls indicate a typical metro station.",
    "Perhaps these are commuters traveling to work or school during rush hours.",
    "This photo reminds me of the busy routine of daily urban commuting."
  ]},
  { id:18, title:"🥞 French toast with fruit", sentences:[
    "This picture shows a plate of stacked French toast topped with fruit.",
    "The toast is layered with banana slices and blueberries, drizzled with syrup and sugar.",
    "The dark plate and neat presentation suggest a café or homemade breakfast.",
    "Perhaps this meal was made to enjoy a healthy and delicious start to the day.",
    "This photo makes me feel delighted and hungry, reminding me of the joy of breakfast."
  ]},
];
const CUSTOM_KEY = 'det_speak_custom_v1';
let customBank = [];

/***** ===== STATE & CONST ===== *****/
const PART5 = [
  'Opening – General Overview',
  'Description – Clothes & Actions',
  'Background – Setting',
  'Inference – Context',
  'Reflection – Closing'
];
const DUR = 90;
let state = {
  setIndex: 0,
  sentIndex: 0,
  running: false,
  timerId: null,
  startedAt: null,
  usedSec: 0,
  progress: {completed:0, best:0},
  recog: {active:false, startAt:0, lastTranscript:""},
  fullMode: false,
  mediaStream: null,
  mediaRecorder: null,
  chunks: [],
  blob: null,
  blobUrl: ''
};

/***** ===== INIT ===== *****/
function safeInit(){
  loadCustom();
  buildSetSelect();
  bindEvents();
  syncUI();
}

/***** ===== CORE HELPERS ===== *****/
function allBank(){ return bank.concat(customBank||[]); }
function buildSetSelect(){
  const sel = els.setSelect; sel.innerHTML='';
  const full = allBank();
  if(!full.length){
    const o=document.createElement('option'); o.value=0; o.textContent='— No templates —'; sel.appendChild(o);
    return;
  }
  full.forEach((s,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=`${String(i+1).padStart(2,'0')} — ${s.title}`; sel.appendChild(o); });
  state.setIndex = Math.min(state.setIndex, full.length-1);
  sel.value = state.setIndex;
}
function bindEvents(){
  els.setSelect.addEventListener('change', e=>{ state.setIndex=+e.target.value; resetAll(false); });
  els.sentSelect.addEventListener('change', e=>{ state.sentIndex=+e.target.value; renderTarget(); renderTitles(); resetStats(); });
  els.showTarget.addEventListener('change', updateTargetVisibility);
  els.guideToggle.addEventListener('change', ()=> els.guidePanel.style.display = els.guideToggle.checked?'block':'none');
  els.fullToggle.addEventListener('change', ()=>{ state.fullMode=els.fullToggle.checked; renderTarget(); renderTitles(); resetStats(); });
  els.timerToggle.addEventListener('change', ()=>{ els.timeCount.textContent = els.timerToggle.checked? String(DUR) : '—'; if(!els.timerToggle.checked){ els.progressBar.style.width='0%'; }});

  els.startBtn.addEventListener('click', startSession);
  els.resetBtn.addEventListener('click', ()=> resetAll(true));

  // open/close custom panel
  els.openCustomBtn.addEventListener('click', ()=>{ toggleCustomPanel(); });
  els.openCustomBtn2.addEventListener('click', ()=>{ toggleCustomPanel(); });

  // nav
  els.prevBtn?.addEventListener('click', ()=>{ state.sentIndex=(state.sentIndex+4)%5; els.sentSelect.value=state.sentIndex; renderTarget(); renderTitles(); resetStats(); });
  els.nextBtn?.addEventListener('click', ()=>{ state.sentIndex=(state.sentIndex+1)%5; els.sentSelect.value=state.sentIndex; renderTarget(); renderTitles(); resetStats(); });
  els.againBtn?.addEventListener('click', ()=> resetStats());

  // custom CRUD
  els.saveCustomBtn.addEventListener('click', saveCustom);
  els.clearCustomBtn.addEventListener('click', ()=>{ ['cTitle','cS1','cS2','cS3','cS4','cS5'].forEach(id=>els[id].value=''); els.cTitle.focus(); });

  // TTS
  els.listenBtn.addEventListener('click', ()=> speakText(currentTarget(false)));
  els.listenFullBtn.addEventListener('click', ()=> speakText(currentTarget(true)));

  // STT
  els.recBtn.addEventListener('click', ()=> startRec(false));
  els.recFullBtn.addEventListener('click', ()=> startRec(true));
  els.stopBtn.addEventListener('click', ()=> stopRec());

  // MediaRecorder
  els.recFileBtn.addEventListener('click', startFileRecording);
  els.stopFileBtn.addEventListener('click', stopFileRecording);
  els.downloadBtn.addEventListener('click', downloadRecording);
}
function toggleCustomPanel(){
  const show = els.customPanel.style.display!=='block';
  els.customPanel.style.display = show?'block':'none';
  if(show) els.cTitle.focus();
}

function syncUI(){ renderTitles(); renderTarget(); resetStats(); updateProgress(); }
function renderTitles(){
  const set = allBank()[state.setIndex];
  els.setTitle.textContent = set? set.title : '—';
  els.partTitle.textContent = state.fullMode? 'Full Set (1–5)' : (PART5[state.sentIndex]||'—');
}
function renderTarget(){
  const set = allBank()[state.setIndex];
  if(!set){ els.targetLine.innerHTML='<i class="muted">No template</i>'; return; }
  const text = state.fullMode? set.sentences.join(' ') : set.sentences[state.sentIndex];
  els.targetLine.innerHTML = escapeHtml(text);
  updateTargetVisibility();
}
function updateTargetVisibility(){
  els.targetLine.style.display = els.showTarget.checked ? 'block':'none';
}
function resetAll(hard){
  stopTimer(); stopRec(true);
  state.running=false; state.usedSec=0;
  els.timeCount.textContent = els.timerToggle.checked? String(DUR) : '—';
  els.progressBar.style.width='0%';
  if(hard){
    state.setIndex = Math.floor(Math.random()*allBank().length);
    els.setSelect.value = state.setIndex;
  }
  state.sentIndex=0; els.sentSelect.value=0;
  renderTitles(); renderTarget(); resetStats(); updateProgress();
}
function resetStats(){
  els.recLine.innerHTML='';
  els.acc.textContent='0%'; els.words.textContent='0/0'; els.used.textContent='0s'; els.wpm.textContent='0';
  els.againBtn.disabled=false; state.recog.lastTranscript='';
}

/***** ===== TIMER ===== *****/
function startSession(){
  if(state.running) return;
  state.running=true; state.startedAt=Date.now(); state.usedSec=0;
  if(els.timerToggle.checked){ tickTimer(); state.timerId=setInterval(tickTimer,1000); }
  else { els.timeCount.textContent='—'; }
}
function tickTimer(){
  state.usedSec = Math.max(0, ((Date.now()-state.startedAt)/1000)|0);
  const remain = Math.max(0, DUR - state.usedSec);
  els.timeCount.textContent = String(remain);
  els.used.textContent = `${state.usedSec}s`;
  els.progressBar.style.width = `${(state.usedSec/DUR)*100}%`;
  if(remain<=0){ stopTimer(); stopRec(); }
}
function stopTimer(){ if(state.timerId){ clearInterval(state.timerId); state.timerId=null; } }

/***** ===== TTS ===== *****/
function speakText(text){
  if(!('speechSynthesis' in window)){ alert('Speech Synthesis not supported.'); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-US'; u.rate=1; u.pitch=1;
  window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
}

/***** ===== STT ===== *****/
let SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let rec = null;
function startRec(full){
  if(!SR){ alert('Speech Recognition not supported (try Chrome/Edge).'); return; }
  if(state.recog.active) return;
  rec = new SR();
  rec.lang='en-US'; rec.interimResults=true; rec.maxAlternatives=1; rec.continuous=false;

  state.fullMode = full || state.fullMode; if(full) els.fullToggle.checked=true;
  els.stopBtn.disabled=false; els.recBtn.disabled=true; els.recFullBtn.disabled=true;
  els.recLine.innerHTML='<span class="muted">Listening… speak clearly.</span>';

  rec.onstart = ()=>{ state.recog.active=true; state.recog.startAt=Date.now(); };
  rec.onresult = (e)=>{
    let t=''; for(let i=0;i<e.results.length;i++){ t += e.results[i][0].transcript + (e.results[i].isFinal?'':' '); }
    state.recog.lastTranscript = t.trim(); renderDiff();
  };
  rec.onerror = (e)=>{ console.warn('rec error', e.error); };
  rec.onend = ()=>{
    state.recog.active=false;
    els.recBtn.disabled=false; els.recFullBtn.disabled=false; els.stopBtn.disabled=true;
    computeStats();
  };
  try{ rec.start(); }catch(err){ console.warn(err); }
}
function stopRec(silent){
  if(!rec) return;
  try{ rec.stop(); }catch(_){}
  if(!silent) computeStats();
}

/***** ===== DIFF & STATS ===== *****/
function currentTarget(full){
  const set = allBank()[state.setIndex];
  return full? set.sentences.join(' ') : set.sentences[state.sentIndex];
}
function normalizeWords(s){
  return (s||'').toLowerCase().replace(/[^\w\s’'-]/g,'').trim().split(/\s+/).filter(Boolean);
}
function alignWords(expArr, actArr){
  const n=expArr.length,m=actArr.length;
  const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  const bt=Array.from({length:n+1},()=>Array(m+1).fill(null));
  for(let i=0;i<=n;i++){ dp[i][0]=i; bt[i][0]='del'; }
  for(let j=0;j<=m;j++){ dp[0][j]=j; bt[0][j]='ins'; }
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      const same=expArr[i-1]===actArr[j-1];
      const a=dp[i-1][j-1]+(same?0:1), b=dp[i-1][j]+1, c=dp[i][j-1]+1;
      const min=Math.min(a,b,c);
      dp[i][j]=min; bt[i][j]=(min===a)?(same?'match':'sub'):(min===b?'del':'ins');
    }
  }
  let i=n,j=m,ops=[];
  while(i>0||j>0){
    const op=bt[i][j];
    if(op==='match'||op==='sub'){ ops.push({type:op,exp:expArr[i-1],act:actArr[j-1]}); i--; j--; }
    else if(op==='del'){ ops.push({type:'del',exp:expArr[i-1]}); i--; }
    else if(op==='ins'){ ops.push({type:'ins',act:actArr[j-1]}); j--; }
  }
  return ops.reverse();
}
function renderDiff(){
  const exp = normalizeWords(currentTarget(state.fullMode));
  const act = normalizeWords(state.recog.lastTranscript||'');
  const ops = alignWords(exp, act);
  const expSpans=[], actSpans=[];
  ops.forEach(op=>{
    if(op.type==='match') expSpans.push(spanWord(op.exp,'ok')); 
    else if(op.type==='sub'||op.type==='del') expSpans.push(spanWord(op.exp,'miss'));
  });
  ops.forEach(op=>{
    if(op.type==='match') actSpans.push(spanWord(op.act,'ok'));
    else if(op.type==='sub') actSpans.push(spanWord(op.act,'bad'));
    else if(op.type==='ins') actSpans.push(spanWord(op.act,'extra'));
  });
  els.targetLine.innerHTML = els.showTarget.checked ? expSpans.join(' ') : '';
  els.recLine.innerHTML = actSpans.join(' ') || '<span class="muted">…waiting</span>';
}
function computeStats(){
  const exp = normalizeWords(currentTarget(state.fullMode));
  const act = normalizeWords(state.recog.lastTranscript||'');
  const ops = alignWords(exp,act);
  const ok = ops.filter(o=>o.type==='match').length;
  const total = exp.length||1;
  const acc = Math.round((ok/total)*100);
  const seconds = Math.max(1, state.usedSec || ((Date.now()- (state.recog.startAt||Date.now()))/1000)|0);
  const wpm = Math.max(0, Math.round((act.length/seconds)*60));
  els.acc.textContent = acc+'%'; els.words.textContent = `${ok}/${total}`; els.wpm.textContent = String(wpm);
  state.progress.completed += 1; state.progress.best = Math.max(state.progress.best, acc); updateProgress();
}
function updateProgress(){ els.progressText.textContent = `${state.progress.completed} sentences • best accuracy ${state.progress.best}%`; }
function spanWord(w,cls){ return `<span class="word ${cls}">${escapeHtml(w)}</span>`; }
function escapeHtml(s){ return (s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

/***** ===== CUSTOM (localStorage) ===== *****/
function loadCustom(){
  try{
    const raw=localStorage.getItem(CUSTOM_KEY);
    customBank = raw? JSON.parse(raw): [];
    if(!Array.isArray(customBank)) customBank=[];
  }catch(e){
    console.warn('custom corrupted, clearing', e); customBank=[]; localStorage.removeItem(CUSTOM_KEY);
  }
  renderCustomList();
}
function persistCustom(){ localStorage.setItem(CUSTOM_KEY, JSON.stringify(customBank)); }
function saveCustom(){
  const t=(els.cTitle.value||'').trim();
  const s=[els.cS1,els.cS2,els.cS3,els.cS4,els.cS5].map(x=>(x.value||'').trim());
  if(!t || s.some(x=>!x)){ alert('Please fill title and all 5 sentences.'); return; }
  const item={id:Date.now(), title:`★ ${t}`, sentences:s};
  customBank.push(item); persistCustom(); buildSetSelect();
  state.setIndex = allBank().length-1; els.setSelect.value = state.setIndex;
  ['cTitle','cS1','cS2','cS3','cS4','cS5'].forEach(id=>els[id].value=''); renderCustomList(); resetAll(false);
}
function renderCustomList(){
  els.customList.innerHTML='';
  if(customBank.length===0){ els.customList.innerHTML='<div class="muted">No custom templates yet.</div>'; return; }
  customBank.forEach((t,idx)=>{
    const row=document.createElement('div'); row.className='custom-item';
    row.innerHTML = `<strong>${String(idx+1).padStart(2,'0')}</strong> <span style="flex:1">${escapeHtml(t.title)}</span>
      <button data-id="${t.id}" class="ghost">Delete</button>`;
    row.querySelector('button').addEventListener('click', e=>{
      const id=+e.target.getAttribute('data-id');
      customBank = customBank.filter(x=>x.id!==id); persistCustom(); buildSetSelect();
      if(state.setIndex>=allBank().length) state.setIndex=allBank().length-1;
      renderCustomList(); resetAll(false);
    });
    els.customList.appendChild(row);
  });
}

/***** ===== MEDIARECORDER (record → file) ===== */
async function ensureStream(){
  if(state.mediaStream) return state.mediaStream;
  try{ state.mediaStream = await navigator.mediaDevices.getUserMedia({audio:true}); return state.mediaStream; }
  catch(e){ alert('Microphone permission denied.'); throw e; }
}
async function startFileRecording(){
  const stream = await ensureStream();
  state.chunks=[]; const mr = new MediaRecorder(stream); state.mediaRecorder=mr;
  els.recFileBtn.disabled=true; els.stopFileBtn.disabled=false; els.downloadBtn.disabled=true; els.fileInfo.textContent='Recording…';
  mr.ondataavailable = e=>{ if(e.data && e.data.size) state.chunks.push(e.data); };
  mr.onstop = ()=>{
    state.blob = new Blob(state.chunks, { type: mr.mimeType || 'audio/webm' });
    state.blobUrl = URL.createObjectURL(state.blob);
    els.playback.src = state.blobUrl;
    els.downloadBtn.disabled=false;
    els.fileInfo.textContent = `Saved ${Math.round(state.blob.size/1024)} KB (${mr.mimeType||'audio/webm'})`;
  };
  mr.start();
}
function stopFileRecording(){
  if(state.mediaRecorder && state.mediaRecorder.state!=='inactive'){ state.mediaRecorder.stop(); }
  els.recFileBtn.disabled=false; els.stopFileBtn.disabled=true;
}
function downloadRecording(){
  if(!state.blob) return;
  const a=document.createElement('a'); a.href=state.blobUrl; a.download=`det-speak-${Date.now()}.webm`;
  document.body.appendChild(a); a.click(); a.remove();
}
