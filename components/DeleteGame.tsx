import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'



export default async function DeleteGame({game_id} : {game_id : number}) {



    const DeleteGame = async () => {
        'use server'
        const cookieStore = cookies()
        
        const supabase = createClient(cookieStore)
        const { data: {session}} = await supabase.auth.getSession()
        await supabase.from('game_details').delete().eq('user_id', `${session?.user.id}`).eq('game_id', `${game_id}`)

        revalidatePath('/game')
    }

    return (
        <form action={DeleteGame}>
            <button className="btn btn-ghost btn-xs">Delete</button>
        </form>
    )
}