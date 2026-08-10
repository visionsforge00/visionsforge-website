      (function () {
        const tog = document.getElementById("cbt"),
          box = document.getElementById("cbx"),
          cl = document.getElementById("cbcl");
        const msgs = document.getElementById("cbm"),
          qrd = document.getElementById("cbqr");
        const inp = document.getElementById("cbi"),
          snd = document.getElementById("cbs");
        if (!tog || !box || !msgs || !qrd || !inp || !snd) return;
        const MENU = [
          "🤖 AI Agents",
          "💻 Full Stack Web CRM",
          "⚙️ Workflow Automation",
          "⏱️ Timelines",
          "📞 Contact Us",
          "🏢 About VisionsForge",
        ];
        const KB = [
          {
            id: "ai_agents",
            triggers: [
              "ai agent",
              "ai agents",
              "🤖 ai agents",
              "artificial intelligence",
              "chatbot",
              "bot",
              "llm",
              "gemini",
              "claude",
              "gpt",
            ],
            reply:
              "<b>AI Agent Development</b> is our core specialty at VisionsForge.\n\nNishant builds custom AI agents powered by <b>Google Gemini, Claude &amp; GPT-4</b>:\n\n✅ <b>Customer Support Bot</b> — Handles queries 24/7 automatically\n✅ <b>Lead Qualification Agent</b> — Engages &amp; qualifies leads in real time\n✅ <b>Sales Follow-up Agent</b> — Automated outreach &amp; follow-ups\n✅ <b>Internal Knowledge Bot</b> — Answers team questions from your docs\n\nWant to know more?",
            next: [
              "💬 Customer Support Bot",
              "🎯 Lead Gen Agent",
              "🏢 About VisionsForge",
              "🏠 Main Menu",
            ],
          },
          {
            id: "webcrm",
            triggers: [
              "full stack web crm",
              "web crm",
              "crm",
              "custom crm",
              "full stack web",
              "crm development",
              "crm software",
            ],
            reply:
              "<b>Full Stack Web CRM Development</b> — Tailor-made CRM systems built for speed &amp; scalability.\n\nWe build custom Web CRMs with:\n• Lead &amp; Pipeline Management\n• Customer Contact Management\n• Automated Follow-ups &amp; Email Sequences\n• Custom Analytics Dashboards\n• Role-based Access Control\n\n<b>Tech Stack:</b> React, Next.js, Node.js, PostgreSQL, TypeScript.\n\nFull source code &amp; IP ownership transferred to you!",
            next: ["🤖 AI Agents", "📞 Contact Us", "🏠 Main Menu"],
          },
          {
            id: "automation",
            triggers: [
              "workflow",
              "automation",
              "automate",
              "process",
              "repetitive",
              "⚙️ workflow automation",
            ],
            reply:
              "<b>Workflow Automation</b> — Eliminate manual, repetitive tasks.\n\n🔄 CRM Automation — Auto-update leads &amp; deals\n📧 Email Sequences — Personalised outreach\n📦 Invoice &amp; Order Flows — Instant automated tracking\n🔗 App Integrations — Connect 500+ apps seamlessly",
            next: ["⏱️ Timelines", "📞 Contact Us", "🏠 Main Menu"],
          },
          {
            id: "contact",
            triggers: [
              "contact",
              "📞 contact us",
              "reach",
              "email",
              "phone",
              "whatsapp",
              "instagram",
            ],
            reply:
              "<b>Get in touch with Nishant Malakar &amp; VisionsForge</b> 🤝\n\n📧 <b>Email:</b> contact@visionsforge.in\n📱 <b>WhatsApp:</b> +91 96698 80949\n📸 <b>Instagram:</b> @visionsforge.io\n📍 <b>Location:</b> Indore, India\n\nResponse within 24 hours!",
            next: ["🏠 Main Menu"],
          },
          {
            id: "about",
            triggers: ["about", "about visionsforge", "nishant", "founder"],
            reply:
              "<b>Nishant Malakar — Founder of VisionsForge</b>\n\nBased in Indore, India.\nSpecialising in <b>AI Automation, Custom Full Stack Web CRM Solutions, and AI Agents</b> for businesses worldwide.",
            next: ["🤖 AI Agents", "💻 Full Stack Web CRM", "🏠 Main Menu"],
          },
        ];
        function showMenu() {
          setQR(MENU);
        }
        function addMsg(content, type) {
          const d = document.createElement("div");
          d.className = "cm " + type;
          if (type === "bot") d.innerHTML = content.replace(/\n/g, "<br/>");
          else d.textContent = content;
          msgs.appendChild(d);
          msgs.scrollTop = msgs.scrollHeight;
        }
        function showTyping() {
          const d = document.createElement("div");
          d.className = "cm typing2";
          d.innerHTML =
            '<div class="tdots"><span></span><span></span><span></span></div>';
          msgs.appendChild(d);
          msgs.scrollTop = msgs.scrollHeight;
          return d;
        }
        function setQR(items) {
          qrd.innerHTML = "";
          items.forEach((label) => {
            const b = document.createElement("button");
            b.className = "qb";
            b.textContent = label;
            b.addEventListener("click", () => send(label));
            qrd.appendChild(b);
          });
        }
        function findMatch(txt) {
          const t = txt.toLowerCase().trim();
          for (const item of KB) {
            if (item.triggers.some((tr) => t.includes(tr.toLowerCase())))
              return item;
          }
          return null;
        }
        function send(txt) {
          if (!txt.trim()) return;
          inp.value = "";
          if (txt === "🏠 Main Menu") {
            addMsg("🏠 Main Menu", "user");
            setTimeout(() => {
              addMsg("Here's what I can help you with 👇", "bot");
              showMenu();
            }, 400);
            return;
          }
          addMsg(txt, "user");
          const ty = showTyping();
          setTimeout(() => {
            ty.remove();
            const found = findMatch(txt);
            if (found) {
              addMsg(found.reply, "bot");
              setQR(found.next || ["🏠 Main Menu"]);
            } else {
              addMsg(
                "I'm here to help with <b>VisionsForge services, AI Automation &amp; Full Stack Web CRM projects</b>. 😊",
                "bot",
              );
              setTimeout(showMenu, 200);
            }
          }, 600);
        }
        showMenu();
        tog.addEventListener("click", () => {
          box.classList.toggle("open");
          if (box.classList.contains("open"))
            setTimeout(() => inp.focus(), 400);
        });
        cl.addEventListener("click", () => box.classList.remove("open"));
        snd.addEventListener("click", () => send(inp.value));
        inp.addEventListener("keydown", (e) => {
          if (e.key === "Enter") send(inp.value);
        });
      })();
