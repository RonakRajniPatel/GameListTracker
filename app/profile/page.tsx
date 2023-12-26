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
    console.log(`${session?.user.id}`)
    await supabase.from('users').upsert({user_id: `${session?.user.id}`, name: "asdf", profile_name: "indf the chat"}).eq('user_id', `${session?.user.id}`)
  }

  return (
    <>
        <form action={updateUser} className="mt-10 justify-evenly">
            <div>
                <input type="text" placeholder="Profile Name" className="input input-bordered w-1/2 p-2 m-2" name="profile_name"/>
                <input type="text" placeholder="Name" className="input input-bordered w-1/2 p-2 m-2" name="name"/>
            </div>
            <button className="btn mt-3" type="submit">Save</button>
        </form>
    </>
  )
}
