      (function () {
        const nav = document.getElementById("nav");
        const mm = document.getElementById("mm");
        let last = 0;
        let ticking = false;

        function onScroll() {
          const s = Math.max(scrollY, 0);

          s > 80
            ? nav.classList.add("scrolled")
            : nav.classList.remove("scrolled");

          // Hide/show nav based on scroll direction.
          // - Any upward scroll (even a few px) reveals the nav immediately.
          // - Downward scroll past the nav's own height hides it.
          // - Keep it visible near the top and while the mobile menu is open.
          const menuOpen = mm && mm.classList.contains("open");
          const goingDown = s > last;
          const goingUp = s < last;

          if (menuOpen || s < 120) {
            nav.classList.remove("nav-hidden");
          } else if (goingDown) {
            nav.classList.add("nav-hidden");
          } else if (goingUp) {
            nav.classList.remove("nav-hidden");
          }

          last = s;
          ticking = false;
        }

        window.addEventListener(
          "scroll",
          () => {
            if (!ticking) {
              requestAnimationFrame(onScroll);
              ticking = true;
            }
          },
          { passive: true },
        );
        const hb = document.getElementById("hbg");
        function closeMM() {
          if (!mm) return;
          mm.classList.remove("open");
          hb && hb.classList.remove("active");
          hb && hb.setAttribute("aria-expanded", "false");
        }
        function openMM() {
          if (!mm) return;
          mm.classList.add("open");
          hb && hb.classList.add("active");
          hb && hb.setAttribute("aria-expanded", "true");
        }
        if (hb)
          hb.addEventListener("click", (e) => {
            e.stopPropagation();
            mm && mm.classList.contains("open") ? closeMM() : openMM();
          });
        document
          .querySelectorAll(".ml")
          .forEach((a) => a.addEventListener("click", closeMM));
        document.addEventListener("click", (e) => {
          if (
            mm &&
            mm.classList.contains("open") &&
            !mm.contains(e.target) &&
            e.target !== hb &&
            !(hb && hb.contains(e.target))
          )
            closeMM();
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeMM();
        });
        window.addEventListener(
          "resize",
          () => {
            if (innerWidth > 1024) closeMM();
          },
          { passive: true },
        );
      })();
