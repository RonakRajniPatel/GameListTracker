
'use client';

import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

type Props = {
    placeholder: string
}

type Game = {
    id: number
    name: string
}

export default function SearchGame({ placeholder }: Props) {
    const [searchResults, setSearchResults] = useState<Game[]>([])
    const [showResults, setShowResults] = useState(false)

    

    const handleSearch = useDebouncedCallback((term: string) => {
        // search is empty
        if (term.trim() === '') {
            setSearchResults([])
            setShowResults(false)
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game?search=${term}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setSearchResults(data)
          setShowResults(true)
        })
        .catch(error => {
            console.error(error)
            setShowResults(false)
        })

    }, 200);

 
    return (
        // <div className="relative flex flex-1 flex-shrink-0">
        <div className="relative dropdown dropdown-bottom">

            {/* Mobile UI */}
            <input
                className="md:hidden input input-bordered w-36 max-w-xs"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 100)}
            />

            {/* Monitor UI */}
            <input
                tabIndex={0}
                className="hidden md:block md:input md:input-bordered md:w-full md:max-w-xs"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 100)}
            />

            {showResults && searchResults.length > 0 && (
                // <div className="absolute z-10 w-full bg-base-200 rounded-box shadow-lg mt-1">
                    <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box absolute menu">
                        {searchResults.map((result, index) => (
                            <li key={index} className="hover:bg-base-300">
                                {result.name}
                            </li>
                        ))}
                    </ul>
                // </div>
            )}

        </div>
    )
}