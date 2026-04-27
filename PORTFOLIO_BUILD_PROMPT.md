# Three.js Professional Portfolio — Build Prompt for AI
> For: **Mustafa Salah** — Full-Stack Software Engineer  
> Stack: HTML + CSS + JS (Vanilla) + Three.js  
> Output: Single `index.html` + `style.css` + `main.js` (or all-in-one `index.html`)

---

## 🧑‍💻 About the Developer

| Field | Value |
|---|---|
| Name | Mustafa Salah |
| Title | Full-Stack Software Engineer |
| Email | mostafamahmoud9500@gmail.com |
| Phone | +20 1010574543 |
| Location | Cairo, Egypt |
| LinkedIn | linkedin.com/in/mustafasalahxx/ |
| GitHub | github.com/MustafaSalahX |
| Status | Open to work |

**Summary:**  
Full-Stack Software Engineer specializing in Next.js, NestJS, and GraphQL with hands-on experience building production-ready systems including academic platforms, booking systems, and dynamic web applications. Skilled in scalable backend architecture, role-based access control, and database design using PostgreSQL and Docker.

---

## 🎨 Design Direction

- **Theme:** Dark background (`#0a0a0f`), neon accent (`#00f5a0` or electric blue `#00c3ff`), white text
- **Font:** `Space Mono` for code/mono elements + `Syne` for headings (Google Fonts)
- **Aesthetic:** Futuristic / Dark Tech / Developer Portfolio
- **Cursor:** Custom animated cursor
- **Scroll:** Smooth scroll behavior
- **Animations:** Fade-in on scroll using Intersection Observer

---

## 🌐 Three.js Scene (Hero Background)

Build an animated Three.js canvas as the full-screen hero background.

**Scene requirements:**
- Black/deep space background
- Floating **particle field** (1500–2000 small white/cyan dots) that slowly drift and rotate
- On **mouse move**, particles gently react / warp toward cursor position
- A subtle **wireframe icosahedron or torus knot** rotating slowly in the center-background
- Ambient soft glow using `PointLight` or bloom-like effect via additive blending
- Resize-responsive: canvas always fills viewport

**Three.js CDN to use:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

---

## 📐 Page Sections & Content

### 1. `<nav>` — Navigation Bar
- Fixed top navbar
- Logo: `MS.` (styled with accent color dot)
- Links: About · Skills · Projects · Contact
- Right side badge: `● Available for work` (pulsing green dot)
- On scroll: navbar gets `backdrop-filter: blur` + slight border

---

### 2. `#hero` — Hero Section
- Three.js canvas fills full viewport as background
- Overlay content (centered):
  - Small tag: `Full-Stack Engineer`
  - Large heading: `Mustafa` (white) + `Salah` (accent color)
  - Subline: `Building scalable systems with Next.js · NestJS · GraphQL`
  - Two CTA buttons: `View Work` (filled) + `Let's Talk` (ghost/outline)
  - Scroll indicator at bottom
- Floating code block (bottom-right corner, semi-transparent):
```js
const engineer = {
  name: "Mustafa Salah",
  stack: ["Next.js", "NestJS", "GraphQL"],
  status: "open to work" ✓
};
```

---

### 3. `#about` — About Section
- Section label: `01 / About`
- Two-column layout:
  - **Left:** Large heading `Who I Am` + paragraph with professional summary
  - **Right:** Stats grid (4 boxes):
    - `4+` Projects Delivered
    - `3+` Years Experience
    - `A+` Graduation Grade
    - `10+` Events Organized
- Below stats: two social links styled as tags → GitHub + LinkedIn

---

### 4. `#skills` — Technical Skills Section
- Section label: `02 / Skills`
- Heading: `Technical Arsenal`
- Display skills in **animated pill/tag cards** grouped by category:

| Category | Skills |
|---|---|
| Frontend | Next.js, React.js, Vue.js, Tailwind CSS, TypeScript, Responsive Design |
| Backend | Node.js, NestJS, Laravel, REST APIs, GraphQL, API Integration |
| Databases | PostgreSQL, SQL Server, NoSQL, TypeORM, Prisma, Redis |
| DevOps & Tools | Docker, Git, GitHub, CI/CD |
| Security & Auth | JWT, OAuth, RBAC |
| System Design | Scalable Architecture, Microservices, MVC Pattern |
| Methodology | Agile, Scrum |

- Each category has a colored label and its skills as rounded chips
- Chips have hover effect (glow/lift)

---

### 5. `#projects` — Projects Section
- Section label: `03 / Projects`
- Heading: `Selected Work`
- Display as **card grid** (2 columns on desktop, 1 on mobile)
- Each card has: Project title, tech stack tags, description, and a GitHub link icon

