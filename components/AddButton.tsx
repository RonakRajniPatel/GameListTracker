'use client'

import { useState } from "react"

type AddButtonProps = {
    text: string,
    alert: string,
}
export default function AddButton({text, alert}: AddButtonProps) {
const [showAlert, setShowAlert] = useState(false)
    return (
        <>
            {showAlert && <div role="alert" className="alert alert-success fixed bottom-10 left-20 w-1/4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{alert}</span>
            </div>}
            <button className="btn" type="submit" onClick={() =>setShowAlert(true)}>{text}</button>
        </>
    )
}