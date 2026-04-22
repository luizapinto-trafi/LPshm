/* global React, ProductTile, Btn, I */
const { useState: useS1 } = React;

window.PRODUCTS = [
  { id: 1, title: 'Empetua® All-Day Every-Day High-Waisted Shaper Panty', strike: 69.90, price: 48.93,
    img: '../../assets/product-hero.png', badge: {text:'-30%'},
    colors:['#000','#D3AB91','#7A3A3E','#3E4A63','#5EAD9B','#fff'],
    sub: 'Bodyshaper', rating: 4.8, reviews: 12403 },
  { id: 2, title: 'Truekind® Daily Comfort Wireless Shaper Bra', price: 29.90,
    img: '../../assets/product-hero.png', colors:['#000','#D3AB91','#fff'], rating: 4.7, reviews: 8832 },
  { id: 3, title: 'Empetua® Tummy-Control High-Waist Leggings', strike: 59.90, price: 39.90,
    img: '../../assets/product-hero.png', badge:{text:'BEST SELLER', dark:true}, colors:['#000','#3E4A63'], rating: 4.9, reviews: 5012 },
  { id: 4, title: 'Truekind® Shaping Cami with Built-In Bra', price: 34.90,
    img: '../../assets/product-hero.png', colors:['#000','#D3AB91','#7A3A3E'], rating: 4.6, reviews: 2201 },
  { id: 5, title: 'Empetua® All Day Every Day Scoop Neck Cami', strike: 39.90, price: 27.93,
    img: '../../assets/product-hero.png', badge:{text:'-30%'}, colors:['#000','#fff','#D3AB91','#7A3A3E'], rating:4.7, reviews: 1980 },
  { id: 6, title: 'Shapermint Essentials High-Waisted Shorts', price: 24.90,
    img: '../../assets/product-hero.png', colors:['#000','#3E4A63'], rating: 4.5, reviews: 1103 },
  { id: 7, title: 'Truekind® Wireless Lift Bra', strike: 44.90, price: 32.43,
    img: '../../assets/product-hero.png', badge:{text:'-28%'}, colors:['#000','#D3AB91','#fff'], rating:4.6, reviews: 904 },
  { id: 8, title: 'Empetua® Open-Bust Mid-Thigh Bodysuit', price: 54.90,
    img: '../../assets/product-hero.png', colors:['#000','#D3AB91','#7A3A3E','#3E4A63'], rating: 4.8, reviews: 3210 },
];

// Home
function Home({onNav, onPickProduct}){
  const P = window.PRODUCTS;
  const cats = [
    {t:'Shapewear', img:'../../assets/hp-empetua.png'},
    {t:'Bras', img:'../../assets/grid-a.png'},
    {t:'Leggings', img:'../../assets/grid-b.png'},
    {t:'Tanks & Camis', img:'../../assets/lifestyle.jpg'},
  ];
  return (<>
    <section className="shm-hero">
      <div className="copy">
        <div style={{display:'inline-block',background:'var(--coral-500)',color:'#fff',padding:'4px 10px',borderRadius:4,fontSize:12,fontWeight:700,letterSpacing:'.04em',marginBottom:20}}>SPRING SALE · UP TO 40% OFF</div>
        <h1>Shape what you love.</h1>
        <p className="sub">Real shapewear for every body. Feel snatched all day in our signature Empetua® High-Waisted Shaper Panty — loved by 1M+ women.</p>
        <div style={{display:'flex',gap:12}}>
          <Btn onClick={()=>onNav('plp')}>Shop the Sale</Btn>
          <Btn variant="outline" onClick={()=>onNav('plp')}>Explore Empetua®</Btn>
        </div>
      </div>
      <div className="img" style={{backgroundImage:'url(../../assets/banner-hero.png)'}}/>
    </section>

    <FeaturedIn/>

    <section className="shm-section">
      <h2>Shop By Category</h2>
      <div className="shm-cat-grid">
        {cats.map(c => (
          <a key={c.t} className="shm-cat" style={{backgroundImage:`url(${c.img})`}} onClick={()=>onNav('plp')}>
            <span>{c.t}</span>
          </a>
        ))}
      </div>
    </section>

    <section className="shm-section alt-cream">
      <h2>Best Sellers</h2>
      <div className="shm-prod-grid">
        {P.slice(0,4).map(p => <ProductTile key={p.id} p={p} onClick={()=>onPickProduct(p)}/>)}
      </div>
    </section>

    <section className="shm-section">
      <h2>Just In</h2>
      <div className="shm-prod-grid">
        {P.slice(4,8).map(p => <ProductTile key={p.id} p={p} onClick={()=>onPickProduct(p)}/>)}
      </div>
    </section>
  </>);
}

