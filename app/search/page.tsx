'use client'

import GameSearchResults from "@/components/GameSearchResults"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import React from "react"
import Link from 'next/link'

type GameData = {
    id: number
    name: string
    cover: string
}

export default function Page() {
    
    const [games, setGames] = useState<GameData[]>([])
    const searchParams = useSearchParams()
    const query = searchParams?.get('query')
    useEffect(() => {
        const fetchData = async() => {
            try {
                const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/searchMore?query=${query}`)
                const apiResponseData: GameData[] = await apiResponse.json()
                console.log(apiResponseData)

                setGames(apiResponseData)
            } catch(err) {
                console.error(err)
            }
        }
        fetchData()

    }, [query])

    return (
        <>
            <div className="flex flex-wrap">
                {games.map((result, index) => (
                    <Link key={index} href={`/game/${result.id}`}>
                        <GameSearchResults name={result.name} cover={`https://images.igdb.com/igdb/image/upload/t_cover_big/${result.cover}.jpg`}/>
                    </Link>
                ))}
            </div>
        </>
    )
}