import { NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

type users = {
    user_id: string,
    name: string, 
    profile_name: string,
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    
    const profile_name = searchParams.get('profile_name')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()

    const response = await supabase.from('users').select('user_id').eq('profile_name', profile_name)
    const users = response.data as users[]
    
    if (response.error) {
        return NextResponse.json("null")
    }
    else if (users[0]) {
        return NextResponse.json(users[0].user_id)
    }
    else {
        return NextResponse.json("null")
    }
}