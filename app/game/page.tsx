import SearchGame from "@/components/SearchGame"
import ShowGame from "@/components/ShowGame"
import { NodeNextRequest } from "next/dist/server/base-http/node"
import React from "react"

export default function Page() {

    return (
        <>
            <ShowGame gameid="00001"/>
        </>
    )
}

