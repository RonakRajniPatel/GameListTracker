'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type GameData = {
    id: number
    image_id: string
}

export default function ShowGame() {
    const [game, setGame] = useState<GameData>({id: 0, image_id: "co5vmg"})
    const params = useParams()
    console.log("client component")
    const gameId = params?.gameid

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gameid?gameid=${gameId}`)
        .then(response => response.json())
        .then(data => {
            setGame(data[0])
        })
        .catch(err => {
            console.log("error hit in ShowGame Fetch")
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
                            <h1 className="text-5xl font-bold py-3">The Legend Of Zelda: Tears of the Kingdom</h1>
                            <p className="px-4 py-.2">Release Date: 2023</p>
                            <p className="px-4 py-.2">Platforms: Switch</p>
                            <div>
                                <p className="px-4 py-.2">Rating: 95/100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}