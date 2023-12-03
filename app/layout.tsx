import { GeistSans } from 'geist/font/sans'
import './globals.css'
import AuthButton from '@/components/AuthButton'
import NavLinks from '@/components/NavLinks'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

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

          {/* <nav className="w-full flex justify-between border-b border-b-foreground/10 h-16">
            <div className="w-full justify-normal flex items-center p-3 text-sm">
              {<NavLinks />}
              <div className="flex-auto flex place-content-end">{isSupabaseConnected && <AuthButton />}</div>
            </div>
          </nav> */}
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl">GameTracker</Link>
              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                {<NavLinks />}
              </ul>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>Profile</li>
                  <li>Settings</li>
                  <li>{isSupabaseConnected && <AuthButton />}</li>
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
