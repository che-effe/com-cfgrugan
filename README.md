# Portfolio Website

A modern, responsive portfolio website built with Node.js, Express, and vanilla JavaScript to showcase career achievements, community involvement, digital work, and analog art.

## Features

- **Responsive Design**: Mobile-first approach with clean, modern styling
- **Multiple Sections**: 
  - Career timeline and achievements
  - Developer community involvement
  - Digital interaction projects
  - Analog artwork gallery
- **Interactive Elements**: 
  - Project filtering
  - Art gallery categories
  - Smooth animations
  - Mobile navigation
- **SEO Optimized**: Semantic HTML and meta tags
- **Accessible**: ARIA labels and keyboard navigation support

## Technology Stack

- **Backend**: Node.js with Express.js
- **Template Engine**: EJS
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Development**: Nodemon for hot reloading

## Project Structure

```
portfolio-website/
├── public/                 # Static assets
│   ├── css/               # Stylesheets
│   │   ├── main.css       # Base styles and layout
│   │   ├── components.css # Page-specific components
│   │   └── responsive.css # Mobile and responsive styles
│   ├── js/                # Client-side JavaScript
│   │   └── main.js        # Main application logic
│   └── images/            # Image assets
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout template
│   ├── index.ejs          # Homepage
│   ├── career.ejs         # Career achievements
│   ├── community.ejs      # Community involvement
│   ├── digital.ejs        # Digital projects
│   ├── analog.ejs         # Analog artwork
│   └── 404.ejs           # Error page
├── server.js              # Express server
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### Production

To run in production mode:

```bash
npm start
```

## Customization

### Content Updates

1. **Personal Information**: Update the hero section in `views/index.ejs`
2. **Career Timeline**: Modify the timeline items in `views/career.ejs`
3. **Skills**: Update the skills grid in `views/career.ejs`
4. **Community Work**: Edit sections in `views/community.ejs`
5. **Projects**: Add your projects to `views/digital.ejs`
6. **Artwork**: Update gallery items in `views/analog.ejs`

### Styling

- **Colors**: Modify CSS custom properties in `public/css/main.css`
- **Layout**: Adjust grid and flexbox properties in component styles
- **Responsive**: Update breakpoints in `public/css/responsive.css`

### Adding New Sections

1. Create a new EJS template in the `views/` directory
2. Add a new route in `server.js`
3. Add navigation link in `views/layout.ejs`
4. Create corresponding styles in `public/css/components.css`

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Lazy loading for images
- Intersection Observer for animations
- Debounced resize events
- Optimized CSS with minimal reflows
- Semantic HTML for better parsing

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Reduced motion support
- Focus management

## License

MIT License - feel free to use this template for your own portfolio.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you find any issues or have suggestions, please create an issue in the repository.

---

Built with ❤️ using Node.js and vanilla JavaScript.