import React,{useState,useMemo} from 'react';import{createRoot}from'react-dom/client';import{QRCodeSVG}from'qrcode.react';import{stages,options}from'./data';import './style.css';
const prompts=stages.flatMap((s,stage)=>s.questions.flatMap((set,reverse)=>set.map((text,i)=>({stage,reverse:!!reverse,text,id:`${stage}-${reverse}-${i}`}))));
const isLocalHost=()=>['localhost','127.0.0.1','[::1]'].includes(window.location.hostname);
function shareUrl(){const{protocol,port,pathname,href}=window.location;return isLocalHost()&&__LAN_IP__?`${protocol}//${__LAN_IP__}${port?':'+port:''}${pathname}`:href.split(/[?#]/)[0]}

function AboutPage({onBack}){
  return <section className="about">
    <button className="link back-link" onClick={onBack}>← Back to home</button>
    <div className="about-hero">
      <div className="about-avatar">🧠</div>
      <div>
        <span className="eyebrow">PSYCHOLOGIST &amp; PSYCHOANALYST</span>
        <h1>Erik H. Erikson</h1>
        <p className="about-dates">June 15, 1902 — May 12, 1994</p>
      </div>
    </div>

    <div className="about-body">
      <div className="about-main">
        <h2>Who was Erik Erikson?</h2>
        <p>Erik Homburger Erikson was a German-American developmental psychologist and psychoanalyst whose work transformed how we understand human growth across the entire lifespan. Unlike earlier theorists who focused only on childhood, Erikson argued that psychological development continues from birth through old age — a radical idea at the time.</p>
        <p>Erikson is best known for his <strong>theory of psychosocial development</strong>, which describes eight stages every person passes through, each defined by a core tension between two opposing outcomes. How a person navigates each tension shapes their personality, relationships, and sense of self.</p>
        <p>He also coined the term <strong>"identity crisis"</strong> — now a fixture of everyday language — to describe the struggle of adolescence to form a stable sense of who one is.</p>

        <h2>Early life</h2>
        <p>Erikson was born in Frankfurt, Germany, to a Danish Jewish mother, Karla Abrahamsen, and an unknown father who had abandoned the family before his birth. His mother later married a German Jewish pediatrician, Theodor Homburger — whose surname Erik bore for many years before adopting "Erikson" (literally "Erik's son") after emigrating to America.</p>
        <p>Tall, blonde, and blue-eyed in a Jewish community, and Jewish in a broader German society, Erikson felt an outsider in both worlds from childhood. This personal experience of not quite belonging shaped his lifelong fascination with identity — who we are, and how we know it.</p>
        <p>He never earned a conventional university degree. Instead, after drifting through Europe as a young artist, he was invited to Vienna to teach children at an experimental school founded by Dorothy Burlingham and Anna Freud. There he trained as a child psychoanalyst at the <strong>Vienna Psychoanalytic Institute</strong>, graduating in 1933.</p>

        <h2>Career</h2>
        <p>Fleeing the rise of National Socialism, Erikson emigrated to the United States in 1933 and quickly built a distinguished academic career without a formal degree — an irony he appreciated. He held positions at <strong>Harvard Medical School</strong>, <strong>Yale University</strong>, and the <strong>University of California, Berkeley</strong>, where he eventually resigned in 1950 rather than sign a loyalty oath, an act of principled resistance that cost him his position.</p>
        <p>He conducted fieldwork with the Sioux in South Dakota and the Yurok in California, bringing a cross-cultural lens to developmental psychology that was rare for his era. He also wrote celebrated psychobiographies of <strong>Martin Luther</strong> (<em>Young Man Luther</em>, 1958) and <strong>Mahatma Gandhi</strong> (<em>Gandhi's Truth</em>, 1969), the latter winning the Pulitzer Prize and the National Book Award.</p>
        <p>His landmark book <strong><em>Childhood and Society</em></strong> (1950) introduced his eight-stage model to the world and remains in print today.</p>

        <h2>His 8 stages of psychosocial development</h2>
        <p>Each stage presents a central <em>tension</em>. Navigating it well builds a lasting strength; struggling with it can leave psychological gaps — though Erikson emphasised these can be revisited and resolved at any age.</p>
        <div className="stage-table">
          {stages.map((s,i)=><div className="stage-row" key={i}>
            <span className="stage-num">{s.icon}</span>
            <div>
              <strong>{s.title}</strong>
              <span className="stage-theory"> · {s.theory}</span>
              <div className="stage-age">{s.age}</div>
              <div className="stage-desc">{s.description}</div>
            </div>
          </div>)}
        </div>

        <h2>Legacy</h2>
        <p>Erikson died on May 12, 1994, in Harwich, Massachusetts, aged 91. His influence extends far beyond academic psychology. His concept of the identity crisis entered the popular vocabulary; his lifespan model shaped how educators, therapists, nurses, and social workers think about human development; and his insistence that growth never stops gave generations a more hopeful view of ageing.</p>
        <p>This game draws on his framework not as a clinical tool but as a mirror — a set of questions designed to prompt honest reflection on the patterns we carry and the areas where we still have room to grow.</p>
      </div>

      <aside className="about-sidebar">
        <div className="bio-card">
          <h3>At a glance</h3>
          <dl>
            <dt>Born</dt><dd>15 June 1902, Frankfurt, Germany</dd>
            <dt>Died</dt><dd>12 May 1994, Harwich, Massachusetts</dd>
            <dt>Nationality</dt><dd>German-American</dd>
            <dt>Field</dt><dd>Developmental psychology, psychoanalysis</dd>
            <dt>Training</dt><dd>Vienna Psychoanalytic Institute (Anna Freud)</dd>
            <dt>Known for</dt><dd>Psychosocial development theory; "identity crisis"</dd>
            <dt>Key work</dt><dd><em>Childhood and Society</em> (1950)</dd>
            <dt>Awards</dt><dd>Pulitzer Prize &amp; National Book Award (1970)</dd>
          </dl>
        </div>
        <div className="bio-card">
          <h3>Notable quote</h3>
          <blockquote>"The most deadly of all possible sins is the mutilation of a child's spirit."</blockquote>
          <cite>— Erik H. Erikson</cite>
        </div>
        <div className="bio-card">
          <h3>Notable quote</h3>
          <blockquote>"Life doesn't make any sense without interdependence. We need each other, and the sooner we learn that, the better for us all."</blockquote>
          <cite>— Erik H. Erikson</cite>
        </div>
      </aside>
    </div>
  </section>
}

function App(){
  const[screen,setScreen]=useState('home'),[idx,setIdx]=useState(0),[answers,setAnswers]=useState({}),[share,setShare]=useState(false);
  const q=prompts[idx],total=prompts.length,progress=Object.keys(answers).length;
  const scores=useMemo(()=>stages.map((s,i)=>{const items=prompts.filter(p=>p.stage===i);const answered=items.filter(p=>answers[p.id]);if(!answered.length)return null;const score=answered.reduce((n,p)=>n+(p.reverse?6-answers[p.id]:answers[p.id]),0)/answered.length;return Math.round((score-1)*25)}),[answers]);
  const reset=()=>{setAnswers({});setIdx(0);setScreen('home')};
  const resultReady=progress===total;
  const current=answers[q?.id];
  const hostUrl=shareUrl();
  return <div className="app">
    <header>
      <div className="brand" style={{cursor:'pointer'}} onClick={()=>setScreen('home')}>
        <span className="mark">IST</span><span>HUMAN<span className="accent">OS</span></span>
      </div>
      <div className="headnote">A self-discovery experience</div>
    </header>
    <main>
      {screen==='home'?<section className="hero">
        <span className="eyebrow">8 THEMES · {total} REFLECTIONS · 10–15 MINUTES</span>
        <h1>How did you become <em>who you are?</em></h1>
        <p>Explore patterns in trust, independence, initiative, confidence, identity, relationships, contribution, and meaning — inspired by <button className="link-inline" onClick={()=>setScreen('about')}>Erik Erikson's</button> psychosocial theory.</p>
        <div className="notice"><b>Private by design.</b> Your answers stay in this browser. No account, database, leaderboard, or employer report. This is an educational reflection activity, not a psychological test or diagnosis. Your answers cannot reveal what happened in your childhood.</div>
        <button className="primary" onClick={()=>{setIdx(0);setScreen('play')}}>Begin your journey →</button>
        <div className="scanpanel"><div className="qr"><QRCodeSVG value={hostUrl} size={150}/></div><div><span className="eyebrow">NEW HERE?</span><h3>Scan to play on your phone</h3><p>Point your phone camera at the code — the game opens instantly. Everyone plays privately on their own device.</p><code>{hostUrl}</code>{isLocalHost()&&<small>Phones must be on the same Wi-Fi as this computer.</small>}</div></div>
        <div className="stagegrid">{stages.map((s,i)=><div className="stagechip" key={i}><span>{s.icon}</span><b>{String(i+1).padStart(2,'0')}</b><small>{s.title}</small></div>)}</div>
      </section>

      :screen==='about'?<AboutPage onBack={()=>setScreen('home')}/>

      :screen==='play'?<section className="play">
        <div className="topline"><span>REFLECTION {idx+1} / {total}</span><button className="link" onClick={()=>setScreen('home')}>Exit</button></div>
        <div className="progress"><div style={{width:`${(idx+1)/total*100}%`}}/></div>
        <div className="stagecontext">{stages[q.stage].icon} {stages[q.stage].title} <span>· {stages[q.stage].theory}</span></div>
        <h2>{q.text}</h2>
        <p className="sub">How much does this statement describe you <b>now</b>?</p>
        <div className="choices">{options.map(o=><button className={'choice '+(current===o.value?'active':'')} onClick={()=>setAnswers(a=>({...a,[q.id]:o.value}))} key={o.value}><span className="radio">{current===o.value?'●':''}</span>{o.label}</button>)}</div>
        <div className="controls"><button className="secondary" disabled={!idx} onClick={()=>setIdx(i=>i-1)}>← Back</button><button className="primary" disabled={!current} onClick={()=>idx===total-1?setScreen('result'):setIdx(i=>i+1)}>{idx===total-1?'See my reflections →':'Continue →'}</button></div>
      </section>

      :screen==='result'?<section className="results">
        <span className="eyebrow">YOUR PRIVATE REFLECTION</span>
        <h1>Your Human OS map</h1>
        <p>This profile summarizes your answers about your <b>current feelings and habits</b>. It does not measure Erikson's stages clinically, prove childhood causes, or assign a personality type.</p>
        {!resultReady&&<div className="notice">You have unanswered questions. Complete all reflections to see your full map. <button className="link" onClick={()=>{setIdx(prompts.findIndex(p=>!answers[p.id]));setScreen('play')}}>Continue →</button></div>}
        <div className="resultgrid">{stages.map((s,i)=>{const score=scores[i];return <article className="resultcard" key={i}><div className="resulthead"><span>{s.icon} {s.title}</span><b>{score===null?'—':`${score}/100`}</b></div><div className="bar"><div style={{width:`${score??0}%`}}/></div><small>{s.theory} · {s.age}</small><p>{score===null?'Answer the questions to explore this theme.':score>=70?'Your responses suggest relative ease in this area right now.':score>=45?'Your responses are mixed; this may be an area to reflect on.':'Your responses suggest this area may feel challenging right now.'}</p><p><strong>Try this:</strong> {s.growth}</p></article>})}</div>
        <div className="notice"><b>Important:</b> These scores are an unvalidated reflection aid created for this activity. They are not clinical scores and should not be used to label yourself or colleagues. People can grow at every age. If an experience brings up distress, consider speaking with someone you trust or a qualified professional.</div>
        <div className="controls"><button className="secondary" onClick={reset}>Start again</button><button className="primary" onClick={()=>window.print()}>Print or save my results</button></div>
      </section>

      :null}
    </main>
    <footer>
      <span>HUMAN OS · Inspired by Erik Erikson</span>
      <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
        <button className="link" onClick={()=>setScreen('about')}>About Erikson</button>
        <button className="link" onClick={()=>setShare(v=>!v)}>Host / QR code</button>
      </div>
    </footer>
    {share&&<div className="overlay" onClick={()=>setShare(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShare(false)}>✕</button><h2>Invite colleagues</h2><p>Deploy the website first, then open its public URL and display this QR code. Everyone plays privately on their own phone.</p><div className="qr"><QRCodeSVG value={hostUrl} size={190}/></div><code>{hostUrl}</code><p className="sub">{isLocalHost()?'Local hosting: phones must be on the same Wi-Fi as this computer. For remote colleagues, deploy to a public HTTPS address.':'Scan with any phone camera to open the game.'}</p></div></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
