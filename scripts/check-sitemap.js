#!/usr/bin/env node

/**
 * Sitemap Validation Script
 * Run this script to check your sitemap generation
 */

const fs = require('fs');
const path = require('path');

async function checkSitemap() {
  console.log('🔍 Checking sitemap generation...\n');

  try {
    // Check if sitemap.xml exists
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    if (!fs.existsSync(sitemapPath)) {
      console.log('❌ sitemap.xml not found in public directory');
      console.log('💡 Run "npm run build" to generate the sitemap');
      return;
    }

    // Read and parse sitemap
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Count URLs
    const urlMatches = sitemapContent.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    // Check for product URLs
    const productUrlMatches = sitemapContent.match(/\/fabric\//g);
    const productCount = productUrlMatches ? productUrlMatches.length : 0;
    
    // Check for blog URLs
    const blogUrlMatches = sitemapContent.match(/\/blog-details\//g);
    const blogCount = blogUrlMatches ? blogUrlMatches.length : 0;
    
    // Check for static pages
    const staticPages = [
      '/',
      '/shop',
      '/blog',
      '/cart',
      '/wishlist',
      '/login',
      '/contact'
    ];
    
    const staticCount = staticPages.filter(page => 
      sitemapContent.includes(page)
    ).length;

    console.log('✅ Sitemap found and analyzed!');
    console.log(`📊 Total URLs: ${urlCount}`);
    console.log(`🛍️  Product pages: ${productCount}`);
    console.log(`📝 Blog pages: ${blogCount}`);
    console.log(`🏠 Static pages: ${staticCount}`);
    
    // Validate structure
    if (sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      console.log('✅ Valid XML structure');
    } else {
      console.log('❌ Invalid XML structure');
    }
    
    if (sitemapContent.includes('<urlset')) {
      console.log('✅ Valid sitemap format');
    } else {
      console.log('❌ Invalid sitemap format');
    }
    
    // Check file size
    const stats = fs.statSync(sitemapPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📁 File size: ${fileSizeInKB} KB`);
    
    if (stats.size > 50 * 1024 * 1024) { // 50MB limit
      console.log('⚠️  Warning: Sitemap is very large (>50MB)');
    }
    
    console.log('\n🎉 Sitemap validation complete!');
    
  } catch (error) {
    console.error('❌ Error checking sitemap:', error.message);
  }
}

// Run the check
checkSitemap(); 