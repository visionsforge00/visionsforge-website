      (function () {
        const b = document.getElementById("ld-b"),
          p = document.getElementById("ld-p");
        if (b) b.style.width = "100%";
        if (p) p.textContent = "100%";
        document.body.classList.add("loaded");
      })();
