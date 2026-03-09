import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'


export default async function PublicRootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <Navbar/>
    {children}
    <Footer/>

    <Script id="smartsupp-script" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = 'f4c774cbffd451b8d00815ace4ace2ea9fa425f2';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];
              c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';
              s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
        <noscript>
          Powered by{' '}
          <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">
            Smartsupp
          </a>
        </noscript>
    </>
  )
}
