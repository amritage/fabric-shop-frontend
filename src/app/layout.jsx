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
        <GoogleAnalytics />
        <MicrosoftClarity />
      </head>
      <body className={jost.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}