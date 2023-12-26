import AddButton from '@/components/AddButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default function Page() {

  const updateUser = async (formData: FormData) => {
    'use server'
    const p_name = formData.get('profile_name')
    const fl_name = formData.get('name')

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: {session}} = await supabase.auth.getSession()
    await supabase.from('users').upsert({user_id: `${session?.user.id}`, name: fl_name, profile_name: p_name}).eq('user_id', `${session?.user.id}`)
  }

  return (
    <>
        <form action={updateUser} className="mt-10 justify-evenly">
            <div>
                <input type="text" placeholder="Profile Name" className="input input-bordered w-1/2 p-2 m-2" name="profile_name"/>
                <input type="text" placeholder="Name" className="input input-bordered w-1/2 p-2 m-2" name="name"/>
            </div>
            <AddButton text={"Save"} alert={"Profile Updated"}/>
        </form>
    </>
  )
}
