export function Header({ page = "home" }) {
  return <header className="header">
    <a className="logo" href="#/">PORTFOLIO</a>
    <nav className="header-right" aria-label="메인 메뉴">
      <a href="#/about" aria-current={page === "about" ? "page" : undefined}>ABOUT</a>
      <a href="#/contact" aria-current={page === "contact" ? "page" : undefined}>CONTACT</a>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="subpage-footer"><div className="footer-info"><span>윤서진</span><span>2026 WEB PORTFOLIO</span></div><a className="logo" href="#/">BACK TO HOME ↗</a></footer>;
}
