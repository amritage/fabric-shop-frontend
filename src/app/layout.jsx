"use client";
import './globals.scss';
import Providers from '../components/provider';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import MicrosoftClarity from '../components/analytics/MicrosoftClarity';
import metadata from './metadata_product';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RootLayout({ children }) {
  const [meta, setMeta] = useState(metadata);

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/fabric\/([a-zA-Z0-9]+)/);
    const id = match ? match[1] : null;

    const fetchData = async () => {
      if (!id) {
        setMeta(metadata);
        return;
      }
      try {
        // Fetch product and SEO data
        const productRes = await axios.get(`https://v2backend.up.railway.app/api/product/6883706fa886d804832c21df`);
        const seoRes = await axios.get(`https://v2backend.up.railway.app/api/seo`);
        const product = productRes.data.data; // product._id
        const seoItem = seoRes.data.data.find(seo => seo.product && seo.product._id === product._id);

        if (product._id === "6883706fa886d804832c21df") {
          setMeta({
            title: seoItem.title || product.name,
            description: seoItem.description || product.description || "",
            keywords: seoItem.keywords || "",
            robots: seoItem.robots || "",
            openGraph: {
              title: seoItem.ogTitle || seoItem.title || product.name,
              description: seoItem.ogDescription || seoItem.description || product.description || "",
              url: seoItem.ogUrl || window.location.href,
              siteName: seoItem.ogSiteName || "Amrita Global Enterprises",
              locale: seoItem.ogLocale || "en_US",
              type: seoItem.ogType || "website",
              image: seoItem.product.img || "",
            },
            twitter: {
              title: seoItem.twitterTitle || seoItem.title || product.name,
              description: seoItem.twitterDescription || seoItem.description || product.description || "",
              image: seoItem.twitter?.image || "",
              card: seoItem.twitterCard || "",
              site: seoItem.twitterSite || "",
            },
            canonical: seoItem.canonical_url || "",
            author: seoItem.author_name || "",
          });
        } else {
          setMeta(metadata);
        }
      } catch (error) {
        setMeta(metadata);
      }
    };

    fetchData();
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Dynamic SEO Meta Tags */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        {meta.robots && <meta name="robots" content={meta.robots} />}
        {meta.canonical && <link rel="canonical" href={meta.canonical} />}
        {meta.author && <meta name="author" content={meta.author} />}
        <meta property="og:title" content={meta.openGraph?.title} />
        <meta property="og:description" content={meta.openGraph?.description} />
        <meta property="og:url" content={meta.openGraph?.url} />
        <meta property="og:site_name" content={meta.openGraph?.siteName} />
        <meta property="og:locale" content={meta.openGraph?.locale} />
        <meta property="og:type" content={meta.openGraph?.type} />
        {meta.openGraph?.image && <meta property="og:image" content={meta.openGraph.image} />}
        <meta name="twitter:title" content={meta.twitter?.title} />
        <meta name="twitter:description" content={meta.twitter?.description} />
        {meta.twitter?.image && <meta name="twitter:image" content={meta.twitter.image} />}
        {meta.twitter?.card && <meta name="twitter:card" content={meta.twitter.card} />}
        {meta.twitter?.site && <meta name="twitter:site" content={meta.twitter.site} />}

        {/* Inline critical Font Awesome CSS for above-the-fold icons */}
        <style>{`
.fa { font-family: var(--fa-style-family, 'Font Awesome 6 Pro'); font-weight: var(--fa-style, 900); }
.fa, .fa-brands, .fa-duotone, .fa-light, .fa-regular, .fa-solid, .fa-thin, .fab, .fad, .fal, .far, .fas, .fat {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: var(--fa-display, inline-block);
  font-style: normal;
  font-variant: normal;
  line-height: 1;
  text-rendering: auto;
}
`}</style>
        {/* Preload critical CSS */}
        <link rel="stylesheet" href="/assets/css/font-awesome-pro.css" />
        {/* Preload only the most critical font */}
        <link rel="preload" href="/assets/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Preload Jost variable fonts for faster text rendering */}
        <link
          rel="preload"
          href="/assets/fonts/Jost/Jost-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Jost/Jost-Italic-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Preload all used Font Awesome weights */}
        <link rel="preload" href="/assets/fonts/fa-brands-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/fa-light-300.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}