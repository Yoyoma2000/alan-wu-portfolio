# Alan Wu — Personal Portfolio

Personal portfolio site for Alan Wu. Hosted on GitHub Pages.

**Live site:** https://Yoyoma2000.github.io/alan-wu-portfolio/

---

## Tech Stack

- Pure HTML · CSS · JavaScript — no framework, no bundler
- GitHub Pages (free static hosting)
- Google Fonts (Space Grotesk, Syne, Space Mono)

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### First time setup

1. **Create a new GitHub repo** named `alan-wu-portfolio` (or any name you want)

2. **Push this folder to it:**
   ```bash
   cd alan-wu-portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/alan-wu-portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Under "Source", select **GitHub Actions**
   - Save

4. The workflow in `.github/workflows/deploy.yml` will run automatically.  
   Your site will be live at `https://YOUR_USERNAME.github.io/alan-wu-portfolio/` in ~60 seconds.

### Every update after that
```bash
git add .
git commit -m "describe what you changed"
git push
```
GitHub Pages re-deploys automatically on every push to `main`.

---

## Adding Content

| Task | How |
|------|-----|
| Add a CS project | Follow `.claude/skills/add-cs-project.md` |
| Add a music track | Follow `.claude/skills/add-music-track.md` |
| Add work experience | Follow `.claude/skills/add-experience.md` |
| Update GitHub links | Find project card by name, update `href` |
| Add profile photo | Place in `assets/images/profile.jpg`, add to About section |
| Add project screenshots | Place in `assets/images/`, reference in project card |

---

## Project Structure

```
alan-wu-portfolio/
├── index.html              # Entire site
├── CLAUDE.md               # Claude Code project bible
├── README.md               # This file
├── assets/
│   ├── music/              # .mp3 / .mp4 tracks
│   └── images/             # Photos, screenshots
├── .claude/
│   ├── settings.json       # Hook config
│   ├── skills/             # Claude Code reusable workflows
│   └── hooks/              # Self-improving automation scripts
└── .github/
    └── workflows/
        └── deploy.yml      # Auto-deploy on push
```

---

## Using Claude Code on this project

Open the project folder in VS Code, then start Claude Code:

```bash
claude
```

Claude Code will automatically read `CLAUDE.md` and know the full project context — design tokens, content, rules, and what skills are available.

**Example prompts you can give Claude Code:**
- `"Add a new project card for my CPSC 320 algorithms project"`
- `"Add music track: Midnight Drive, EDM, assets/music/midnight-drive.mp3"`
- `"Update the GitHub link for FiscordProject to https://github.com/..."`
- `"Add a new work experience entry for [company]"`
- `"Make the hero tagline reference my saxophone"`

---

## Custom Domain (optional)

1. Buy a domain (e.g., `alanwu.dev` on Namecheap/Cloudflare)
2. In GitHub repo Settings → Pages → Custom domain: enter your domain
3. Add a `CNAME` file at repo root containing just your domain:
   ```
   alanwu.dev
   ```
4. Point your domain's DNS to GitHub Pages IPs (GitHub docs will guide you)
