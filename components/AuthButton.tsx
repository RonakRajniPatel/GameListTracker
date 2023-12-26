import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <>
      <form action={signOut}>
        <button>
          <li>
            Logout
          </li>
        </button>
      </form>
    </>
  ) : (
    <li>
      <Link href="/login" className='p-0'>
        Login
      </Link>
    </li>
  )
}
