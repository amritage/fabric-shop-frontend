#!/usr/bin/env node

/**
 * API Test Script
 * Tests if your API is accessible and returning products
 */

async function testAPI() {
  console.log('🧪 Testing API connectivity...\n');

  // Try to get API URL from environment first, then from next.config.js
  let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!apiBaseUrl) {
    try {
      // Try to read from next.config.js
      const nextConfig = require('../next.config.js');
      apiBaseUrl = nextConfig.env?.NEXT_PUBLIC_API_BASE_URL;
      console.log('📁 Found API URL in next.config.js');
    } catch (error) {
      console.log('❌ Could not read next.config.js');
    }
  }
  
  if (!apiBaseUrl) {
    console.log('❌ NEXT_PUBLIC_API_BASE_URL not found');
    console.log('💡 Make sure it\'s set in next.config.js or .env.local file');
    return;
  }

  console.log('🔗 API Base URL:', apiBaseUrl);
  
  try {
    const apiUrl = `${apiBaseUrl}/newproduct/view`;
    console.log('📡 Testing endpoint:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API request successful!');
      console.log('📦 Response data keys:', Object.keys(data));
      
      if (data.data && Array.isArray(data.data)) {
        console.log(`📋 Found ${data.data.length} products`);
        
        if (data.data.length > 0) {
          const firstProduct = data.data[0];
          console.log('🔍 First product sample:', {
            id: firstProduct._id,
            name: firstProduct.name,
            slug: firstProduct.slug,
            hasSlug: !!firstProduct.slug,
            updatedAt: firstProduct.updatedAt
          });
          
          // Count products with slugs
          const productsWithSlugs = data.data.filter(p => p.slug);
          console.log(`✅ ${productsWithSlugs.length} products have slugs`);
          
          if (productsWithSlugs.length === 0) {
            console.log('⚠️  Warning: No products have slugs!');
            console.log('💡 Make sure your products have slug fields');
          }
        }
      } else {
        console.log('❌ No data.data array found');
        console.log('📄 Full response:', JSON.stringify(data, null, 2));
      }
    } else {
      console.log('❌ API request failed');
      const errorText = await response.text();
      console.log('📄 Error response:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.error('💡 Check if your API server is running and accessible');
  }
}

// Run the test
testAPI(); 