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
        <link rel="preload" href="/assets/css/font-awesome-pro.css" as="style" onLoad="this.rel='stylesheet'" />
        {/* Preload only the most critical font */}
        <link rel="preload" href="/assets/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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