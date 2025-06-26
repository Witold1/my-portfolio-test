My Next.js Portfolio
A portfolio website built with Next.js, Tailwind CSS, and Docker, deployed to GitHub Pages.
Setup

Ensure Docker Desktop is installed and running.
Build and run for production:docker build -f docker/Dockerfile -t my-next-app .
docker run -p 3000:3000 my-next-app


For development:docker-compose -f docker/docker-compose.yml up


Test static export locally:docker build -f docker/Dockerfile.test -t my-next-app-test .
docker run -p 3000:3000 my-next-app-test

Access at http://localhost:3000/my-portfolio-test/.

Pages

Home: Hero section, modal images, and image carousel.
About: Bio and skills.
Projects: Blog-style page listing posts with filters (All, Major), linking to individual post pages, using data from public/data/projects.json.
Gallery: Filterable gallery with 50+ image cards (single images, carousels, videos, GIFs) in a responsive grid, using data from public/data/gallery.json.
Contact: Form that logs submissions to the console.
Sitemap: Dedicated page listing all site pages.

Features

Responsive navigation bar with Gallery link, light/dark mode toggle (fixed-size button), mobile menu for small screens, and branded logo ("Witold's Data" in monospace).
Footer with left-aligned Sitemap link and legal note, uniform font size, and no margin between Sitemap and legal note.
Consistent page titles in format " - Witold's Data Consulting".
Blog-style Projects section with dynamic post pages (/projects/[slug]) supporting rich content blocks (text, carousels, code, SVGs, grids) with modal images for blog migration.
Tailwind CSS styling with lazy-loaded media and dark mode support (including filter buttons).
Client-side routing with Next.js.
Static site export for GitHub Pages.
Modal images and carousel on Home page and blog posts using external URLs.
Scalable gallery with multi-category filtering, larger cards, modal close button in viewport corner, and close on background click.
Navbar and Footer rendered globally via pages/_app.js for consistency.

Git Setup

Initialize Git and add .gitignore:git init
git add .
git commit -m "Initial commit"


Push to GitHub:git remote add origin https://github.com/Witold1/my-portfolio-test.git
git push -u origin main



GitHub Pages Deployment

Update next.config.js with basePath: '/my-portfolio-test' and assetPrefix: '/my-portfolio-test/'.
Ensure .github/workflows/deploy.yml grants contents: write and pages: write permissions.
Push to GitHub:git add .
git commit -m "Deploy to GitHub Pages"
git push origin main


Enable GitHub Pages in Settings > Pages with Deploy from a branch and select gh-pages.
Access at https://Witold1.github.io/my-portfolio-test/.

Troubleshooting

404 Error: Ensure Settings > Pages uses gh-pages branch. Verify out/ files in gh-pages.
403 Permission Error: Grant “Read and write” permissions in Settings > Actions > General.
Links Not Updating: Ensure basePath matches repo name. Check out for index.html files.
CSS Missing: Verify tailwind.config.js, postcss.config.js, and out/_next/static/css/.
Images Not Loading: Confirm external media URLs in public/data/projects.json or public/data/gallery.json are accessible.
Theme Issues: Check DevTools Console for theme toggle logs. Ensure dark class toggles on <html>.
Footer Issues: Ensure only one footer appears; verify pages/_app.js includes <Footer /> and pages do not.
Build Errors: Check pages/projects/[slug].js for correct file paths in getStaticPaths and getStaticProps. Ensure components/ContentBlock.js imports Link from next/link for grid blocks and handles modal images correctly.
