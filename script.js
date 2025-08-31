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
  {
    id: 1,
    title: "🥞 Makanan (French toast)",
    sentences: [
      `This picture shows a plate of stacked French toast topped with fruit.`,
      `The toast is layered with slices of banana and blueberries, drizzled with syrup, and sprinkled with powdered sugar. It looks freshly prepared and ready to be served.`,
      `The dark plate and clean presentation suggest this could be from a café, restaurant, or homemade breakfast prepared with care. It seems to be a morning or brunch dish.`,
      `Perhaps this meal was made to enjoy a healthy and delicious start to the day. The combination of bread, fruit, and syrup is both sweet and nutritious.`,
      `This photo makes me feel hungry and delighted. It reminds me of the joy of having a special breakfast and how food can be both comforting and beautiful.`
    ]
  },
  {
    id: 2,
    title: "🥾 Pendaki di lembah (Hikers)",
    sentences: [
      `This picture shows two hikers walking through a rocky canyon with backpacks on their shoulders.`,
      `One person is stepping across a shallow stream, while the other is walking ahead along the narrow path. They appear to be exploring the natural landscape with confidence and energy.`,
      `The high cliffs and golden light suggest this is a desert canyon or mountain valley, probably during late afternoon when the sun is setting.`,
      `Perhaps they are on a hiking trip, enjoying adventure and exercise while discovering new places. It could also be part of a longer journey through a national park or nature reserve.`,
      `This photo makes me think about the thrill of outdoor activities. It feels adventurous and inspiring, reminding me how exploring nature helps us stay healthy and connected to the environment.`
    ]
  },
  {
    id: 3,
    title: "📚 Rak buku di taman (Bookshelf)",
    sentences: [
      `This picture shows an outdoor bookshelf filled with books, located in a public park.`,
      `A young man is sitting on a bench next to the shelf, reading attentively. His backpack is on the ground, suggesting he may have stopped to rest and enjoy a book.`,
      `The trees, grass, and sunlight indicate it is a green urban park, probably during a warm afternoon. The bookshelf is placed under the shade, making it inviting for readers.`,
      `Perhaps this is a community project that encourages people to share and read books freely. It could be a form of public library that makes reading accessible to everyone.`,
      `This photo makes me think about the value of reading in everyday life. It feels inspiring to see books available outdoors, reminding us that learning can happen anywhere.`
    ]
  },
  {
    id: 4,
    title: "🚇 Stasiun kereta bawah tanah (Subway)",
    sentences: [
      `This picture shows people waiting at an underground subway platform.`,
      `One man in a long coat is standing near a pillar, looking at his phone, while others are walking along the platform. Some people carry backpacks or bags, suggesting they are commuters.`,
      `The fluorescent lights and tiled walls indicate it is a typical subway station. The setting suggests it might be morning or evening during commuting hours.`,
      `Perhaps these people are on their way to work, school, or home. The man on his phone could be checking the train schedule or messaging someone while waiting.`,
      `This photo makes me think about the daily rhythm of city life. It feels a bit busy and routine, but it also shows how public transportation connects people in urban areas.`
    ]
  },
  {
    id: 5,
    title: "👶 Bayi di dalam rumah (Baby at home)",
    sentences: [
      `This picture shows a small child exploring a cozy indoor space filled with plants.`,
      `The baby is leaning toward a wooden crate filled with books, while some books are scattered on the floor. Around them, large potted plants and hanging greenery create a natural atmosphere.`,
      `The bright sunlight coming through the window suggests it is daytime. The wooden floor and simple furniture make the room feel warm and homely.`,
      `Perhaps the child is curious and learning by touching objects around them. It could also be a playful moment where the baby is enjoying time in a safe and creative environment.`,
      `This photo makes me think about childhood curiosity. It feels innocent and joyful, reminding me how children discover the world in small, everyday moments.`
    ]
  },
  {
    id: 6,
    title: "☕ Barista di kafe",
    sentences: [
      `This picture shows a barista working behind the counter in a coffee shop.`,
      `The person is wearing an apron and carefully preparing a cup of coffee, possibly pouring milk or adding ingredients. Around them, there are bottles, jars, and a large coffee machine.`,
      `The menu board on the wall and the cozy interior suggest it is a modern café, likely during the day when customers are visiting for drinks.`,
      `Perhaps the barista is making a fresh order for a customer, showing attention to detail and skill. It could also be a specialty coffee shop where presentation is as important as taste.`,
      `This photo makes me think about how much effort goes into preparing a good cup of coffee. It feels inviting and reminds me of the relaxing atmosphere of spending time in a café.`
    ]
  },
  {
    id: 7,
    title: "👩‍👧‍👦 Keluarga di dapur (Family in kitchen)",
    sentences: [
      `This picture shows a mother with her two children spending time together in the kitchen.`,
      `One child is sitting on the counter while the other is smiling and holding something, and the mother is standing beside them, engaging happily. On the table, there is packaged food and a prepared meal, suggesting they are about to eat or cook together.`,
      `The bright light from the window suggests it is daytime. The modern kitchen, with shelves of jars and utensils, creates a cozy and family-friendly atmosphere.`,
      `Perhaps they are preparing lunch or sharing a snack. It could also be a family routine where the mother spends quality time with her children while introducing them to cooking.`,
      `This photo makes me feel warm and joyful. It reminds me of how food brings people together and how small moments in the kitchen can strengthen family bonds.`
    ]
  },
  {
    id: 8,
    title: "🐄 Sapi di pedesaan (Cows)",
    sentences: [
      `This picture shows two cows standing in a grassy field surrounded by trees and hills.`,
      `The cows appear to be grazing peacefully, enjoying the fresh grass in the open countryside. The lush greenery and bright sky create a calm and natural setting.`,
      `The landscape suggests a rural area, probably farmland, with a telegraph pole visible in the background. The daylight and soft clouds indicate it is a pleasant afternoon.`,
      `Perhaps this is part of a farm where livestock are raised for milk or meat. It also shows how important agriculture is for providing food and supporting rural communities.`,
      `This photo makes me think about the simplicity of country life. It feels peaceful and reminds me of the importance of nature and farming in our everyday lives.`
    ]
  },
  {
    id: 9,
    title: "🚋 Trem di kota (Tram)",
    sentences: [
      `This picture shows a busy city street with several trams moving along the tracks.`,
      `The green trams are transporting passengers while many people are walking on the sidewalks and crossing the street. Some cyclists are also sharing the road, making the scene lively and dynamic.`,
      `The tall buildings, storefronts, and signs indicate a European city center. The bright daylight suggests it is during working hours when public transport is heavily used.`,
      `Perhaps this is a common commuting route, and the trams are an essential part of urban transportation. The crowd shows how people rely on efficient public systems in their daily routines.`,
      `This photo makes me think about the rhythm of modern city life. It feels energetic but also shows how well-organized transport helps people move smoothly in a crowded urban environment.`
    ]
  },
  {
    id: 10,
    title: "🏯 Kuil tradisional Asia (Temple)",
    sentences: [
      `This picture shows a group of traditional temple buildings with curved roofs and bright red wooden structures.`,
      `A few people are walking around the open courtyard, probably visiting as tourists. The architecture features pagoda-style towers and stone lanterns, which stand out beautifully in the evening sunlight.`,
      `The setting suggests an important cultural or religious site in East Asia, likely Japan. The soft golden light indicates that the photo was taken in the late afternoon near sunset.`,
      `Perhaps this is a famous landmark where people come to pray, admire historical architecture, or simply enjoy the serene atmosphere. It could also be part of a heritage site that attracts many visitors.`,
      `This photo makes me think about history and tradition. It feels inspiring to see how ancient buildings are preserved, reminding us of the importance of culture and spirituality in modern society.`
    ]
  },
  {
    id: 11,
    title: "🎡 Kincir ria di kota (Ferris wheel)",
    sentences: [
      `This picture shows a giant Ferris wheel standing tall in an urban area at sunset.`,
      `The wheel has many capsules for passengers, and it looks like a popular attraction where people can enjoy panoramic views of the city. The silhouette of nearby buildings and trees frames the scene.`,
      `The fading light and clear sky suggest that the photo was taken in the evening. The place looks like a city landmark, visited by both locals and tourists.`,
      `Perhaps this is a famous observation wheel built to give visitors a unique experience of sightseeing. It could also be a symbol of the city, drawing people for leisure and photography.`,
      `This photo makes me think about travel and exploration. It feels inspiring because landmarks like this remind us how cities combine modern architecture with entertainment.`
    ]
  },
  {
    id: 12,
    title: "🌈 Anak-anak & pelangi (Children & rainbow)",
    sentences: [
      `This picture shows two young girls walking hand in hand through a wooden gate in a rural countryside area.`,
      `They are dressed in light-colored clothes, and behind them stretches a wide green field. Above the field, a beautiful rainbow appears in the cloudy sky.`,
      `The setting looks peaceful with stone walls, a farmhouse, and large trees around. The rainbow suggests that the rain has just stopped and the photo was taken in the late afternoon.`,
      `Perhaps the children are siblings or friends enjoying a walk in nature after a short rainfall. The rainbow adds a magical touch, making the moment memorable.`,
      `This photo makes me feel calm and hopeful. It reminds me of the simple joys of childhood and the beauty of nature that often appears after a storm.`
    ]
  },
  {
    id: 13,
    title: "🚶‍♂️ Keluarga menyeberang (Family crossing)",
    sentences: [
      `This picture shows a family crossing a street at a pedestrian crosswalk in an urban area.`,
      `An older man is walking beside a woman who is holding a child’s hand. The little girl is stepping carefully while the adults carry shopping bags, suggesting they are returning from the market.`,
      `Behind them, there are shops, motorbikes, and other pedestrians. The traffic light is visible with a countdown timer, showing it is safe for them to cross. The daylight indicates it might be during the afternoon.`,
      `Perhaps this is a typical busy neighborhood where families run errands and shop for daily necessities. The crosswalk ensures safety while navigating the traffic.`,
      `This photo makes me think about the importance of safety and togetherness. It feels heartwarming to see different generations walking side by side, showing both care and responsibility in daily life.`
    ]
  },
  {
    id: 14,
    title: "🌧️ Sepeda saat hujan (Bikes in rain)",
    sentences: [
      `This picture shows a couple of bicycles parked near a tree on a rainy street.`,
      `The ground is wet, and raindrops are clearly visible, while cars and a bus can be seen passing by in the background. The bicycles appear unused, leaning against a stand and waiting for riders.`,
      `The closed shop and the headlights of vehicles suggest it is in an urban area, perhaps during a rainy afternoon or evening.`,
      `Perhaps these bikes are part of a public bike-sharing system. Because of the heavy rain, people may prefer using cars or buses instead of riding bicycles.`,
      `This photo makes me think about the challenges of commuting in bad weather. It feels realistic and reminds me how weather can influence our choices of transportation in daily life.`
    ]
  },
  {
    id: 15,
    title: "☕ Anak muda di kafe (Youths at cafe)",
    sentences: [
      `This picture shows three young people sitting together at an outdoor café table.`,
      `They are enjoying drinks while working on a laptop. One of them is smiling at the screen, another is sipping from a cup, and the third is typing, suggesting they are collaborating or studying.`,
      `The setting is a modern café with greenery around, indicating it could be in a city area with outdoor seating. The bright light suggests it is daytime, maybe a sunny afternoon.`,
      `Perhaps these people are university students or colleagues meeting to discuss a project. It could also be friends combining leisure with some work or online browsing.`,
      `This photo reminds me of how cafés have become social and creative spaces. It feels lively and inspiring, showing how people mix productivity with relaxation in a pleasant atmosphere.`
    ]
  },
  {
    id: 16,
    title: "🚇 Kereta bawah tanah ramai (Crowded subway)",
    sentences: [
      `This picture shows a subway train with its doors open at an underground station.`,
      `The train is crowded with passengers, some standing inside while others wait near the door. A man in dark clothing is about to step out, and people behind him are looking outside.`,
      `The interior lights suggest it is evening or nighttime, and the setting looks like a busy metropolitan city where public transportation is heavily used.`,
      `Perhaps people are commuting home after work, which explains why the train is so full. It could also be rush hour when most people depend on the subway to save time in traffic.`,
      `This photo reminds me of how important public transportation is in modern cities. It makes me think about the balance between convenience and the challenges of crowded travel.`
    ]
  },
  {
    id: 17,
    title: "⛲ Air mancur di taman (Fountain in park)",
    sentences: [
      `This picture shows a tall decorative fountain in the middle of a public park.`,
      `The fountain has multiple tiers with a statue on top, and water seems to be flowing down into the large basin. In front of it, a few people are sitting on the grass, probably relaxing and chatting.`,
      `The background is filled with green trees and colorful foliage, suggesting it is a pleasant day in an urban park, possibly during spring or summer.`,
      `Perhaps this fountain is a landmark or a central meeting spot where people come to enjoy fresh air, take photos, or spend leisure time outdoors.`,
      `This photo makes me think about the beauty of city parks. It feels peaceful and reminds me how important public spaces are for relaxation and social interaction in busy urban life.`
    ]
  },
  {
    id: 18,
    title: "🚂 Kereta di jembatan (Train on bridge)",
    sentences: [
      `This picture shows a long train crossing a tall stone bridge with multiple arches in the middle of green hills.`,
      `The train is moving forward while releasing a stream of white smoke, and the carriages appear bright red, making a strong contrast with the lush landscape.`,
      `The scenery suggests a countryside setting, possibly in Europe, with rolling hills and scattered trees. The daylight and shadows indicate it might be taken in the afternoon.`,
      `Perhaps this is a famous railway line for tourists, designed to give passengers a scenic view of the mountains and valleys. It may even be part of a historic route.`,
      `This photo gives me a sense of adventure and nostalgia. It makes me think about how trains connect people across beautiful landscapes while also reminding us of the romance of old-fashioned travel.`
    ]
  }
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
