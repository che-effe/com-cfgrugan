# Portfolio Website Deployment Guide

This document explains the GitHub Actions workflows and deployment options for your portfolio website.

## Available Workflows

### 1. `deploy.yml` - Simple Build and Deploy

- Triggers on pushes to `main` branch
- Builds the application
- Deploys static assets to GitHub Pages
- Contains commented examples for Heroku, Vercel, and Railway deployment

### 2. `ci-cd.yml` - Comprehensive CI/CD Pipeline

- **Test Stage**: Runs tests and linting
- **Build Stage**: Creates production build artifacts
- **Deploy Staging**: Deploys to staging environment (on `develop` branch)
- **Deploy Production**: Deploys to production (on `main` branch)
- **Notification**: Sends deployment status notifications

### 3. `docker.yml` - Container-based Deployment

- Builds Docker image
- Pushes to GitHub Container Registry
- Supports semantic versioning
- Includes security attestations

## Deployment Options

### Option 1: Heroku

1. Set up these repository secrets:
   - `HEROKU_API_KEY`: Your Heroku API key
   - `HEROKU_APP_NAME`: Your Heroku app name
   - `HEROKU_EMAIL`: Your Heroku account email

2. Set repository variable:
   - `DEPLOY_TARGET`: `heroku`

3. Uncomment the Heroku deployment step in the workflow

### Option 2: Vercel

1. Set up these repository secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. Set repository variable:
   - `DEPLOY_TARGET`: `vercel`

### Option 3: Railway

1. Set up these repository secrets:
   - `RAILWAY_TOKEN`: Your Railway token

2. Set repository variable:
   - `DEPLOY_TARGET`: `railway`

### Option 4: DigitalOcean App Platform

1. Set up these repository secrets:
   - `DIGITALOCEAN_ACCESS_TOKEN`: Your DO access token
   - `DO_APP_NAME`: Your DO app name

2. Set repository variable:
   - `DEPLOY_TARGET`: `digitalocean`

### Option 5: Docker Deployment

Use the built Docker image from `ghcr.io/che-effe/com.cfgrugan` for deployment on any container platform.

## Environment Setup

### GitHub Environments

The workflows use GitHub environments for deployment protection:

- `staging`: For develop branch deployments
- `production`: For main branch deployments

To set up environments:

1. Go to Settings > Environments in your GitHub repository
2. Create `staging` and `production` environments
3. Add protection rules and required reviewers as needed

### Required Secrets

Set up the following secrets in your GitHub repository (Settings > Secrets and variables > Actions):

**For Heroku:**

- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

**For Vercel:**

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**For Railway:**

- `RAILWAY_TOKEN`

**For DigitalOcean:**

- `DIGITALOCEAN_ACCESS_TOKEN`
- `DO_APP_NAME`

### Repository Variables

Set the deployment target in Variables (Settings > Secrets and variables > Actions > Variables):

- `DEPLOY_TARGET`: One of `heroku`, `vercel`, `railway`, or `digitalocean`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build Docker image locally
docker build -t portfolio-website .

# Run Docker container locally
docker run -p 3000:3000 portfolio-website
```

## Deployment Process

1. **Development**: Work on feature branches
2. **Staging**: Merge to `develop` branch → triggers staging deployment
3. **Production**: Merge to `main` branch → triggers production deployment

## Monitoring

The workflows include:

- Build artifact uploads
- Deployment status notifications
- Container image security attestations
- Health checks in Docker containers

## Troubleshooting

### Common Issues

1. **Deployment fails**: Check the workflow logs in GitHub Actions
2. **Missing secrets**: Verify all required secrets are set in repository settings
3. **Docker build fails**: Check Dockerfile syntax and .dockerignore patterns

### Debugging Steps

1. Check GitHub Actions logs
2. Verify environment variables and secrets
3. Test Docker build locally
4. Check deployment target service status

## Security Considerations

- Secrets are properly masked in logs
- Docker images use non-root user
- Container registry requires authentication
- Environments can require reviews before deployment
