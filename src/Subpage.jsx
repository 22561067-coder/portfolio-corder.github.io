import { Header, Footer } from "./Layout";
const email = "22561067@kaywon.ac.kr";

export default function Subpage({ page }) {
  const about = page === "about";
  return <div className="app subpage">
    <Header page={page} />
    <main id="page-content" tabIndex={-1}>
      <section className={about ? "hero about-hero" : "hero contact-hero"}>
        <h1><span>{about ? "ALWAYS BUILDING" : "LET’S CONNECT"}</span></h1>
        {about && <div className="hero-bottom subpage-intro"><span className="subpage-label">윤서진 / WEB DEVELOPER</span><p>직접 만들고, 움직여 보고, 더 나은 방법을 찾습니다. 작은 시도를 하나씩 쌓아가는 윤서진입니다.</p></div>}
        {!about && <div className="hero-bottom subpage-intro contact-intro"><h2 className="subpage-label">EMAIL</h2><div className="detail-body"><a className="contact-email" href={`mailto:${email}`}>{email}<span aria-hidden="true">↗</span></a><p className="contact-note">클릭하면 기본 메일 앱으로 연결됩니다.</p></div></div>}
      </section>
      {about ? <>
        <section className="detail-section"><h2 className="subpage-label">HOW I WORK</h2><div className="detail-body"><h3>만들면서 배우고,<br/>경험으로 다듬습니다.</h3><p>HTML과 CSS로 화면의 구조를 잡고, JavaScript와 React로 인터랙션을 더합니다. 눈에 보이는 형태와 사용했을 때의 느낌을 함께 고민합니다.</p><div className="about-tags">{["HTML / CSS", "JAVASCRIPT", "REACT", "SVG", "UI / INTERACTION"].map(skill => <span key={skill}>{skill}</span>)}</div></div></section>
        <section className="detail-section"><h2 className="subpage-label">WHAT I FOCUS ON</h2><div className="detail-body focus-list">{[["01","명확한 화면","정보의 순서와 여백을 생각하며 읽기 편한 화면을 만듭니다."],["02","자연스러운 움직임","작은 호버와 스크롤 효과로 사용자의 행동에 반응합니다."],["03","꾸준한 개선","직접 사용하고 확인하며, 어색한 부분을 조금씩 고칩니다."]].map(([number,title,description]) => <div className="focus-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></section>
      </> : null}
    </main>
    <Footer />
  </div>;
}
