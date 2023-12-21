import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import DeleteGame from './DeleteGame'

type GameDetails = {
    user_id: number,
    game_id: number, 
    title: string,
    cover_id: string,
    status: string,
    review: string,
    hours_played: number,
    date_finished: string,
}

export default async function DisplayGame() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: {session}} = await supabase.auth.getSession()
	const { data: game_details} = await supabase.from('game_details').select().eq('user_id', `${session?.user.id}`)

	return (
		<>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Review</th>
                            <th>Status</th>
                            <th>Rating</th>
                            <th>Hours</th>
                            <th>Date Finished</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {game_details?.map((game, index) => (
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={"https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover_id + ".jpg"} alt="Game Cover" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{game.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {game.review}
                                    <br/>
                                </td>
                                <td>{game.status}</td>
                                <td>{game.rating}</td>
                                <td>{game.hours_played}</td>
                                <td>{game.date_finished}</td>
                                <th>
                                    <DeleteGame game_id={game.game_id}/>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
		</>
	)
}