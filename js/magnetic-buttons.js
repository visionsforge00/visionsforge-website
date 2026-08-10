      (function () {
        document.querySelectorAll(".bp,.nav-cta,.fsub").forEach((btn) => {
          btn.addEventListener(
            "mousemove",
            (e) => {
              const r = btn.getBoundingClientRect();
              const x = e.clientX - r.left - r.width / 2;
              const y = e.clientY - r.top - r.height / 2;
              btn.style.transform =
                "translate(" +
                x * 0.12 +
                "px," +
                y * 0.12 +
                "px) translateY(-2px)";
            },
            { passive: true },
          );
          btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
          });
        });
      })();
