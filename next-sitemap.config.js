module.exports = {
  siteUrl: 'https://fabric-shop-frontend-production.up.railway.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://fabric-shop-frontend-production.up.railway.app/sitemap.xml',
    ],
  },
}; 