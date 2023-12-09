import SearchGame from "@/components/SearchGame"
import ShowGame from "@/components/ShowGame"
import { NodeNextRequest } from "next/dist/server/base-http/node"
import React from "react"

type Props = {
    gameid: string
}

export default function Page({ gameid }: Props) {
    console.log(gameid)
    return (
        <>
            <ShowGame gameid={gameid}/>
        </>
    )
}

