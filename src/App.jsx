import { useEffect, useRef } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "TEST",
    year: "2026",
    category: "WEB / JAVASCRIPT",
   
  },
  {
    number: "02",
    title: "TEST",
    year: "2026",
    category: "GAME / JAVASCRIPT",
   
  },
  {
    number: "03",
    title: "TEST",
    year: "2025",
    category: "WEB / REACT",
   
  },
  {
    number: "04",
    title: "TEST",
    year: "2025",
    category: "INTERACTION / JS",
    
  },
];

function App() {
  const projectTrackRef = useRef(null);

  useEffect(() => {
    const track = projectTrackRef.current;

    if (!track) return;

   const handleWheel = (e) => {
  const track = projectTrackRef.current;

  if (!track) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  const currentScroll = track.scrollLeft;

  const canScrollRight = currentScroll < maxScroll - 1;
  const canScrollLeft = currentScroll > 1;

  if (e.deltaY > 0 && canScrollRight) {
    e.preventDefault();

    track.scrollBy({
      left: e.deltaY * 6,
      behavior: "smooth",
    });
  }

  if (e.deltaY < 0 && canScrollLeft) {
    e.preventDefault();

    track.scrollBy({
      left: e.deltaY * 6,
      behavior: "smooth",
    });
  }
};
    track.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      track.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          PORTFOLIO
        </div>

        <div className="header-right">
          <span>ABOUT</span>
          <span>CONTACT</span>
        </div>
      </header>


      <main>

        <section className="hero">

          

          <h1>
            CRAFTING
            <br />
            <span>BUILT BY DOING</span> EXPERIENCES.
          </h1>

          <div className="hero-bottom">

            <p>
              윤서진 
              <br />
              2026 WEB PORTFOLIO
            </p>
          </div>

        </section>


        <section className="portfolio">

          <div className="section-title">
            <span>01 — 04</span>
          </div>


          {/* ★ 이 영역에서 마우스 휠 → 가로 이동 */}
          <div
            className="project-track"
            ref={projectTrackRef}
          >

            {projects.map((project) => (

              <article
                className="project"
                key={project.number}
              >

                {/* 프로젝트 이미지 */}

                <div className="project-image">

                  <div className="image-grid" />

                  <span className="project-number">
                    {project.number}
                  </span>

                  <span className="view-project">
                    VIEW PROJECT ↗
                  </span>

                </div>


                {/* 이미지 + 이름 + 연도와 한몸 */}

                <div className="project-info">

                  <div className="project-main">

                    <h2>
                      {project.title}
                    </h2>

                   

                  </div>


                  <div className="project-meta">

                    <span>
                      {project.category}
                    </span>

                    <span>
                      {project.year}
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>


      <footer>
  <div className="footer-info">
    <span>윤서진</span>
    <span>Programer</span>
    <span>22561067@kaywon.ac.kr</span>
  </div>

  <span className="logo">PORTFOLIO</span>
</footer>

    </div>
  );
}

export default App;