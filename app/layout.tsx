import { GeistSans } from 'geist/font/sans'
import './globals.css'
import AuthButton from '@/components/AuthButton'
import NavLinks from '@/components/NavLinks'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import SearchGame from '@/components/SearchGame'

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
      <body className="text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="navbar bg-neutral">
            <div className="flex-1">

              {/* Monitor UI */}
              <Link href="/" className="hidden md:btn md:btn-ghost md:text-xl">GameTracker</Link>
              <ul className='hidden md:menu-horizontal md:bg-base-200 md:rounded-box'>
                {<NavLinks />}
              </ul>

              {/* Mobile UI switch this to bottom row at some point*/}
              <div className='dropdown dropdown-end md:invisible'>
                <div tabIndex={0} role='button' className='btn btn-ghost rounded-btn'>Menu</div>
                  <ul tabIndex={0} className="menu dropdown-content z-[1]">
                  {<NavLinks />}
                </ul>
              </div>  

            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                {<SearchGame placeholder={"Search Games"}/>}
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><Link href='/profile' className='p-0'>Profile</Link></li>
                  <li>Settings</li>
                  {isSupabaseConnected && <AuthButton />}
                </ul>
              </div>
            </div>
          </div> 
          {children}
        </main>
      </body>
    </html>
  )
}
