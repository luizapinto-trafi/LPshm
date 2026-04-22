/* global React */
const { useState, useEffect } = React;

const PRODUCTS = window.PRODUCTS_M = [
  { id: 1, title: 'Empetua® All-Day Shaper Panty', strike: 69.90, price: 48.93, img:'../../assets/product-hero.png', badge:{text:'-30%'}, colors:['#000','#D3AB91','#7A3A3E','#3E4A63','#5EAD9B','#fff']},
  { id: 2, title: 'Truekind® Wireless Shaper Bra', price: 29.90, img:'../../assets/product-hero.png', colors:['#000','#D3AB91','#fff']},
  { id: 3, title: 'Empetua® Tummy-Control Leggings', strike: 59.90, price: 39.90, img:'../../assets/product-hero.png', badge:{text:'BEST',dark:true}, colors:['#000','#3E4A63']},
  { id: 4, title: 'Shaping Cami with Built-In Bra', price: 34.90, img:'../../assets/product-hero.png', colors:['#000','#D3AB91','#7A3A3E']},
];

const MI = {
  menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
  search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  bag: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1.5 11a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>,
  back: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>,
  close: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
};

function MTile({p, onClick}){
  return <div className="m-tile" onClick={onClick}>
    <div className="img-wrap"><img src={p.img} alt=""/>{p.badge && <span className={'tag ' + (p.badge.dark?'':'')}>{p.badge.text}</span>}</div>
    <h3>{p.title}</h3>
    <div className="prices">
      {p.strike ? <><span className="strike">${p.strike.toFixed(2)}</span><span className="sale">${p.price.toFixed(2)}</span></> : <span className="price">${p.price.toFixed(2)}</span>}
    </div>
  </div>;
}

function MNav({onNav, onMenu, onBag, cartCount, back}){
  return <div className="m-nav">
    {back ? <button onClick={back}><MI.back/></button> : <button onClick={onMenu}><MI.menu/></button>}
    <a className="logo" onClick={()=>onNav('home')}>
      <img src="../../assets/logos/shapermint-logo.svg" alt="Shapermint" height="22"/>
    </a>
    <div className="spacer"/>
    <button><MI.search/></button>
    <button onClick={onBag} style={{position:'relative'}}><MI.bag/>{cartCount > 0 && <span className="bag-count">{cartCount}</span>}</button>
  </div>;
}

function MDrawer({open, onClose, onNav}){
  return <div className={'m-drawer ' + (open?'open':'')}>
    <header>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <img src="../../assets/logos/shapermint-logo.svg" alt="Shapermint" height="22"/>
      </div>
      <button onClick={onClose} style={{background:'none',border:0,cursor:'pointer'}}><MI.close/></button>
    </header>
    <nav>
      <a className="sale" onClick={()=>{onClose(); onNav('plp');}}>Spring Sale</a>
      <a onClick={()=>{onClose(); onNav('plp');}}>Shapewear</a>
      <a onClick={()=>{onClose(); onNav('plp');}}>Bras</a>
      <a onClick={()=>{onClose(); onNav('plp');}}>Leggings</a>
      <a onClick={()=>{onClose(); onNav('plp');}}>Tanks &amp; Camis</a>
      <a onClick={()=>{onClose(); onNav('plp');}}>Best Sellers</a>
      <a onClick={onClose}>Sign In</a>
      <a onClick={onClose}>Track Order</a>
    </nav>
  </div>;
}

