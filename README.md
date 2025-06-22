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
Projects: Detailed project showcase with images, tech stack, and links.
Gallery: Filterable gallery with 50+ image cards (single images, carousels, videos, GIFs) in a responsive masonry grid with natural media heights and user-selectable column count (1, 2, or 3), using data from public/data/gallery.json.
Contact: Form that logs submissions to the console.

Features

Responsive navigation bar with Gallery link.
Tailwind CSS styling with lazy-loaded media.
Client-side routing with Next.js.
Static site export for GitHub Pages.
Modal images and carousel on Home page using external URLs.
Scalable gallery with multi-category filtering, masonry layout, user-selectable columns, 80% screen modal, and background-click-to-close.

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
Images Not Loading: Confirm external media URLs in public/data/gallery.json are accessible.
Masonry Issues: Ensure react-masonry-css is installed and breakpointCols reflects selected columns. Check DevTools for JS errors.
Column Selector: Verify buttons toggle columns (1, 2, 3) correctly.

