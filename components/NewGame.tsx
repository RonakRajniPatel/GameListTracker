import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function NewGame() {
    const addGame = async (formData: FormData) => {
        'use server'
        const status = formData.get('status')
        const rating = formData.get('rating')
        const review = formData.get('review')
        const hours_played = formData.get('hours_played')
        const date_finished = formData.get('date_finished')

        const Headers = headers()
        const path = Headers.get('referer')
        const gameid = path?.split("/").pop();
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data: {session}} = await supabase.auth.getSession()
        await supabase.from('game_details').insert([
            { game_id: gameid, user_id: session?.user.id, status: status, rating: rating, review: review, hours_played: hours_played, date_finished: date_finished}
        ])

        revalidatePath('/')
    }
    return (
        <>
            <form action={addGame} className="mt-10 justify-evenly">


                <select name="status" className="select select-bordered m-2 w-1/2 flex">
                    <option disabled selected>Game Status</option>
                    <option>Want to play</option>
                    <option>Are playing</option>
                    <option>Have played</option>
                    <option>Have dropped</option>
                </select>

                <div className="flex p-2">
                    <input type="text" placeholder="Hours Played" className="input input-bordered w-1/3" name="hours_played"/>

                    <div className="rating ml-5">
                        <input type="radio" name="rating" value={1} className="mask mask-star" />
                        <input type="radio" name="rating" value={2} className="mask mask-star" />
                        <input type="radio" name="rating" value={3} className="mask mask-star" />
                        <input type="radio" name="rating" value={4} className="mask mask-star" />
                        <input type="radio" name="rating" value={5} className="mask mask-star" />
                    </div>

                </div>



                <div className="m-2">
                    <label>Date Finished:</label>
                    <input type="date" id="start" name="date_finished" min="1980-01-01" />
                </div>


                <textarea className="textarea textarea-bordered w-full m-2" placeholder="Review" name="review"></textarea>

                <button className="btn" type="submit">Add Game</button>
            </form>
        </>
    )
}