function MHome({onNav, onPick}){
  return <>
    <section className="m-hero">
      <div className="img"/>
      <div style={{display:'inline-block',background:'var(--coral-500)',color:'#fff',padding:'3px 8px',borderRadius:2,fontSize:11,fontWeight:700,marginBottom:10,letterSpacing:'.04em'}}>SPRING SALE · UP TO 40% OFF</div>
      <h1>Shape what you love.</h1>
      <p>Real shapewear for every body. Loved by 1M+ women.</p>
      <button className="btn btn-primary wide" onClick={()=>onNav('plp')}>Shop the Sale</button>
    </section>
    <section className="m-section">
      <h2>Shop By Category</h2>
      <div className="m-cat-scroll">
        {[{t:'Shapewear',img:'../../assets/hp-empetua.png'},{t:'Bras',img:'../../assets/grid-a.png'},{t:'Leggings',img:'../../assets/grid-b.png'},{t:'Tanks & Camis',img:'../../assets/lifestyle.jpg'}].map(c =>
          <a key={c.t} className="m-cat" style={{backgroundImage:`url(${c.img})`}} onClick={()=>onNav('plp')}><span>{c.t}</span></a>
        )}
      </div>
    </section>
    <div className="m-featured">
      <span className="lbl">As Featured In</span>
      <div className="row">
        <span className="brand">FORBES</span><span className="brand">COSMO</span><span className="brand">Glamour</span><span className="brand">PEOPLE</span>
      </div>
    </div>
    <section className="m-section" style={{background:'var(--coral-050)'}}>
      <h2>Best Sellers</h2>
      <div className="m-prod-grid">{PRODUCTS.map(p => <MTile key={p.id} p={p} onClick={()=>onPick(p)}/>)}</div>
    </section>
  </>;
}

function MPDP({p, onBack, onAdd}){
  const [color, setColor] = useState(0);
  const [size, setSize] = useState('M');
  const [thumb, setThumb] = useState(0);
  const imgs = [p.img, '../../assets/product-hero.png', '../../assets/lifestyle.jpg'];
  return <div className="m-pdp">
    <div className="main-img"><img src={imgs[thumb]} alt=""/></div>
    <div className="thumbs">
      {imgs.map((src,i) => <button key={i} className={thumb===i?'sel':''} onClick={()=>setThumb(i)}><img src={src}/></button>)}
    </div>
    <div className="info">
      <div className="brand">Empetua®</div>
      <h1>{p.title}</h1>
      <div className="rating"><span className="stars">★★★★★</span><span>4.8</span><a style={{color:'var(--fg-2)',textDecoration:'underline'}}>12,403 reviews</a></div>
      <div className="price-big">
        {p.strike ? <>
          <span className="sale">${p.price.toFixed(2)}</span><span className="strike">${p.strike.toFixed(2)}</span>
          <span style={{background:'var(--danger)',color:'#fff',padding:'2px 6px',borderRadius:2,fontSize:11,fontWeight:700}}>SAVE {Math.round((1-p.price/p.strike)*100)}%</span>
        </> : <span className="sale" style={{color:'var(--ink-900)'}}>${p.price.toFixed(2)}</span>}
      </div>
      <div className="label">Color: {['Black','Sand','Wine','Navy','Mint','White'][color]}</div>
      <div className="color-row">
        {(p.colors||['#000','#D3AB91','#7A3A3E','#3E4A63','#5EAD9B','#fff']).map((c,i)=>
          <div key={i} className={'color-dot '+(i===color?'sel':'')} style={{background:c}} onClick={()=>setColor(i)}/>
        )}
      </div>
      <div className="label" style={{display:'flex',justifyContent:'space-between'}}><span>Size</span><a style={{textDecoration:'underline',color:'var(--fg-2)',fontWeight:400}}>Calculate your size</a></div>
      <div className="size-row">
        {['XS','S','M','L','XL','2X','3X','4X'].map(s => <div key={s} className={'size-chip '+(size===s?'sel':'')} onClick={()=>setSize(s)}>{s}</div>)}
      </div>
    </div>
    <div className="m-pdp perks" style={{marginTop:0}}>
      <div>✓ Free shipping over $50</div>
      <div>✓ 60-day free returns &amp; exchanges</div>
      <div>★ Fit As Expected: 100%</div>
    </div>
    <div className="m-sticky">
      <button className="btn btn-primary wide" onClick={()=>onAdd({...p, color:['Black','Sand','Wine','Navy','Mint','White'][color], size, qty:1, key: `${p.id}-${color}-${size}`})}>
        Add to Cart — ${p.price.toFixed(2)}
      </button>
    </div>
  </div>;
}