// PLP
function PLP({onNav, onPickProduct}){
  const P = window.PRODUCTS;
  return (
    <div className="plp">
      <aside className="rail">
        <h4>Category</h4>
        <label><input type="checkbox" defaultChecked/> Shapewear <span style={{color:'var(--fg-3)', marginLeft:'auto'}}>128</span></label>
        <label><input type="checkbox"/> Bodysuits <span style={{color:'var(--fg-3)', marginLeft:'auto'}}>34</span></label>
        <label><input type="checkbox"/> Leggings <span style={{color:'var(--fg-3)', marginLeft:'auto'}}>22</span></label>
        <h4>Size</h4>
        {['XS','S','M','L','XL','2X','3X','4X'].map(s => <label key={s}><input type="checkbox"/> {s}</label>)}
        <h4>Color</h4>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {['#000','#D3AB91','#fff','#7A3A3E','#3E4A63','#5EAD9B'].map((c,i)=>
            <span key={i} style={{width:24,height:24,borderRadius:999,background:c,border:'1px solid var(--ink-200)',cursor:'pointer'}}/>
          )}
        </div>
        <h4>Price</h4>
        <label><input type="checkbox"/> Under $25</label>
        <label><input type="checkbox"/> $25 – $50</label>
        <label><input type="checkbox"/> $50 – $100</label>
      </aside>
      <div>
        <div className="breadcrumb"><a onClick={()=>onNav('home')}>Home</a> <I.chevR s={10}/> <span>Shapewear</span></div>
        <h1>Shapewear</h1>
        <div className="count">128 products · Sort by: Most Popular</div>
        <div className="shm-prod-grid">
          {P.map(p => <ProductTile key={p.id} p={p} onClick={()=>onPickProduct(p)}/>)}
        </div>
      </div>
    </div>
  );
}

// PDP
function PDP({p, onNav, onAdd}){
  const [color, setColor] = useS1(0);
  const [size, setSize]   = useS1('M');
  const [qty, setQty]     = useS1(1);
  const [thumb, setThumb] = useS1(0);
  const imgs = [p.img, '../../assets/product-hero.png', '../../assets/lifestyle.jpg', '../../assets/banner-hero.png'];
  return (
    <>
    <div className="breadcrumb" style={{padding:'14px 60px 0', fontSize:13, color:'var(--fg-3)'}}>
      <a onClick={()=>onNav('home')} style={{color:'var(--fg-2)', cursor:'pointer'}}>Back to the results</a> | <span>Shapewear</span> | <span>{p.title}</span>
    </div>
    <div className="pdp">
      <div className="gallery">
        <div className="thumbs">
          {imgs.map((src,i) => (
            <button key={i} className={thumb===i?'sel':''} onClick={()=>setThumb(i)}><img src={src} alt=""/></button>
          ))}
        </div>
        <div className="main-img"><img src={imgs[thumb]} alt={p.title}/></div>
      </div>
      <div>
        <div style={{fontSize:12, color:'var(--fg-3)', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:700, marginBottom:8}}>Empetua®</div>
        <h1>{p.title}</h1>
        <div className="sub">{p.sub || 'Shapewear'}</div>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span>{p.rating || 4.8}</span>
          <a style={{color:'var(--fg-2)', textDecoration:'underline', cursor:'pointer'}}>{(p.reviews||1000).toLocaleString()} reviews</a>
        </div>
        <div className="price-big">
          {p.strike ? <>
            <span className="sale">${p.price.toFixed(2)}</span>
            <span className="strike">${p.strike.toFixed(2)}</span>
            <span style={{background:'var(--danger)', color:'#fff', padding:'2px 8px', borderRadius:2, fontSize:12, fontWeight:700}}>SAVE {Math.round((1-p.price/p.strike)*100)}%</span>
          </> : <span className="sale" style={{color:'var(--ink-900)'}}>${p.price.toFixed(2)}</span>}
        </div>

        <div className="selectors">
          <div>
            <div className="label">Color: <span style={{fontWeight:400, color:'var(--fg-2)'}}>{['Black','Sand','Wine','Navy','Mint','White'][color]}</span></div>
            <div className="color-row">
              {(p.colors || ['#000','#D3AB91','#7A3A3E','#3E4A63','#5EAD9B','#fff']).map((c,i)=>
                <div key={i} className={'color-dot ' + (i===color?'sel':'')} style={{background:c}} onClick={()=>setColor(i)}/>
              )}
            </div>
          </div>
          <div>
            <div className="label">Size · <a style={{fontWeight:400, textDecoration:'underline', cursor:'pointer', color:'var(--fg-2)'}}>Calculate your size</a></div>
            <div className="size-row">
              {['XS','S','M','L','XL','2X','3X','4X'].map(s =>
                <div key={s} className={'size-chip ' + (size===s?'sel':'')} onClick={()=>setSize(s)}>{s}</div>
              )}
            </div>
          </div>
          <div>
            <div className="label">Quantity</div>
            <QtyStepper value={qty} onChange={setQty}/>
          </div>
        </div>

        <div className="ctas">
          <Btn wide onClick={()=>onAdd({...p, color:['Black','Sand','Wine','Navy','Mint','White'][color], size, qty})}>Add to Cart — ${(p.price*qty).toFixed(2)}</Btn>
        </div>

        <div className="perks">
          <div style={{display:'flex', gap:10, alignItems:'center'}}><I.truck/> Free shipping on orders over $50</div>
          <div style={{display:'flex', gap:10, alignItems:'center'}}><I.lock/> 60-day free returns &amp; exchanges</div>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>★ Fit As Expected: 100% based on 12,403 reviews</div>
        </div>
      </div>
    </div>
    </>
  );
}

