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
        lenis.on("scroll", ({ progress, scroll }) => {
          if (prog) prog.style.width = progress * 100 + "%";
          const sections = document.querySelectorAll("section[id]");
          const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
          let current = "";
          sections.forEach((s) => {
            if (scroll >= s.offsetTop - 120) current = s.id;
          });
          navLinks.forEach((a) => {
            a.classList.toggle(
              "nav-active",
              a.getAttribute("href") === "#" + current,
            );
          });
          const btt = document.getElementById("btt");
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
        const bttEl = document.getElementById("btt");
        if (bttEl) bttEl.onclick = () => lenis.scrollTo(0, { duration: 1.1 });
      });
