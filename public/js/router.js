// Static Site Router for GitHub Pages
// Handles client-side navigation for static HTML files

class StaticRouter {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/career': 'career.html',
            '/community': 'community.html', 
            '/digital': 'digital.html',
            '/analog': 'analog.html',
            '/bio': 'bio.html',
            '/articles': 'articles.html'
        };
        
        this.init();
    }
    
    init() {
        // Handle initial page load
        this.handleInitialLoad();
        
        // Handle browser navigation
        window.addEventListener('popstate', (event) => {
            this.handleRoute(window.location.pathname);
        });
        
        // Handle link clicks
        this.handleLinkClicks();
    }
    
    handleInitialLoad() {
        const path = window.location.pathname;
        
        // If we're on GitHub Pages and path is not root, we might need to redirect
        if (path !== '/' && !path.endsWith('.html')) {
            const htmlFile = this.routes[path];
            if (htmlFile && htmlFile !== window.location.pathname.split('/').pop()) {
                // Redirect to the correct HTML file
                window.location.replace(htmlFile);
            }
        }
    }
    
    handleRoute(path) {
        const route = this.routes[path];
        if (route) {
            // Update page title and URL without reload
            this.updatePage(path, route);
        }
    }
    
    updatePage(path, htmlFile) {
        // This is mainly for handling browser back/forward
        // Since we're using static files, actual navigation happens via page loads
        console.log(`Navigating to: ${path} (${htmlFile})`);
    }
    
    handleLinkClicks() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('/') && !href.endsWith('.html')) {
                const htmlFile = this.routes[href];
                if (htmlFile) {
                    // Prevent default navigation
                    event.preventDefault();
                    
                    // Navigate to the HTML file
                    window.location.href = htmlFile;
                }
            }
        });
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StaticRouter();
});

// GitHub Pages specific handling
// Redirect common routes to their HTML equivalents
(function() {
    'use strict';
    
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    
    // Handle GitHub Pages routing for direct navigation
    if (path !== '/' && !path.endsWith('.html')) {
        const routes = {
            '/career': '/career.html',
            '/community': '/community.html', 
            '/digital': '/digital.html',
            '/analog': '/analog.html',
            '/bio': '/bio.html',
            '/articles': '/articles.html'
        };
        
        const htmlPath = routes[path];
        if (htmlPath) {
            window.location.replace(htmlPath + search + hash);
        }
    }
})();