// Checkout
function Checkout({items, onNav}){
  const sub = items.reduce((a,b)=>a + b.price*b.qty, 0);
  const ship = sub > 50 ? 0 : 5.90;
  return (
    <div className="checkout">
      <div>
        <h2>Contact</h2>
        <div className="form-grid">
          <label className="field full">Email <input placeholder="you@domain.com"/></label>
        </div>
        <h2 style={{marginTop:40}}>Shipping Address</h2>
        <div className="form-grid">
          <label className="field">First name <input placeholder="Jane"/></label>
          <label className="field">Last name <input placeholder="Doe"/></label>
          <label className="field full">Street address <input placeholder="123 Main St"/></label>
          <label className="field">City <input placeholder="Brooklyn"/></label>
          <label className="field">ZIP <input placeholder="11201"/></label>
        </div>
        <h2 style={{marginTop:40}}>Payment</h2>
        <div style={{display:'flex', gap:12, marginBottom:16}}>
          <div style={{border:'2px solid var(--ink-900)', borderRadius:8, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, fontWeight:600}}>
            <img src="../../assets/payment-card.png" alt="" style={{height:24}}/> Credit Card
          </div>
          <div style={{border:'1px solid var(--ink-300)', borderRadius:8, padding:'10px 14px', display:'flex', alignItems:'center', gap:10}}>
            <img src="../../assets/payment-paypal.png" alt="" style={{height:24}}/> PayPal
          </div>
        </div>
        <div className="form-grid">
          <label className="field full">Card number <input placeholder="4242 4242 4242 4242"/></label>
          <label className="field">Expiration <input placeholder="MM / YY"/></label>
          <label className="field">CVV <input placeholder="123"/></label>
        </div>
        <p style={{fontSize:12, color:'var(--fg-3)', marginTop:18}}>Fields marked as (*) are required. All transactions are secure and encrypted.</p>
        <div style={{marginTop:24}}>
          <Btn wide onClick={()=>onNav('home')}><I.lock/> &nbsp; Pay ${(sub+ship).toFixed(2)}</Btn>
        </div>
      </div>
      <aside className="summary">
        <h3 style={{fontSize:18, marginBottom:18}}>Order Summary</h3>
        {items.map(it => (
          <div key={it.id} style={{display:'flex', gap:12, padding:'10px 0', borderBottom:'1px solid var(--ink-200)'}}>
            <img src={it.img} alt="" style={{width:64, height:64, borderRadius:4, objectFit:'cover'}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, lineHeight:'18px'}}>{it.title}</div>
              <div style={{fontSize:12, color:'var(--fg-3)', marginTop:4}}>{it.color} · {it.size} · Qty {it.qty}</div>
            </div>
            <div style={{fontWeight:700, color:'var(--coral-500)'}}>${(it.price*it.qty).toFixed(2)}</div>
          </div>
        ))}
        <div className="row" style={{marginTop:14}}><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
        <div className="row"><span>Shipping</span><span>{ship===0?'Free':'$'+ship.toFixed(2)}</span></div>
        <div className="row"><span>LOVE10 (−10%)</span><span style={{color:'var(--coral-500)'}}>−${(sub*0.1).toFixed(2)}</span></div>
        <div className="row total"><span>Total</span><span>${(sub*0.9 + ship).toFixed(2)}</span></div>
      </aside>
    </div>
  );
}

Object.assign(window, { Home, PLP, PDP, Checkout });
