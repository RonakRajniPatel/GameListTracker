import ShowGame from "@/components/ShowGame"
import React from "react"

export default function Page() {

    const { searchParams } = new URL(window.location.href)
    const search = searchParams.get('search')
    
    return (
        <>
            <ShowGame gameid="00001"/>
        </>
    )
}

