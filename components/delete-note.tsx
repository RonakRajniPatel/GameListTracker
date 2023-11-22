import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'


type Note = {
    id: number;
    title: string;
    user_id: string;
}

export default async function DeleteNote({ note }: {note:Note}) {



    const deleteNote = async () => {
        'use server'
        const cookieStore = cookies()
        
        const supabase = createClient(cookieStore)
        const { data: {session}} = await supabase.auth.getSession()
        await supabase.from('notes').delete().eq('id', note.id)

        revalidatePath('/notes')
    }

    return (
        <form action={deleteNote}>
            <button>Delete</button>
        </form>
    )
}