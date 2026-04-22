/* global React */
const { useState } = React;

// ── Icons ────────────────────────────────────────────────────────────
const I = {
  search: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  user: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>,
  bag: (p) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1.5 11a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.3-7-10.2A4 4 0 0 1 12 6a4 4 0 0 1 7 3.8C19 15.7 12 20 12 20z"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="currentColor"><path d="M12 2l3 6.8 7.4.6-5.7 4.9 1.8 7.2L12 17.8 5.5 21.5l1.8-7.2L1.6 9.4 9 8.8z"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>,
  truck: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="14" height="11"/><path d="M15 8h4l3 4v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>,
};

// ── Promo + Nav ──────────────────────────────────────────────────────
function PromoBar(){ return <div className="shm-promo">Get an Extra 10% OFF using LOVE10 at Checkout</div>; }
function UtilityBar(){ return (
  <div className="shm-utility">
    <span>Need help? 1-800-123-4567</span>
    <span>FREE SHIPPING OVER $50 &nbsp;·&nbsp; FREE EXCHANGES</span>
    <span>USD &middot; Track Order</span>
  </div>
);}

function Nav({ onNav, cartCount, onBagClick }){
  return (
    <div className="shm-nav">
      <a className="shm-logo" onClick={() => onNav('home')}>
        <div className="coin">S</div>
        <div className="word">Shapermint<span style={{color:'var(--ink-900)'}}>.</span></div>
      </a>
      <div className="shm-menu">
        <a onClick={() => onNav('plp')} className="sale">Spring Sale</a>
        <a onClick={() => onNav('plp')}>Shapewear</a>
        <a onClick={() => onNav('plp')}>Bras</a>
        <a onClick={() => onNav('plp')}>Leggings</a>
        <a onClick={() => onNav('plp')}>Tanks &amp; Camis</a>
        <a onClick={() => onNav('plp')}>Best Sellers</a>
      </div>
      <div className="shm-search">
        <I.search/>
        <input placeholder="Search products"/>
      </div>
      <div className="shm-nav-right">
        <button className="shm-icon-btn"><I.user/></button>
        <button className="shm-icon-btn"><I.heart/></button>
        <button className="shm-icon-btn shm-bag" onClick={onBagClick}>
          <I.bag/>
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────────
function Footer(){
  return (
    <footer className="shm-footer">
      <div className="cols">
        <div>
          <div className="shm-logo" style={{color:'#fff', marginBottom:16}}>
            <div className="coin">S</div>
            <div className="word" style={{color:'#fff'}}>Shapermint<span>.</span></div>
          </div>
          <p style={{color:'#D0D0D0', fontSize:14, lineHeight:'22px', maxWidth:320}}>
            Real shapewear for every body. Feel snatched all day in our signature Empetua® pieces.
          </p>
          <div className="shm-newsletter">
            <input placeholder="you@domain.com"/>
            <button className="btn btn-primary sm">Sign up</button>
          </div>
        </div>
        <div><h4>Shop</h4><a>Shapewear</a><a>Bras</a><a>Leggings</a><a>Tanks &amp; Camis</a><a>Best Sellers</a></div>
        <div><h4>Help</h4><a>Size Guide</a><a>Shipping</a><a>Returns</a><a>Contact Us</a></div>
        <div><h4>About</h4><a>Our Story</a><a>Reviews</a><a>Affiliates</a><a>Careers</a></div>
        <div><h4>Legal</h4><a>Terms</a><a>Privacy</a><a>Accessibility</a></div>
      </div>
      <div className="tail">
        <span>© Shapermint 2026 · A Trafilea brand</span>
        <span>Secure Checkout</span>
      </div>
    </footer>
  );
}

// ── Buttons ──────────────────────────────────────────────────────────
function Btn({variant='primary', size, wide, children, ...rest}){
  const cls = ['btn', `btn-${variant}`, size, wide && 'wide'].filter(Boolean).join(' ');
  return <button className={cls} {...rest}>{children}</button>;
}

// ── Product tile ─────────────────────────────────────────────────────
function ProductTile({p, onClick}){
  return (
    <div className="shm-tile" onClick={onClick}>
      <div className="img-wrap">
        <img src={p.img} alt={p.title}/>
        {p.badge && <span className={'tag ' + (p.badge.dark?'dark':'')}>{p.badge.text}</span>}
      </div>
      <h3>{p.title}</h3>
      <div className="prices">
        {p.strike ? <>
          <span className="strike">${p.strike.toFixed(2)}</span>
          <span className="sale">${p.price.toFixed(2)}</span>
        </> : <span className="price">${p.price.toFixed(2)}</span>}
      </div>
      {p.colors && <div className="swatches">
        {p.colors.slice(0,5).map((c,i)=> <span key={i} className="sw" style={{background:c, borderColor: c==='#fff'?'var(--ink-300)':'var(--ink-200)'}}/>)}
        {p.colors.length>5 && <span className="more">+{p.colors.length-5} more</span>}
      </div>}
    </div>
  );
}

// ── QTY ──────────────────────────────────────────────────────────────
function QtyStepper({value, onChange}){
  return (
    <div className="qty">
      <button onClick={()=>onChange(Math.max(1, value-1))}>−</button>
      <span>{value}</span>
      <button onClick={()=>onChange(value+1)}>+</button>
    </div>
  );
}

// ── Side cart ────────────────────────────────────────────────────────
function SideCart({open, items, onClose, onQty, onRemove, onCheckout}){
  const sub = items.reduce((a,b)=>a + b.price*b.qty, 0);
  return (<>
    <div className={'shm-scrim ' + (open?'open':'')} onClick={onClose}/>
    <aside className={'shm-sidecart ' + (open?'open':'')}>
      <header>
        <h3>Your Cart ({items.reduce((a,b)=>a+b.qty,0)})</h3>
        <button className="shm-icon-btn" onClick={onClose}><I.close/></button>
      </header>
      <div className="items">
        {items.length === 0 && <div style={{padding:'40px 0', textAlign:'center', color:'var(--fg-3)'}}>Your cart is empty.</div>}
        {items.map(item => (
          <div className="shm-cart-row" key={item.id}>
            <img src={item.img} alt=""/>
            <div>
              <div className="title">{item.title}</div>
              <div className="meta">{item.color} · {item.size}</div>
              <div style={{marginTop:8}}><QtyStepper value={item.qty} onChange={q=>onQty(item.id, q)}/></div>
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end'}}>
              <button className="shm-icon-btn" onClick={()=>onRemove(item.id)} style={{fontSize:12}}>✕</button>
              <div className="price">${(item.price*item.qty).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <div className="totals"><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
        <Btn variant="primary" wide onClick={onCheckout} disabled={items.length===0}>Checkout Securely</Btn>
        <div style={{textAlign:'center', marginTop:10, fontSize:12, color:'var(--fg-3)'}}>
          <I.lock s={12}/> &nbsp;Encrypted · Free returns within 60 days
        </div>
      </footer>
    </aside>
  </>);
}

// ── Featured strip ───────────────────────────────────────────────────
function FeaturedIn(){
  return (<div className="shm-featured">
    <span className="label">As Featured In</span>
    <span className="brand">FORBES</span>
    <span className="brand">COSMOPOLITAN</span>
    <span className="brand">Glamour</span>
    <span className="brand">PEOPLE</span>
    <span className="brand">Refinery29</span>
  </div>);
}

Object.assign(window, { I, PromoBar, UtilityBar, Nav, Footer, Btn, ProductTile, QtyStepper, SideCart, FeaturedIn });
