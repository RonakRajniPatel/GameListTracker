import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import AddGameButton from './AddGameButton'

const clientId = process.env.IGDB_CLIENT_ID
const Bearer = process.env.IGDB_BEARER

type GameData = {
    id: number
    image_id: string
    name: string
}

export default async function NewGame() {
    let game : GameData

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

        let game: GameData
        try {
            const response1 = await fetch("https://api.igdb.com/v4/covers", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${clientId!}`,
                    'Authorization': `Bearer ${Bearer!}`,
                },
                body: `fields image_id; where game=${gameid};`
            })
            const data1 = await response1.json()
    
            const response2 = await fetch("https://api.igdb.com/v4/games", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${clientId!}`,
                    'Authorization': `Bearer ${Bearer!}`,
                },
                body: `fields name; where id=${gameid};`
            })
            const data2 = await response2.json()
            const date = new Date(data2[0].first_release_date * 1000)
            game = {
                id: data1[0].id ? data1[0].id : "",
                image_id: data1[0].image_id ? data1[0].image_id : "",
                name: data2[0].name ? data2[0].name : "",
            }
    
    
        } catch (err) {
            console.error(err)
            game = {
                id: 0,
                image_id: "",
                name: "",
            }
        }

        const { data: {session}} = await supabase.auth.getSession()
        await supabase.from('game_details').insert([
            { game_id: gameid, user_id: session?.user.id, title: game.name, cover_id: game.image_id, status: status, rating: rating ? rating : 0, review: review ? review : "", hours_played: hours_played ? hours_played : 0, date_finished: date_finished ? date_finished : null}
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
                    <input type="date" id="start" name="date_finished" min="1980-01-01"/>
                </div>


                <textarea className="textarea textarea-bordered w-full m-2" placeholder="Review" name="review"></textarea>

                <AddGameButton/>
            </form>
        </>
    )
}
