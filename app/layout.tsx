import { GeistSans } from 'geist/font/sans'
import './globals.css'
import AuthButton from '@/components/AuthButton'
import NavLinks from '@/components/NavLinks'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default async function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-primary-content text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <nav className="w-full flex justify-between border-b border-b-foreground/10 h-16">
            <div className="w-full justify-normal flex items-center p-3 text-sm">
              {<NavLinks />}
              <div className="flex-auto flex place-content-end">{isSupabaseConnected && <AuthButton />}</div>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
