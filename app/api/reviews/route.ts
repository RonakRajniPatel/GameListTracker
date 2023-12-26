import { NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    
    const user_id = searchParams.get('user_id')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()

    const games = await supabase.from('game_details').select().eq('user_id', [user_id])
    return NextResponse.json(games.data)
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    
    const game_id = searchParams.get('game_id')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()
    await supabase.from('game_details').delete().eq('user_id', `${session?.user.id}`).eq('game_id', `${game_id}`)

    return NextResponse.redirect(new URL('/game', request.url))
}