import './globals.scss';
import { Jost } from 'next/font/google';
import Providers from '../components/provider';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import MicrosoftClarity from '../components/analytics/MicrosoftClarity';
import metadata from './metadata';

export { metadata };

const jost = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.variable}>
      <head>
        {/* Preload critical CSS */}
        <link rel="preload" href="/assets/css/font-awesome-pro.css" as="style" onLoad="this.rel='stylesheet'" />
        {/* Preload critical font files */}
        <link rel="preload" href="/assets/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/fa-brands-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/fa-light-300.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      </head>
      <body className={jost.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}