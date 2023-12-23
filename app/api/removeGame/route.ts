import { NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache"


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    
    const game_id = searchParams.get('game_id')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()
    await supabase.from('game_details').delete().eq('user_id', `${session?.user.id}`).eq('game_id', `${game_id}`)
    revalidatePath('/game')


    return NextResponse.json("successfully deleted")

}