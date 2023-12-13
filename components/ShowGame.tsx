'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type GameData = {
    id: number
    image_id: string
    name: string
    rating: number
    first_release: string
    summary: string
}

export default function ShowGame() {
    const [game, setGame] = useState<GameData>({id: 0, image_id: "blank", name: "Loading", rating: 0, first_release: "0000-00-00T00:00:00.000Z", summary: ""})
    const params = useParams()
    const gameId = params?.gameid

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gameid?gameid=${gameId}`)
        .then(response => response.json())
        .then(data => {
            setGame(data)
        })
        .catch(err => {
            console.error(err)
        });
    }, [gameId])
    
    

    return (
        <> 
            <div>
                <div className="hero relative left-2 top-0 h-16 w-3/4">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={"https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.image_id + ".jpg"} className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold py-3">{game.name}</h1>
                            <p className="px-4 py-.2"><b>Release Date:</b> {game.first_release.substring(0,10)}</p>
                            <div>
                                <p className="px-4 py-.2"><b>Rating:</b> {Math.round(game.rating)} / 100</p>
                            </div>
                            <p className="px-4 py-.2"> <b>Summary: </b>  {game.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}