#### Project Cards:

**1. Academic Management System** *(Graduation Project — A+)*  
Stack: `Next.js` `NestJS` `GraphQL` `PostgreSQL` `Docker`  
Description: Complete academic platform covering student registration, course management, grading, and semester scheduling. Integrated MobiCash payment gateway.

**2. Scalable Wedding Booking System**  
Stack: `Next.js` `NestJS` `PostgreSQL` `Docker` `JWT` `RBAC`  
Description: Full booking platform with role-based access control for Admin and Super Admin roles. Built dedicated dashboards for operational management.

**3. Dynamic Wedding Invitation System**  
Stack: `Next.js` `Node.js` `PostgreSQL` `QR Code`  
Description: Personalized invitation platform with unique access links per guest and QR code functionality. Responsive UI supporting multiple simultaneous invitation instances.

**4. Jumana Law — Legal Website**  
Stack: `Vue.js` `Node.js`  
Description: Professional full-stack legal website for a live client. Improved UI/UX, page performance, cross-device accessibility, and SEO.

**5. Laravel Blog System**  
Stack: `Laravel` `PHP` `MySQL`  
Description: Multi-role blog platform (Admin, Writer, Visitor) with full CRUD content management, secure authentication, and MVC architecture.

- Cards animate in on scroll (fade up)
- Hover: card lifts with accent border glow

---

### 6. `#experience` — Experience Section
- Section label: `04 / Experience`
- Heading: `Work & Involvement`
- Vertical **timeline** layout

**Timeline entries:**

| Period | Role | Company |
|---|---|---|
| 01/2024 – Present | Freelance Full-Stack Developer | Self-Employed |
| 03/2022 – 08/2024 | Head Organizer – Tech Events | GDSC / GDG On Campus / InactUs Egypt |
| 06/2023 | Event Organizer | Droidcon Egypt |
| 07/2022 – 09/2022 | CS50x Egypt – Organizer & Participant | Modern Academy – Harvard CS50 Chapter |

- Each timeline item: date badge (left), role title + company + bullet points (right)
- Timeline line animates in on scroll

---

### 7. `#contact` — Contact Section
- Section label: `05 / Contact`
- Heading: `Let's Build Something`
- Subtext: "Open to freelance projects, full-time roles, and collaborations."
- Contact cards:
  - 📧 Email: `mostafamahmoud9500@gmail.com`
  - 📍 Location: `Cairo, Egypt`
  - 📱 Phone: `+20 1010574543`
- Two large buttons:
  - `Send Email` → `mailto:mostafamahmoud9500@gmail.com`
  - `View GitHub` → `https://github.com/MustafaSalahX`

---

### 8. `<footer>`
- Center text: `© 2026 Mustafa Salah — Built with Three.js`
- Small social icons row: GitHub · LinkedIn

---

## ⚙️ Technical Requirements

```
- Pure HTML + CSS + Vanilla JS (no build tools, no npm)
- Three.js loaded via CDN (r128)
- Google Fonts via CDN
- Single repo ready for GitHub Pages deployment
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll between sections
- Intersection Observer for scroll animations (fade-in up)
- Custom mouse cursor (circle that follows pointer)
- CSS variables for all colors and fonts
- No frameworks (React, Vue, etc.) — vanilla only
```

---

## 🎨 CSS Variables to Define

```css
:root {
  --bg:        #0a0a0f;
  --bg-card:   #111118;
  --accent:    #00f5a0;
  --accent-2:  #00c3ff;
  --text:      #f0f0f0;
  --text-muted:#888899;
  --border:    rgba(255,255,255,0.07);
  --font-head: 'Syne', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --radius:    12px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📁 File Structure

```
portfolio/
├── index.html      ← All HTML structure
├── style.css       ← All styles + responsive
├── main.js         ← Three.js scene + scroll animations + cursor
└── README.md       ← Short description for GitHub
```

---

## ✅ Checklist for AI

- [ ] Three.js particle field in hero canvas (mouse-reactive)
- [ ] Rotating wireframe 3D object in hero background
- [ ] Custom animated cursor
- [ ] Fixed navbar with blur on scroll
- [ ] Hero section with code snippet overlay
- [ ] About section with stats grid
- [ ] Skills section with grouped animated chips
- [ ] Projects section with hover-glow cards
- [ ] Timeline experience section
- [ ] Contact section with mailto + GitHub links
- [ ] Footer
- [ ] Scroll fade-in animations (Intersection Observer)
- [ ] Fully responsive (mobile-first)
- [ ] GitHub Pages ready (no server needed)
