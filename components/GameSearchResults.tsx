type Props = {
    name: string
    cover: string
}

export default function GameSearchResults({name, cover}: Props) {
    return (
        <>
            <div className="card w-80 bg-base-100 shadow-xl m-5">
                <figure>
                    <img src={cover} alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-center">{name}</h2>
                </div>
            </div>
        </>
    )
}