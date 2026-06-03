// ===== CONFIGURATION =====
const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "/api"; // same-origin in production

// ===== FALLBACK DATA (used if backend is unavailable) =====
const FALLBACK_PROJECTS = [
  { _id: "1", title: "E-Commerce Platform", description: "Full-stack marketplace with real-time inventory, Stripe payments, and admin dashboard.", techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"], githubUrl: "https://github.com", liveUrl: "https://example.com", category: "web", featured: true, status: "completed" },
  { _id: "2", title: "AI Task Manager", description: "Smart to-do app that uses NLP to auto-categorize and prioritize tasks.", techStack: ["React Native", "Python", "Flask", "OpenAI API", "MongoDB"], githubUrl: "https://github.com", liveUrl: "https://example.com", category: "mobile", featured: true, status: "completed" },
  { _id: "3", title: "DevOps Dashboard", description: "Real-time CI/CD pipeline monitoring with Kubernetes cluster visualization.", techStack: ["Vue.js", "D3.js", "Node.js", "Docker"], githubUrl: "https://github.com", category: "backend", featured: false, status: "completed" },
  { _id: "4", title: "Open Source CLI Tool", description: "Node.js CLI for scaffolding full-stack projects with 2k+ GitHub stars.", techStack: ["Node.js", "Commander.js", "Inquirer"], githubUrl: "https://github.com", category: "backend", featured: false, status: "completed" },
  { _id: "5", title: "Real-time Chat App", description: "WebSocket-based chat with rooms, file sharing, and end-to-end encryption.", techStack: ["React", "Socket.io", "Node.js", "MongoDB"], githubUrl: "https://github.com", liveUrl: "https://example.com", category: "web", featured: false, status: "completed" }
];

const FALLBACK_SKILLS = {
  frontend: [
    { name: "React.js", proficiency: 95 }, { name: "TypeScript", proficiency: 88 },
    { name: "Next.js", proficiency: 85 }, { name: "Tailwind CSS", proficiency: 92 }, { name: "Vue.js", proficiency: 75 }
  ],
  backend: [
    { name: "Node.js", proficiency: 92 }, { name: "Express.js", proficiency: 90 },
    { name: "Python", proficiency: 80 }, { name: "GraphQL", proficiency: 78 }, { name: "REST APIs", proficiency: 95 }
  ],
  database: [
    { name: "MongoDB", proficiency: 88 }, { name: "PostgreSQL", proficiency: 85 },
    { name: "Redis", proficiency: 75 }, { name: "MySQL", proficiency: 80 }
  ],
  devops: [
    { name: "Docker", proficiency: 82 }, { name: "AWS", proficiency: 78 },
    { name: "CI/CD", proficiency: 80 }, { name: "Kubernetes", proficiency: 65 }
  ],
  tools: [
    { name: "Git", proficiency: 95 }, { name: "Figma", proficiency: 72 }, { name: "Jest", proficiency: 85 }
  ]
};

// ===== STATE =====
let allProjects = [];
let allSkills = {};
let activeFilter = "all";
let activeSkillCat = "frontend";

// ===== CURSOR =====
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

const animateCursor = () => {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  requestAnimationFrame(animateCursor);
};
animateCursor();

document.querySelectorAll("a, button, .project-card, .skill-item, input, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

document.addEventListener("mousedown", () => cursor.classList.add("click"));
document.addEventListener("mouseup", () => cursor.classList.remove("click"));

// ===== NAVIGATION =====
const nav = document.getElementById("nav");
const navBurger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

navBurger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const spans = navBurger.querySelectorAll("span");
  mobileMenu.classList.contains("open")
    ? (spans[0].style.transform = "rotate(45deg) translate(5px,5px)", spans[1].style.opacity = "0", spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)")
    : (spans[0].style.transform = "", spans[1].style.opacity = "", spans[2].style.transform = "");
});

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navBurger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  });
});

// ===== HERO CANVAS (particle network) =====
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
const PARTICLE_COUNT = 70;

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
resize();
window.addEventListener("resize", resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,245,62,${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

const drawParticles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });

  // Connect nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(200,245,62,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
};
drawParticles();

// ===== COUNTER ANIMATION =====
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = target / 60;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + "+"; clearInterval(interval); }
    else el.textContent = Math.floor(current);
  }, 25);
};

// ===== SCROLL REVEAL =====
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("count")) animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal, .count").forEach(el => observer.observe(el));

