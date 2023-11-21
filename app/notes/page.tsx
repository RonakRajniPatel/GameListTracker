import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()
  const { data: {session}} = await supabase.auth.getSession()
  
  if (!session) {
    redirect("/login")
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}