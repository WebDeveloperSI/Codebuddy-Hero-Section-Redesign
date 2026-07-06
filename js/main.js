/* CodeBuddy Hero — Standalone JS
   Handles: lucide icons, animated counters, canvas modules,
   connecting lines, mouse parallax, ambient particles. */

(function () {
  const MODULES = [
    // Ring 0 — inner (always visible)
    { label: "CRM",           icon: "users",          ring: 0, angle:   0, tint: "emerald" },
    { label: "Scheduling",    icon: "calendar",       ring: 0, angle:  45, tint: "electric" },
    { label: "Payments",      icon: "credit-card",    ring: 0, angle:  90, tint: "emerald" },
    { label: "Analytics",     icon: "bar-chart-3",    ring: 0, angle: 135, tint: "violet" },
    { label: "Orders",        icon: "clipboard-list", ring: 0, angle: 180, tint: "emerald" },
    { label: "AI Assistant",  icon: "sparkles",       ring: 0, angle: 225, tint: "electric" },
    { label: "Dashboard",     icon: "layout-dashboard", ring: 0, angle: 270, tint: "violet" },
    { label: "Mobile App",    icon: "smartphone",     ring: 0, angle: 315, tint: "emerald" },
    // Ring 1 — middle (sm+)
    { label: "Inventory",     icon: "package",        ring: 1, angle:  22, tint: "violet" },
    { label: "Marketplace",   icon: "shopping-bag",   ring: 1, angle:  67, tint: "emerald" },
    { label: "Invoices",      icon: "receipt-text",   ring: 1, angle: 112, tint: "electric" },
    { label: "Subscriptions", icon: "repeat",         ring: 1, angle: 157, tint: "emerald" },
    { label: "Projects",      icon: "folder-kanban",  ring: 1, angle: 202, tint: "violet" },
    { label: "Vendors",       icon: "store",          ring: 1, angle: 247, tint: "electric" },
    { label: "Employees",     icon: "user",           ring: 1, angle: 292, tint: "emerald" },
    { label: "Automation",    icon: "cog",            ring: 1, angle: 337, tint: "violet" },
    // Ring 2 — outer (lg+)
    { label: "Manufacturing", icon: "factory",        ring: 2, angle:  10, tint: "emerald" },
    { label: "Transportation",icon: "truck",          ring: 2, angle:  55, tint: "electric" },
    { label: "Properties",    icon: "building-2",     ring: 2, angle: 100, tint: "violet" },
    { label: "Quotes",        icon: "file-text",      ring: 2, angle: 145, tint: "emerald" },
    { label: "Installations", icon: "wrench",         ring: 2, angle: 190, tint: "electric" },
    { label: "Contractors",   icon: "hard-hat",       ring: 2, angle: 235, tint: "violet" },
    { label: "Referrals",     icon: "share-2",        ring: 2, angle: 280, tint: "emerald" },
    { label: "Customers",     icon: "badge-check",    ring: 2, angle: 325, tint: "electric" },
  ];
  const RADII = [22, 36, 47]; // % of canvas

  function polar(cx, cy, r, deg) {
    const a = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  function buildCanvas() {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    const svg = canvas.querySelector(".canvas__lines");

    MODULES.forEach((m, i) => {
      const p = polar(50, 50, RADII[m.ring], m.angle);
      // Line
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", "50");
      line.setAttribute("y1", "50");
      line.setAttribute("x2", p.x);
      line.setAttribute("y2", p.y);
      const grad = m.tint === "emerald" ? "url(#gEmerald)" : m.tint === "violet" ? "url(#gViolet)" : "url(#gElectric)";
      line.setAttribute("stroke", grad);
      line.setAttribute("stroke-width", m.ring === 0 ? "0.28" : "0.2");
      line.setAttribute("stroke-dasharray", "1 2");
      line.setAttribute("opacity", m.ring === 0 ? "0.9" : m.ring === 1 ? "0.55" : "0.35");
      line.style.animation = `dash-flow ${8 + (i % 5)}s linear infinite`;
      svg.appendChild(line);

      // Chip
      const chip = document.createElement("div");
      chip.className = `mod mod--${m.tint} mod--r${m.ring}`;
      chip.style.left = p.x + "%";
      chip.style.top  = p.y + "%";
      chip.style.animationDelay = (0.1 + i * 0.04) + "s";
      chip.style.animationDuration = (6 + (m.ring % 3)) + "s";
      chip.innerHTML = `<i data-lucide="${m.icon}"></i><span>${m.label}</span>`;
      chip.dataset.px = (m.x > 50 ? 1 : -1);
      chip.dataset.py = (m.y > 50 ? 1 : -1);
      chip.dataset.depth = (0.3 + m.ring * 0.15);
      canvas.appendChild(chip);
    });

    // Mouse parallax
    let raf = 0, tx = 0, ty = 0;
    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top)  / r.height - 0.5;
      tx = cx * 14; ty = cy * 14;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    canvas.addEventListener("mouseleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
    function apply() {
      raf = 0;
      canvas.querySelectorAll(".mod").forEach((el, i) => {
        const dx = tx * (parseFloat(el.dataset.px) || 1) * (parseFloat(el.dataset.depth) || 0.5);
        const dy = ty * (parseFloat(el.dataset.py) || 1) * (parseFloat(el.dataset.depth) || 0.5);
        el.style.marginLeft = dx + "px";
        el.style.marginTop  = dy + "px";
      });
      const orb = canvas.querySelector(".orb");
      if (orb) { orb.style.marginLeft = (tx * 0.3) + "px"; orb.style.marginTop = (ty * 0.3) + "px"; }
    }
  }

  function buildParticles() {
    const wrap = document.getElementById("particles");
    if (!wrap) return;
    for (let i = 0; i < 26; i++) {
      const s = document.createElement("span");
      s.className = "particle";
      const left = (i * 37.7) % 100;
      const top  = (i * 53.3) % 100;
      const size = 1 + ((i * 7) % 3);
      const delay = (i % 10) * 0.6;
      const dur = 9 + ((i * 3) % 8);
      s.style.left = left + "%";
      s.style.top  = top + "%";
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.animation = `particle-float ${dur}s ease-in-out ${delay}s infinite`;
      wrap.appendChild(s);
    }
  }

  function animateCounters() {
    const els = document.querySelectorAll("[data-count]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        const to = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const dur = 1600;
        function tick(t) {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * to).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  }

  function init() {
    buildParticles();
    buildCanvas();
    animateCounters();
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
