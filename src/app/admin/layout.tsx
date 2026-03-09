import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import '@/app/globals.css'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Admin Dashboard - Courier Service',
  description: 'Admin dashboard for managing packages and shipments',
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication
  const session = await getServerSession()
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <>{children}</>
  )
}
