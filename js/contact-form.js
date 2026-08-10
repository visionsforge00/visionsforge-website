      (function () {
        const btn = document.getElementById("contact-send");
        if (!btn) return;
        const SCRIPT_URL =
          "https://script.google.com/macros/s/AKfycbw64qdzixPoaidso7QEgTsDWWlEcrbb6mkyQ4v-CzqxBwOu143ZWdYQ8HfDe2CD1ugM/exec";
        const GMAIL_RE = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        function markInvalid(el) {
          if (!el) return;
          el.style.borderColor = "#ff5252";
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = "shakeField .4s ease";
          el.addEventListener(
            "animationend",
            () => {
              el.style.animation = "";
            },
            { once: true },
          );
        }
        function clearInvalid(el) {
          if (!el) return;
          el.style.borderColor = "";
        }
        btn.addEventListener("click", async function () {
          const nmEl = document.getElementById("cf-name");
          const emEl = document.getElementById("cf-email");
          const phEl = document.getElementById("cf-phone");
          const sbEl = document.getElementById("cf-subject");
          const mgEl = document.querySelector(".cf .fta");
          [nmEl, emEl, sbEl, mgEl].forEach(clearInvalid);
          const nm = nmEl ? nmEl.value.trim() : "";
          const em = emEl ? emEl.value.trim() : "";
          const ph = phEl ? phEl.value.trim() : "";
          const sb = sbEl ? sbEl.value.trim() : "";
          const mg = mgEl ? mgEl.value.trim() : "";
          if (!nm) {
            markInvalid(nmEl);
            showToast("⚠️ Please enter your name.", "error");
            nmEl && nmEl.focus();
            return;
          }
          if (!em) {
            markInvalid(emEl);
            showToast("⚠️ Please enter your email.", "error");
            emEl && emEl.focus();
            return;
          }
          if (!GMAIL_RE.test(em)) {
            markInvalid(emEl);
            showToast("⚠️ Please enter the correct Gmail account.", "error");
            emEl && emEl.focus();
            return;
          }
          if (!sb) {
            markInvalid(sbEl);
            showToast("⚠️ Please enter a subject/title.", "error");
            sbEl && sbEl.focus();
            return;
          }
          if (!mg) {
            markInvalid(mgEl);
            showToast("⚠️ Please write your message.", "error");
            mgEl && mgEl.focus();
            return;
          }
          btn.textContent = "Sending...";
          btn.disabled = true;
          btn.style.opacity = "0.75";
          const params = new URLSearchParams({
            name: nm,
            email: em,
            phone: ph || "Not provided",
            subject: sb,
            message: mg,
            timestamp: new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            source: "VisionsForge Website",
          });
          const fullURL = SCRIPT_URL + "?" + params.toString();
          try {
            await fetch(fullURL, { method: "GET", mode: "no-cors" });
            [nmEl, emEl, phEl, sbEl, mgEl].forEach((el) => {
              if (el) el.value = "";
            });
            showToast(
              "✅ Message sent successfully! We will reply within 24 hours.",
              "success",
            );
          } catch (err) {
            showToast("⚠️ Something went wrong. Please try again.", "error");
          }
          btn.textContent = "Send Message →";
          btn.disabled = false;
          btn.style.opacity = "1";
        });
        [
          document.getElementById("cf-name"),
          document.getElementById("cf-email"),
          document.getElementById("cf-subject"),
          document.querySelector(".cf .fta"),
        ].forEach((el) => {
          if (el) el.addEventListener("input", () => clearInvalid(el));
        });
        function showToast(msg, type) {
          const t = document.getElementById("cf-msg");
          if (!t) return;
          t.textContent = msg;
          t.className = "cf-msg show " + (type === "error" ? "error" : "success");
          t.scrollIntoView({ behavior: "smooth", block: "nearest" });
          clearTimeout(t._hideTimer);
          t._hideTimer = setTimeout(() => t.classList.remove("show"), 5000);
        }
      })();
