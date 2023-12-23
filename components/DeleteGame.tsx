import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'



export default function DeleteGame({game_id} : {game_id : number}) {



    const DeleteGame = async () => {
        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/removeGame?game_id=${game_id}`)
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <form action={DeleteGame}>
            <button className="btn btn-ghost btn-xs">Delete</button>
        </form>
    )
}