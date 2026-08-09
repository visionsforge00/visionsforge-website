      (function () {
        const nav = document.getElementById("nav");
        let last = 0;
        window.addEventListener(
          "scroll",
          () => {
            const s = scrollY;
            s > 80
              ? nav.classList.add("scrolled")
              : nav.classList.remove("scrolled");
            last = s;
          },
          { passive: true },
        );
        const hb = document.getElementById("hbg"),
          mm = document.getElementById("mm");
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
