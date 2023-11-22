import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function NewNote() {

    const addNote = async (formData: FormData) => {
        'use server'
        const enteredTitle = formData.get('title')
        const cookieStore = cookies()
        
        const supabase = createClient(cookieStore)
        const { data: {session}} = await supabase.auth.getSession()
        await supabase.from('notes').insert([
            { title: enteredTitle, user_id: session?.user.id}
        ])
        revalidatePath('/notes')
        // write title to supabase
        // fetch fresh data
    }

    return (
        <form action={addNote}>
            <input name="title" className='bg-gray-800'/>
        </form>
    )
}