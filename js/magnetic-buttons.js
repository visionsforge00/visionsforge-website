      (function () {
        document.querySelectorAll(".bp,.nav-cta,.fsub").forEach((btn) => {
          let rect = null;
          btn.addEventListener(
            "mouseenter",
            () => {
              rect = btn.getBoundingClientRect();
            },
            { passive: true },
          );
          btn.addEventListener(
            "mousemove",
            (e) => {
              if (!rect) rect = btn.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
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
            rect = null;
          });
        });
      })();