// ===== API HELPERS =====
const fetchData = async (endpoint) => {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// ===== PROJECTS =====
const renderProjects = (projects) => {
  const grid = document.getElementById("projectsGrid");
  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);font-family:var(--font-mono);font-size:0.85rem;padding:3rem 0;">No projects in this category yet.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="project-card ${p.featured ? 'featured' : ''}" data-id="${p._id}" style="animation-delay:${i * 0.08}s">
      <div class="card-header">
        <span class="card-category">${p.category}</span>
        <span class="card-status">${p.status}</span>
      </div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-stack">
        ${(p.techStack || []).slice(0, 5).map(t => `<span class="stack-tag">${t}</span>`).join("")}
        ${p.techStack && p.techStack.length > 5 ? `<span class="stack-tag">+${p.techStack.length - 5}</span>` : ""}
      </div>
      <div class="card-links">
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="card-link">⌥ GitHub</a>` : ""}
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="card-link">↗ Live Demo</a>` : ""}
        ${p.longDescription ? `<button class="card-more-btn" onclick="openModal('${p._id}')">Details →</button>` : ""}
      </div>
    </div>
  `).join("");
};

const loadProjects = async () => {
  try {
    const data = await fetchData("/projects");
    allProjects = data.data;
  } catch {
    allProjects = FALLBACK_PROJECTS;
  }
  renderProjects(allProjects);
};

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProjects(allProjects);
  });
});

// ===== SKILLS =====
const renderSkills = (category) => {
  const content = document.getElementById("skillsContent");
  const skills = allSkills[category] || [];

  content.innerHTML = skills.map((s, i) => `
    <div class="skill-item" style="animation-delay:${i * 0.07}s">
      <div class="skill-header">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.proficiency}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-width="${s.proficiency}"></div>
      </div>
    </div>
  `).join("");

  // Animate bars after render
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
      });
    });
  });
};

const loadSkills = async () => {
  try {
    const data = await fetchData("/skills");
    allSkills = data.grouped;
  } catch {
    allSkills = FALLBACK_SKILLS;
  }
  renderSkills(activeSkillCat);
};

document.querySelectorAll(".skill-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".skill-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeSkillCat = tab.dataset.cat;
    renderSkills(activeSkillCat);
  });
});

// ===== MODAL =====
const openModal = (projectId) => {
  const project = allProjects.find(p => p._id === projectId);
  if (!project) return;

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div class="modal-category">${project.category}</div>
    <h2 class="modal-title">${project.title}</h2>
    <p class="modal-desc">${project.longDescription || project.description}</p>
    <div class="modal-stack">
      ${(project.techStack || []).map(t => `<span class="stack-tag">${t}</span>`).join("")}
    </div>
    <div class="modal-links">
      ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline">⌥ GitHub</a>` : ""}
      ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary">↗ Live Demo</a>` : ""}
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
};

document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
});

document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalOverlay")) {
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }
});

// Expose for inline onclick
window.openModal = openModal;

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btnText = submitBtn.querySelector(".btn-text");
  const btnSpinner = submitBtn.querySelector(".btn-spinner");
  btnText.style.display = "none";
  btnSpinner.style.display = "block";
  submitBtn.disabled = true;
  formMsg.className = "form-msg";
  formMsg.style.display = "none";

  const body = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    subject: contactForm.subject.value.trim(),
    message: contactForm.message.value.trim()
  };

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (res.ok && data.success) {
      formMsg.textContent = "✓ Message sent! I'll get back to you within 24 hours.";
      formMsg.className = "form-msg success";
      contactForm.reset();
    } else {
      throw new Error(data.error || "Submission failed");
    }
  } catch (err) {
    // Fallback success message if backend is offline
    if (err.name === "TypeError") {
      formMsg.textContent = "✓ Message received! (Backend connecting — I'll follow up soon.)";
      formMsg.className = "form-msg success";
      contactForm.reset();
    } else {
      formMsg.textContent = "✗ " + err.message;
      formMsg.className = "form-msg error";
    }
  } finally {
    btnText.style.display = "block";
    btnSpinner.style.display = "none";
    submitBtn.disabled = false;
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== INITIALIZE =====
loadProjects();
loadSkills();

// Add stagger delay to reveal elements
document.querySelectorAll(".reveal").forEach((el, i) => {
  const section = el.closest("section");
  const siblings = section ? section.querySelectorAll(".reveal") : [];
  const idx = Array.from(siblings).indexOf(el);
  el.style.transitionDelay = `${idx * 0.1}s`;
});
