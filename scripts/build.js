const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(__dirname, '..', 'dist');

// Files and directories to copy
const COPY_PATTERNS = [
  { src: 'index.html', dest: 'index.html' },
  { src: 'public/css', dest: 'css' },
  { src: 'public/js', dest: 'js' },
  { src: 'public/images', dest: 'images' },
  { src: 'public/video', dest: 'video' },
  { src: '.nojekyll', dest: '.nojekyll' }
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

function optimizeHTML(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Add cache busting timestamp
  const timestamp = Date.now();
  html = html.replace(
    /href="css\/(.*?\.css)"/g,
    `href="css/$1?v=${timestamp}"`
  );
  html = html.replace(
    /src="js\/(.*?\.js)"/g,
    `src="js/$1?v=${timestamp}"`
  );
  
  // Minify HTML (basic)
  html = html
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();
  
  fs.writeFileSync(htmlPath, html);
  console.log('✓ Optimized HTML');
}

function createCNAME() {
  // If you have a custom domain, uncomment and modify this:
  // fs.writeFileSync(path.join(DIST_DIR, 'CNAME'), 'your-domain.com');
  // console.log('✓ Created CNAME file');
}

function createSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/#bio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/#career</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/#community</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/#digital-work</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/#analog-art</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://che-effe.github.io/com.cfgrugan/#articles</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
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

// Main build function
function build() {
  console.log('🚀 Starting build process...');
  console.log('');
  
  // Clean previous build
  cleanDist();
  
  // Create dist directory
  ensureDirectoryExists(DIST_DIR);
  
  // Copy files and directories
  console.log('📁 Copying files...');
  COPY_PATTERNS.forEach(pattern => {
    const srcPath = path.join(SRC_DIR, pattern.src);
    const destPath = path.join(DIST_DIR, pattern.dest);
    
    if (fs.existsSync(srcPath)) {
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        copyDirectory(srcPath, destPath);
        console.log(`✓ Copied directory: ${pattern.src} → ${pattern.dest}`);
      } else {
        copyFile(srcPath, destPath);
        console.log(`✓ Copied file: ${pattern.src} → ${pattern.dest}`);
      }
    } else if (!pattern.optional) {
      console.log(`⚠️  Source not found: ${pattern.src}`);
    }
  });
  
  console.log('');
  console.log('⚡ Optimizing...');
  
  // Optimize HTML
  const htmlPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(htmlPath)) {
    optimizeHTML(htmlPath);
  }
  
  // Create additional files
  createSitemap();
  createRobotsTxt();
  createCNAME();
  
  // Build summary
  console.log('');
  console.log('🎉 Build completed successfully!');
  console.log(`📦 Output directory: ${DIST_DIR}`);
  console.log('');
  console.log('📋 Build summary:');
  
  function getDirectorySize(dir) {
    let size = 0;
    if (fs.existsSync(dir)) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          size += getDirectorySize(itemPath);
        } else {
          size += fs.statSync(itemPath).size;
        }
      }
    }
    return size;
  }
  
  const totalSize = getDirectorySize(DIST_DIR);
  console.log(`   Total size: ${(totalSize / 1024).toFixed(2)} KB`);
  
  const files = fs.readdirSync(DIST_DIR, { withFileTypes: true });
  const fileCount = files.filter(f => f.isFile()).length;
  const dirCount = files.filter(f => f.isDirectory()).length;
  
  console.log(`   Files: ${fileCount}`);
  console.log(`   Directories: ${dirCount}`);
  console.log('');
  console.log('🌐 Ready for deployment!');
  console.log('   Run: npm run preview - to preview locally');
  console.log('   Run: npm run deploy - to deploy to GitHub Pages');
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
  build();
}

module.exports = { build };