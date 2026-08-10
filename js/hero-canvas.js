      (function () {
        const cv = document.getElementById("hc");
        if (!cv) return;
        const ctx = cv.getContext("2d");
        let W,
          H,
          t = 0,
          pts = [],
          paused = false;
        document.addEventListener("visibilitychange", () => {
          paused = document.hidden;
        });
        function resize() {
          W = cv.width = cv.offsetWidth;
          H = cv.height = cv.offsetHeight;
        }
        window.addEventListener("resize", resize, { passive: true });
        resize();
        const N = innerWidth < 768 ? 35 : 60;
        for (let i = 0; i < N; i++) {
          const th = Math.acos(-1 + (2 * i) / N),
            ph = Math.sqrt(N * Math.PI) * th;
          pts.push({
            ox: Math.sin(th) * Math.cos(ph),
            oy: Math.sin(th) * Math.sin(ph),
            oz: Math.cos(th),
          });
        }
        function draw() {
          if (paused) {
            requestAnimationFrame(draw);
            return;
          }
          ctx.clearRect(0, 0, W, H);
          const cx = W / 2,
            cy = H / 2,
            R = Math.min(W, H) * 0.36;
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.2);
          g.addColorStop(0, "rgba(0,229,200,.13)");
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
          ctx.fill();
          const pr = pts.map((p) => {
            const ct = Math.cos(t),
              st = Math.sin(t),
              x1 = p.ox * ct - p.oz * st,
              z1 = p.ox * st + p.oz * ct;
            const cr = Math.cos(t * 0.3),
              sr = Math.sin(t * 0.3),
              y2 = p.oy * cr - z1 * sr,
              z2 = p.oy * sr + z1 * cr;
            const sc = 1 / (1.5 - z2 * 0.4);
            return { sx: cx + x1 * R * sc, sy: cy + y2 * R * sc, z: z2, s: sc };
          });
          for (let i = 0; i < pr.length; i++)
            for (let j = i + 1; j < pr.length; j++) {
              const a = pr[i],
                b = pr[j],
                dx = pts[i].ox - pts[j].ox,
                dy = pts[i].oy - pts[j].oy,
                dz = pts[i].oz - pts[j].oz;
              if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.4) {
                ctx.beginPath();
                ctx.strokeStyle =
                  "rgba(0,229,200," + (((a.z + b.z) / 2 + 1) / 2) * 0.23 + ")";
                ctx.lineWidth = 0.5;
                ctx.moveTo(a.sx, a.sy);
                ctx.lineTo(b.sx, b.sy);
                ctx.stroke();
              }
            }
          pr.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, p.s * 2.5, 0, Math.PI * 2);
            ctx.fillStyle =
              "rgba(0,229,200," + (0.27 + ((p.z + 1) / 2) * 0.6) + ")";
            ctx.fill();
          });
          t += 0.006;
          requestAnimationFrame(draw);
        }
        draw();
      })();
