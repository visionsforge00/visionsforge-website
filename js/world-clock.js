      function uc() {
        const n = new Date(),
          f = (d) =>
            d.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
        const e1 = document.getElementById("c1"),
          e2 = document.getElementById("c2"),
          e3 = document.getElementById("c3");
        if (e1)
          e1.textContent = f(
            new Date(n.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })),
          );
        if (e2)
          e2.textContent = f(
            new Date(
              n.toLocaleString("en-US", { timeZone: "America/New_York" }),
            ),
          );
        if (e3)
          e3.textContent = f(
            new Date(
              n.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
            ),
          );
      }
      uc();
      setInterval(uc, 1000);
