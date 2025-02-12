import './person.css'

interface Props{
    name: string
    image: string
    onClick: () => void
}

function Person({name, image, onClick}: Props){
    return(
        <div className="person-container" onClick={onClick}>
            <img className="person-image" src={image} alt="profile-pic"></img>
            <h2 className="person-name">{name}</h2>
        </div>
    )
}

export default Person