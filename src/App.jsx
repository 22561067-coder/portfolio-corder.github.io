import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Header } from "./Layout";
import Subpage from "./Subpage";
import tteokwikiPreview from "./assets/tteokwiki-preview.png";
const projects = [
  { number: "01", title: "TEST", year: "2026", category: "WEB / JAVASCRIPT", image: tteokwikiPreview, imageAlt: "떡위키 메인 페이지 — 인기 떡과 추천 정보" },
  { number: "02", title: "TEST", year: "2026", category: "GAME / JAVASCRIPT" },
  { number: "03", title: "TEST", year: "2025", category: "WEB / REACT" },
  { number: "04", title: "TEST", year: "2025", category: "INTERACTION / JS" },
];
const skills = [["HTML / CSS",35],["JAVASCRIPT",30],["REACT",25],["SVG",20],["UI / INTERACTION",55]];
const motion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
function Home() {
  const appRef = useRef(null);
  const trackRef = useRef(null);
  const [position, setPosition] = useState({ start: true, end: false });
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const repeat = entry.target.matches(".skills-heading, .skill-item");
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          entry.target.classList.add("is-visible");
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat && !entry.isIntersecting) {
          entry.target.classList.remove("is-visible");
        }
      });
    }, { threshold: [0, 0.15] });
    appRef.current.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    const track = trackRef.current;
    const update = () => setPosition({start: track.scrollLeft <= 1, end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2});
    const resize = new ResizeObserver(update);
    resize.observe(track);
    const wheel = event => {
      if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const max = track.scrollWidth - track.clientWidth;
      if ((event.deltaY > 0 && track.scrollLeft < max - 1) || (event.deltaY < 0 && track.scrollLeft > 1)) {
        event.preventDefault();
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
        track.scrollBy({left: event.deltaY * unit * 1.4, behavior: motion()});
      }
    };
    track.addEventListener("wheel", wheel, {passive:false});
    track.addEventListener("scroll", update, {passive:true});
    return () => { observer.disconnect(); resize.disconnect(); track.removeEventListener("wheel",wheel); track.removeEventListener("scroll",update); };
  }, []);
  const move = direction => {
    const track = trackRef.current;
    track.scrollBy({left: direction * (track.querySelector(".project").getBoundingClientRect().width + 25), behavior: motion()});
  };
  return (
    <div className="app" ref={appRef} id="top">
      <Header />
      <main tabIndex={-1}>
        <section className="hero">
          <h1><span>BUILT BY DOING</span></h1>
          <div className="hero-bottom"><p>윤서진<br/>2026 WEB PORTFOLIO</p><a className="scroll-cue" href="#work">EXPLORE WORK <span aria-hidden="true">↓</span></a></div>
        </section>
        <section className="skills" id="about">
          <div className="skills-heading reveal"><span>SKILLS</span></div>
          <div className="skills-list">{skills.map(([name,level],index) => (
            <div className="skill-item reveal" key={name} style={{"--delay":`${index * 65}ms`}}>
              <div className="skill-info"><span>{name}</span><span>{level}%</span></div>
              <div className="skill-bar"><div className="skill-level" style={{width:`${level}%`}} /></div>
            </div>
          ))}</div>
        </section>
        <section className="portfolio" id="work">
          <div className="section-title reveal"><span>SELECTED WORK / 01 — 04</span><div className="track-controls">
            <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="이전 프로젝트" aria-controls="project-track">←</button>
            <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="다음 프로젝트" aria-controls="project-track">→</button>
          </div></div>
          <div className="project-track" id="project-track" ref={trackRef} tabIndex={0} role="region" aria-label="프로젝트 목록. 좌우 방향키로 이동할 수 있습니다.">
            {projects.map(project => <article className="project" key={project.number}>
              <div className={`project-image${project.image ? " has-preview" : ""}`}>{project.image ? <img className="project-preview" src={project.image} alt={project.imageAlt} loading="lazy" width="2502" height="1418" /> : <><div className="image-grid"/><span className="project-number">{project.number}</span><span className="view-project">IN PROGRESS</span></>}</div>
              <div className="project-info"><div className="project-main"><h2>{project.title}</h2></div><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div></div>
            </article>)}
          </div>
        </section>
      </main>
      <footer id="contact" className="reveal"><div className="footer-info"><span>윤서진</span><span>Programer</span><a href="mailto:22561067@kaywon.ac.kr">22561067@kaywon.ac.kr ↗</a></div><a href="#top" className="logo">BACK TO TOP ↑</a></footer>
    </div>
  );
}
function App() {
  const [page, setPage] = useState(() => getPage());
  useEffect(() => {
    const navigate = () => {
      const next = getPage();
      setPage(next);
      if (window.location.hash.startsWith("#/")) {
        window.scrollTo({ top: 0, behavior: "instant" });
        requestAnimationFrame(() => document.querySelector("main")?.focus({ preventScroll: true }));
      }
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  useEffect(() => {
    document.title = `${page === "home" ? "Portfolio" : page.toUpperCase()} — 윤서진`;
  }, [page]);
  return page === "home" ? <Home /> : <Subpage key={page} page={page} />;
}
function getPage() {
  const route = window.location.hash;
  return route === "#/about" ? "about" : route === "#/contact" ? "contact" : "home";
}
export default App;
