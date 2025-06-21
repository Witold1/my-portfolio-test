# My Next.js Portfolio

A portfolio website built with Next.js, Tailwind CSS, and Docker.

## Setup

1. Ensure Docker Desktop is installed and running.
2. Add images (`image1.jpg`, `image2.jpg`, `image3.jpg`) to `public/images/`.
3. Build and run for production:
   ```bash
   docker build -t my-next-app .
   docker run -p 3000:3000 my-next-app
   ```
4. For development:
   ```bash
   docker-compose up
   ```
5. Test static export:
   ```bash
   docker build -f Dockerfile.test -t my-next-app-test .
   docker run -p 3000:3000 my-next-app-test
   ```
   Access at `http://localhost:3000/`.

## Pages
- **Home**: Hero section, modal images, and image carousel.
- **About**: Bio and skills.
- **Projects**: Sample project showcase.
- **Contact**: Form that logs submissions to the console.

## Features
- Responsive navigation bar.
- Tailwind CSS styling.
- Client-side routing with Next.js.
- Static site export for testing.
- Modal images and carousel on Home page.

## Troubleshooting
- **Links Not Updating**: Ensure `serve -s` in `Dockerfile.test`. Check `out` for `index.html` files.
- **CSS Missing**: Verify `tailwind.config.js`, `postcss.config.js`, and `out/_next/static/css/`.
- **Images Not Loading**: Ensure `public/images/` contains `image1.jpg`, `image2.jpg`, `image3.jpg`.