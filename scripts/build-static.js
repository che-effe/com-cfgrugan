const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Configuration
const SRC_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const VIEWS_DIR = path.join(__dirname, '..', 'views');

// Files and directories to copy
const COPY_PATTERNS = [
  { src: 'public/css', dest: 'css' },
  { src: 'public/js', dest: 'js' },
  { src: 'public/images', dest: 'images' },
  { src: 'public/video', dest: 'video' },
  { src: 'public/404.html', dest: '404.html' },
  { src: '.nojekyll', dest: '.nojekyll' }
];

// Route definitions (matching your Express routes)
const ROUTES = [
  { path: '/', template: 'index', title: 'Portfolio - Home', page: 'home', filename: 'index.html' },
  { path: '/career', template: 'career', title: 'Career Achievements', page: 'career', filename: 'career.html' },
  { path: '/community', template: 'community', title: 'Dev Community', page: 'community', filename: 'community.html' },
  { path: '/digital', template: 'digital', title: 'Digital Work', page: 'digital', filename: 'digital.html' },
  { path: '/analog', template: 'analog', title: 'Analog Art', page: 'analog', filename: 'analog.html' },
  { path: '/bio', template: 'bio', title: 'About Me', page: 'bio', filename: 'bio.html' },
  { path: '/articles', template: 'articles', title: 'Articles & Writing', page: 'articles', filename: 'articles.html' },
  { path: '/events', template: 'events', title: 'Events & Speaking', page: 'events', filename: 'events.html' },
  { path: '/404', template: '404', title: '404 - Page Not Found', page: '404', filename: '404.html' }
];

// Utility functions
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created directory: ${dirPath}`);
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  ensureDirectoryExists(destDir);
  fs.copyFileSync(src, dest);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory not found: ${src}`);
    return;
  }

  ensureDirectoryExists(dest);
  
  const items = fs.readdirSync(src, { withFileTypes: true });
  
  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);
    
    if (item.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function cleanDist() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
    console.log('✓ Cleaned dist directory');
  }
}

async function renderTemplate(templateName, templateData) {
  const templatePath = path.join(VIEWS_DIR, `${templateName}.ejs`);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  
  // Render the main template
  const html = await ejs.renderFile(templatePath, templateData, {
    views: [VIEWS_DIR]
  });
  
  return html;
}

