import AuthButton from '@/components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Unauthenticated() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: {session} } = await supabase.auth.getSession()
    
    return <p>Please login to view this content</p>
}