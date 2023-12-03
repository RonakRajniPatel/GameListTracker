
'use client';

import { useDebouncedCallback } from 'use-debounce';

type Props = {
    placeholder: string
}
export default function SearchGame({ placeholder }: Props) {

    const handleSearch = useDebouncedCallback((term: string) => {
        fetch(`http://localhost:3000/api/game?search=${term}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    }, 500);

 
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="input input-bordered w-36 md:w-auto"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    )
}