function processHtmlForStatic(html, routePath) {
  // Convert absolute paths to relative paths for static hosting
  let processedHtml = html;
  
  // Fix CSS and JS paths (remove leading slash)
  processedHtml = processedHtml.replace(/href="\/css\//g, 'href="css/');
  processedHtml = processedHtml.replace(/src="\/js\//g, 'src="js/');
  processedHtml = processedHtml.replace(/src="\/images\//g, 'src="images/');
  processedHtml = processedHtml.replace(/src="\/video\//g, 'src="video/');
  
  // Fix navigation links to point to static HTML files
  if (routePath !== '/') {
    // For non-root pages, adjust relative paths
    processedHtml = processedHtml.replace(/href="\/"/g, 'href="index.html"');
    processedHtml = processedHtml.replace(/href="\/career"/g, 'href="career.html"');
    processedHtml = processedHtml.replace(/href="\/community"/g, 'href="community.html"');
    processedHtml = processedHtml.replace(/href="\/digital"/g, 'href="digital.html"');
    processedHtml = processedHtml.replace(/href="\/analog"/g, 'href="analog.html"');
    processedHtml = processedHtml.replace(/href="\/bio"/g, 'href="bio.html"');
    processedHtml = processedHtml.replace(/href="\/articles"/g, 'href="articles.html"');
    processedHtml = processedHtml.replace(/href="\/events"/g, 'href="events.html"');
  } else {
    // For root page, use relative paths
    processedHtml = processedHtml.replace(/href="\/career"/g, 'href="career.html"');
    processedHtml = processedHtml.replace(/href="\/community"/g, 'href="community.html"');
    processedHtml = processedHtml.replace(/href="\/digital"/g, 'href="digital.html"');
    processedHtml = processedHtml.replace(/href="\/analog"/g, 'href="analog.html"');
    processedHtml = processedHtml.replace(/href="\/bio"/g, 'href="bio.html"');
    processedHtml = processedHtml.replace(/href="\/articles"/g, 'href="articles.html"');
    processedHtml = processedHtml.replace(/href="\/events"/g, 'href="events.html"');
  }
  
  // Inject router script for static hosting only
  processedHtml = processedHtml.replace(
    '<script src="js/main.js"></script>',
    '<script src="js/main.js"></script>\n    <script src="js/router.js"></script>'
  );
  
  return processedHtml;
}

async function generateStaticPages() {
  console.log('📄 Generating static HTML pages...');
  
  for (const route of ROUTES) {
    try {
      console.log(`   Processing: ${route.template} → ${route.filename}`);
      
      const templateData = {
        title: route.title,
        page: route.page,
        // Add current year for footer
        currentYear: new Date().getFullYear()
      };
      
      let html = await renderTemplate(route.template, templateData);
      
      // Process HTML for static hosting
      html = processHtmlForStatic(html, route.path);
      
      // Add cache busting
      const timestamp = Date.now();
      html = html.replace(/href="css\/(.*?\.css)"/g, `href="css/$1?v=${timestamp}"`);
      html = html.replace(/src="js\/(.*?\.js)"/g, `src="js/$1?v=${timestamp}"`);
      
      // Write the file
      const outputPath = path.join(DIST_DIR, route.filename);
      fs.writeFileSync(outputPath, html, 'utf8');
      
      console.log(`   ✓ Generated: ${route.filename}`);
      
    } catch (error) {
      console.error(`   ❌ Error generating ${route.filename}:`, error.message);
    }
  }
}

function createSitemap() {
  const baseUrl = 'https://che-effe.github.io/com.cfgrugan/';
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add all routes except 404
  ROUTES.filter(route => route.page !== '404').forEach(route => {
    const url = route.path === '/' ? baseUrl : `${baseUrl}${route.filename}`;
    const priority = route.path === '/' ? '1.0' : '0.8';
    const changefreq = route.page === 'articles' || route.page === 'digital' ? 'weekly' : 'monthly';
    
    sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;
  
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('✓ Created sitemap.xml');
}

function createRobotsTxt() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://che-effe.github.io/com.cfgrugan/sitemap.xml`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('✓ Created robots.txt');
}

function createRedirectsFile() {
  // Create _redirects file for better handling of direct navigation
  const redirects = `# Redirect all routes to appropriate HTML files
/career /career.html 200
/community /community.html 200
/digital /digital.html 200
/analog /analog.html 200
/bio /bio.html 200
/articles /articles.html 200

# Fallback to 404
/* /404.html 404`;
  
  fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirects);
  console.log('✓ Created _redirects file');
}

// Main build function
async function build() {
  console.log('🚀 Starting static site generation...');
  console.log('');
  
  // Clean previous build
  cleanDist();
  
  // Create dist directory
  ensureDirectoryExists(DIST_DIR);
  
  // Copy static assets
  console.log('📁 Copying static assets...');
  COPY_PATTERNS.forEach(pattern => {
    const srcPath = path.join(SRC_DIR, pattern.src);
    const destPath = path.join(DIST_DIR, pattern.dest);
    
    if (fs.existsSync(srcPath)) {
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        copyDirectory(srcPath, destPath);
        console.log(`   ✓ Copied directory: ${pattern.src} → ${pattern.dest}`);
      } else {
        copyFile(srcPath, destPath);
        console.log(`   ✓ Copied file: ${pattern.src} → ${pattern.dest}`);
      }
    } else if (!pattern.optional) {
      console.log(`   ⚠️  Source not found: ${pattern.src}`);
    }
  });
  
  console.log('');
  
  // Generate static HTML pages
  await generateStaticPages();
  
  console.log('');
  console.log('⚡ Creating additional files...');
  
  // Create additional files
  createSitemap();
  createRobotsTxt();
  createRedirectsFile();
  
  // Build summary
  console.log('');
  console.log('🎉 Static site generation completed successfully!');
  console.log(`📦 Output directory: ${DIST_DIR}`);
  console.log('');
  console.log('📋 Generated files:');
  
  ROUTES.forEach(route => {
    console.log(`   📄 ${route.filename} (${route.title})`);
  });
  
  console.log('');
  console.log('🌐 Ready for deployment!');
  console.log('   Run: npm run preview - to preview locally');
  console.log('   Run: npm run deploy - to deploy to GitHub Pages');
  console.log('');
  console.log('💡 Note: All routes now work as static HTML files with proper navigation');
}

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});

// Run build
if (require.main === module) {
  build().catch(console.error);
}

module.exports = { build };