function MCart({items, onNav, onQty, onRemove}){
  const sub = items.reduce((a,b)=>a+b.price*b.qty,0);
  return <div>
    <div style={{padding:'20px 16px 8px'}}>
      <h2 style={{fontSize:24,fontWeight:700,marginBottom:4}}>Your Cart</h2>
      <div style={{fontSize:13,color:'var(--fg-3)'}}>{items.length} item{items.length!==1?'s':''}</div>
    </div>
    {items.length===0 && <div style={{padding:40,textAlign:'center',color:'var(--fg-3)'}}>Your cart is empty.<div style={{marginTop:14}}><button className="btn btn-outline" onClick={()=>onNav('home')}>Keep shopping</button></div></div>}
    {items.map(it =>
      <div className="m-cart-row" key={it.key}>
        <img src={it.img} alt=""/>
        <div>
          <div className="title">{it.title}</div>
          <div className="meta">{it.color} · {it.size}</div>
          <div style={{marginTop:8}}>
            <div className="qty">
              <button onClick={()=>onQty(it.key,Math.max(1,it.qty-1))}>−</button>
              <span>{it.qty}</span>
              <button onClick={()=>onQty(it.key,it.qty+1)}>+</button>
            </div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'space-between'}}>
          <button onClick={()=>onRemove(it.key)} style={{background:'none',border:0,cursor:'pointer',fontSize:13,color:'var(--fg-3)'}}>✕</button>
          <div className="price">${(it.price*it.qty).toFixed(2)}</div>
        </div>
      </div>
    )}
    {items.length>0 && <div style={{padding:16}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:14,padding:'6px 0'}}><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:14,padding:'6px 0',color:'var(--mint-700)'}}><span>Shipping</span><span>{sub>50?'Free':'$5.90'}</span></div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:18,fontWeight:700,padding:'10px 0 16px',borderTop:'1px solid var(--ink-200)',marginTop:8}}><span>Total</span><span>${(sub+(sub>50?0:5.9)).toFixed(2)}</span></div>
      <button className="btn btn-primary wide">Checkout Securely</button>
    </div>}
  </div>;
}

function App(){
  const [route, setRoute] = useState(() => localStorage.getItem('shm.m.route') || 'home');
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => localStorage.setItem('shm.m.route', route), [route]);
  function pick(p){ setProduct(p); setRoute('pdp'); window.scrollTo(0,0); }
  function add(it){ setCart(c => { const e = c.find(x=>x.key===it.key); return e ? c.map(x=>x.key===it.key?{...x,qty:x.qty+it.qty}:x) : [...c, it]; }); setRoute('cart'); }
  return <div className="m-frame" data-screen-label={`SHM mobile / ${route}`}>
    <div className="m-promo">Get an Extra 10% OFF — LOVE10</div>
    <MNav onNav={(r)=>{setRoute(r);window.scrollTo(0,0);}}
      onMenu={()=>setDrawer(true)} onBag={()=>setRoute('cart')}
      cartCount={cart.reduce((a,b)=>a+b.qty,0)}
      back={route==='pdp' ? ()=>setRoute('home') : null}/>
    {route==='home' && <MHome onNav={(r)=>{setRoute(r);window.scrollTo(0,0);}} onPick={pick}/>}
    {route==='plp' && <section className="m-section"><h2>Shapewear</h2><div className="m-prod-grid">{PRODUCTS.map(p=><MTile key={p.id} p={p} onClick={()=>pick(p)}/>)}</div></section>}
    {route==='pdp' && product && <MPDP p={product} onBack={()=>setRoute('home')} onAdd={add}/>}
    {route==='cart' && <MCart items={cart} onNav={setRoute} onQty={(k,q)=>setCart(c=>c.map(x=>x.key===k?{...x,qty:q}:x))} onRemove={(k)=>setCart(c=>c.filter(x=>x.key!==k))}/>}
    <MDrawer open={drawer} onClose={()=>setDrawer(false)} onNav={setRoute}/>
  </div>;
}

Object.assign(window, { App, MTile, MNav, MDrawer, MHome, MPDP, MCart });
