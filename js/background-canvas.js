      (function () {
        const cv = document.getElementById("bg-canvas");
        if (!cv) return;
        if (
          window.matchMedia &&
          (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            window.matchMedia("(max-width: 768px)").matches)
        ) {
          // Skip the animated particle background on mobile: it's a
          // continuous requestAnimationFrame loop with per-frame gradient
          // and O(n^2) line-distance checks, which costs real CPU/battery
          // on phones for a background decoration. CSS supplies a static
          // gradient fallback instead (see #bg-canvas in style.css).
          cv.style.display = "none";
          return;
        }
        const ctx = cv.getContext("2d");
        let W,
          H,
          ns = [],
          stars = [],
          t = 0,
          mx = -1000,
          my = -1000,
          paused = false,
          lastT = performance.now();
        document.addEventListener("visibilitychange", () => {
          paused = document.hidden;
        });
        function resize() {
          W = cv.width = innerWidth;
          H = cv.height = innerHeight;
        }
        window.addEventListener(
          "resize",
          () => {
            resize();
            init();
          },
          { passive: true },
        );
        resize();
        document.addEventListener(
          "mousemove",
          (e) => {
            mx = e.clientX;
            my = e.clientY;
          },
          { passive: true },
        );
        document.addEventListener(
          "mouseleave",
          () => {
            mx = -1000;
            my = -1000;
          },
          { passive: true },
        );
        function init() {
          ns = [];
          stars = [];
          const isMobile = W < 768;
          const n = isMobile ? 18 : Math.min(42, Math.floor((W * H) / 24000));
          const colors = [
            "rgba(0,229,200,",
            "rgba(59,130,246,",
            "rgba(124,58,255,",
          ];
          for (let i = 0; i < n; i++) {
            ns.push({
              x: Math.random() * W,
              y: Math.random() * H,
              vx: (Math.random() - 0.5) * 0.45,
              vy: (Math.random() - 0.5) * 0.45,
              r: Math.random() * 2 + 1.2,
              color: colors[i % colors.length],
            });
          }
          const starCount = isMobile ? 15 : 35;
          for (let i = 0; i < starCount; i++) {
            stars.push({
              x: Math.random() * W,
              y: Math.random() * H,
              r: Math.random() * 0.9 + 0.2,
              a: Math.random() * 0.4 + 0.1,
            });
          }
        }
        init();
        function draw(nowTime) {
          if (paused) {
            requestAnimationFrame(draw);
            return;
          }
          const dt = Math.min((nowTime - lastT) / 1000, 0.05) || 0.016;
          lastT = nowTime;
          ctx.clearRect(0, 0, W, H);
          const g1 = ctx.createRadialGradient(
            W * 0.25,
            H * 0.25,
            0,
            W * 0.25,
            H * 0.25,
            W * 0.6,
          );
          g1.addColorStop(
            0,
            "rgba(0,229,200," + (0.05 + Math.sin(t * 0.6) * 0.02) + ")",
          );
          g1.addColorStop(1, "transparent");
          ctx.fillStyle = g1;
          ctx.fillRect(0, 0, W, H);
          const g2 = ctx.createRadialGradient(
            W * 0.75,
            H * 0.75,
            0,
            W * 0.75,
            H * 0.75,
            W * 0.5,
          );
          g2.addColorStop(
            0,
            "rgba(124,58,255," + (0.04 + Math.sin(t * 0.4 + 1) * 0.015) + ")",
          );
          g2.addColorStop(1, "transparent");
          ctx.fillStyle = g2;
          ctx.fillRect(0, 0, W, H);
          stars.forEach((s) => {
            s.a += 0.004 * (Math.random() - 0.5);
            s.a = Math.max(0.08, Math.min(0.55, s.a));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(232,244,248," + s.a + ")";
            ctx.fill();
          });
          ns.forEach((n) => {
            const dx = mx - n.x,
              dy = my - n.y,
              d = Math.sqrt(dx * dx + dy * dy);
            if (d < 180) {
              n.vx += (dx / d) * 0.08;
              n.vy += (dy / d) * 0.08;
            }
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.98;
            n.vy *= 0.98;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
          });
          const maxDist = 150;
          for (let i = 0; i < ns.length; i++) {
            for (let j = i + 1; j < ns.length; j++) {
              const dx = ns[i].x - ns[j].x,
                dy = ns[i].y - ns[j].y,
                d = Math.sqrt(dx * dx + dy * dy);
              if (d < maxDist) {
                const alpha = (1 - d / maxDist) * 0.22;
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,229,200," + alpha + ")";
                ctx.lineWidth = 0.7;
                ctx.moveTo(ns[i].x, ns[i].y);
                ctx.lineTo(ns[j].x, ns[j].y);
                ctx.stroke();
              }
            }
          }
          if (mx > 0 && my > 0) {
            ns.forEach((n) => {
              const dx = mx - n.x,
                dy = my - n.y,
                d = Math.sqrt(dx * dx + dy * dy);
              if (d < 160) {
                const alpha = (1 - d / 160) * 0.35;
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,229,200," + alpha + ")";
                ctx.lineWidth = 1.1;
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(mx, my);
                ctx.stroke();
              }
            });
          }
          ns.forEach((n) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = n.color + "0.75)";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00E5C8";
            ctx.fill();
            ctx.shadowBlur = 0;
          });
          t += dt;
          requestAnimationFrame(draw);
        }
        function start() {
          draw(performance.now());
        }
        if (document.readyState === "complete") {
          requestAnimationFrame(start);
        } else {
          window.addEventListener("load", () => requestAnimationFrame(start), {
            once: true,
          });
        }
      })();
