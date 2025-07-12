import blogData from '@/data/blog-data';
import { logSitemapStats, validateSitemapData } from '@/utils/sitemap-utils';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabric-shop-frontend-production.up.railway.app';
  
  console.log('🔍 Generating dynamic sitemap at runtime...');
  
  // Static pages that work
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Blog post pages with proper dates
  const blogPages = blogData.map(blog => {
    const blogDate = new Date(blog.date);
    return {
      url: `${baseUrl}/blog-details/${blog.id}`,
      lastModified: blogDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  // Fetch ALL products from API at runtime (this ensures new products are included)
  let productPages = [];
  try {
    const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adorable-gentleness-production.up.railway.app').replace(/\/?$/, '/api');
    const apiUrl = `${apiBaseUrl}/newproduct/view`;
    
    console.log('📡 Fetching fresh products from API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes to avoid hammering your API
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        console.log(`🛒 Found ${data.data.length} products (including any new ones)`);
        
        productPages = data.data
          .filter(product => product.slug) // Only include products with slugs
          .map(product => ({
            url: `${baseUrl}/fabric/${product.slug}`,
            lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          }));
        
        console.log(`✅ Generated ${productPages.length} product URLs`);
      } else {
        console.log('❌ No products found in API response');
      }
    } else {
      console.log('❌ API request failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
  }

  // Combine all pages
  const allPages = [...staticPages, ...blogPages, ...productPages];
  
  // Validate and log statistics
  validateSitemapData(allPages);
  logSitemapStats(allPages);
  
  console.log(`🎉 Dynamic sitemap generated with ${allPages.length} total URLs:`);
  console.log(`- ${staticPages.length} static pages`);
  console.log(`- ${blogPages.length} blog pages`);
  console.log(`- ${productPages.length} product pages (always up-to-date!)`);

  return allPages;
} 