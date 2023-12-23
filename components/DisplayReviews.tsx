'use client'

import DeleteGame from './DeleteGame'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type GameDetails = {
    user_id: number,
    game_id: number, 
    title: string,
    cover_id: string,
    status: string,
    review: string,
    rating: number
    hours_played: number,
    date_finished: string,
}

export default function DisplayReviews({user_id} : {user_id : string}) {
    const [game_details, setGame_details] = useState<GameDetails[]>()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews?user_id=${user_id}`)
                const apiResponseData: GameDetails[] = await apiResponse.json()
                setGame_details(apiResponseData)
            } catch(err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

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
                            <tr key={game.title}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <Link href={`/game/${game.game_id}`}>
                                                    <img src={"https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover_id + ".jpg"} alt="Game Cover" />
                                                </Link>
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