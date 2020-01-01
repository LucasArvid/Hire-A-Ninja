import React, {useState, useEffect} from "react"

function NinjaContainer() {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [data, setData] = useState([])

    function handleSubmit(event){
        event.preventDefault()
        
        
        fetch("/api/ninjas?lng=" + lng + "&lat=" + lat)
            .then(response => response.json())
                .then(response => {
                setData(response)
                console.log(response)
            }).catch()
    }

    const ninja = Array.isArray(data) && data.map((ninja, index) => {
                    return(
                        <li key={index}> 
                            <span className={ninja.available.toString()}></span>
                            <span className="name">{ninja.name}</span>
                            <span className="rank">{ninja.rank}</span>
                            <span className="dist">{Math.floor(ninja.dist.calculated / 1000)} km</span>
                        </li>
                        
                    )
                })


    return (
        <div id="ninj-container">
            <form id="search" onSubmit={handleSubmit}>
                <label>Enter your latitude:</label>
                <input 
                    type="text"
                    name="lat"
                    value={lat}
                    onChange={event => setLat(event.target.value)}
                    placeholder="latitude"
                    required
                />

                <label>Enter your longitude:</label>
                <input 
                    type="text"
                    name="lng"
                    value={lng}
                    onChange={event => setLng(event.target.value)}
                    placeholder="longitude"
                    required
                />

                <button>Find Ninjas</button>
            </form>

            <ul>
                {ninja}
            </ul>

        </div>
    )
}

export default NinjaContainer