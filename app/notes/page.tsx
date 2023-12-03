import DisplayNote from '@/components/DisplayNote'
import NewNote from '@/components/NewNote'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: {session}} = await supabase.auth.getSession()

  if (!session) {
    redirect("/unauthenticated")
  }

  return (
    <>
      <div className='w-full px-2 flex-auto'>
        {<NewNote />}
        {<DisplayNote />}
      </div>
    </>
  )
} 