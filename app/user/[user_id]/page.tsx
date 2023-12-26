'use client'

import { useParams } from 'next/navigation'
import DisplayReviews from "@/components/DisplayReviews"
import {useState, useEffect} from 'react'

type users = {
    user_id: string,
    name: string, 
    profile_name: string,
}
export default function Page() {
    const [user, setUser] = useState<string>("null")
    const params = useParams()
    const profile_name = params?.user_id
    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profileUser?profile_name=${profile_name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUser(data)
        })
        .catch(err => {
            console.error(err)
        });
    }, [user])
        
    
    if (user != "null") return (
        <>
            <DisplayReviews user_id={user}/>
        </>
    )
    else return (
        <p>
            no profile found
        </p>
    )
}
