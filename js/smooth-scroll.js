      window.addEventListener("load", function () {
        if (typeof Lenis === "undefined") return;
        const lenis = new Lenis({
          duration: 1.0,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 1.8,
          wheelMultiplier: 1.1,
          infinite: false,
        });
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        const prog = document.getElementById("scroll-progress");
        const btt = document.getElementById("btt");
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        // Cache each section's offset once (and on resize) instead of
        // reading offsetTop on every scroll frame. Reading layout right
        // after writing prog.style.width was forcing a synchronous
        // reflow on every single scroll event.
        let sectionOffsets = [];
        function measureSections() {
          sectionOffsets = Array.from(sections).map((s) => ({
            id: s.id,
            top: s.offsetTop,
          }));
        }
        measureSections();
        window.addEventListener("resize", measureSections, { passive: true });

        lenis.on("scroll", ({ progress, scroll }) => {
          let current = "";
          for (let i = 0; i < sectionOffsets.length; i++) {
            if (scroll >= sectionOffsets[i].top - 120) current = sectionOffsets[i].id;
          }
          if (prog) prog.style.width = progress * 100 + "%";
          navLinks.forEach((a) => {
            a.classList.toggle(
              "nav-active",
              a.getAttribute("href") === "#" + current,
            );
          });
          if (btt) btt.classList.toggle("show", scroll > 400);
        });
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            const id = a.getAttribute("href");
            if (id === "#") {
              lenis.scrollTo(0, { duration: 1.1 });
              return;
            }
            const target = document.querySelector(id);
            if (target) lenis.scrollTo(target, { offset: -80, duration: 1.1 });
          });
        });
        if (btt) btt.onclick = () => lenis.scrollTo(0, { duration: 1.1 });
      });
