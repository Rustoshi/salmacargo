import { Inter } from 'next/font/google'
import './globals.css'
import { SiteProvider } from '@/context/SiteContext'
import { getSiteMetadata } from '@/utils/metadata'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://www.salmafreight.com"),
    title: "Salma Freight - Reliable Shipping Solutions",
    description: "Efficient and secure cargo shipping services tailored to your needs. Experience hassle-free logistics with Salma Freight.",
    openGraph: {
      title: "Salma Freight - Reliable Shipping Solutions",
      description: "Efficient and secure cargo shipping services tailored to your needs. Experience hassle-free logistics with Salma Freight.",
      url: "https://www.salmafreight.com", // Update with your actual domain
      type: "website",
      images: [
        {
          url: "/logo.png", // Ensure this is in the `public` folder
          width: 1200,
          height: 630,
          alt: "Salma Freight Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Salma Freight - Reliable Shipping Solutions",
      description: "Efficient and secure cargo shipping services tailored to your needs. Experience hassle-free logistics with Salma Freight.",
      images: ["/logo.png"],
    },
  };
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  )
}
