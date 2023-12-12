'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type GameData = {
    id: number
    image_id: string
    name: string
    rating: number
    first_release: string
}

export default function ShowGame() {
    const [game, setGame] = useState<GameData>({id: 0, image_id: "co5vmg", name: "Tears of the Test", rating: 95, first_release: "2020-01-01"})
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
                            <p className="px-4 py-.2">Release Date: {game.first_release.substring(0,10)}</p>
                            <div>
                                <p className="px-4 py-.2">Rating: {Math.round(game.rating)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}