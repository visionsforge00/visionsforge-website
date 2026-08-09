      window.addEventListener("load", () =>
        setTimeout(() => {
          document.querySelectorAll(".ht .ln span").forEach((s, i) =>
            setTimeout(() => {
              s.style.transform = "translateY(0)";
              s.style.transition = "transform .78s cubic-bezier(.16,1,.3,1)";
            }, i * 60),
          );
        }, 80),
      );
      const rv = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("vis");
          }),
        { threshold: 0.1 },
      );
      document.querySelectorAll(".rv").forEach((el) => rv.observe(el));
      const co = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target,
              t = +el.dataset.target,
              s = el.dataset.suffix || "";
            let c = 0;
            const step = t / 60;
            const iv = setInterval(() => {
              c = Math.min(c + step, t);
              el.textContent = Math.floor(c) + s;
              if (c >= t) {
                clearInterval(iv);
                el.dataset.counted = "1";
              }
            }, 25);
            co.unobserve(el);
          });
        },
        { threshold: 0.5 },
      );
      document
        .querySelectorAll("[data-target]")
        .forEach((el) => co.observe(el));
      setTimeout(
        () =>
          document.querySelectorAll("[data-target]").forEach((el) => {
            if (!el.dataset.counted) co.observe(el);
          }),
        800,
      );
      document.querySelectorAll(".sc").forEach((c) => {
        c.addEventListener(
          "mousemove",
          (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty(
              "--mx",
              ((e.clientX - r.left) / r.width) * 100 + "%",
            );
            c.style.setProperty(
              "--my",
              ((e.clientY - r.top) / r.height) * 100 + "%",
            );
          },
          { passive: true },
        );
      });
