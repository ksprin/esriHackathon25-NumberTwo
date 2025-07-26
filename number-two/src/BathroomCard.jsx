import './BathroomCard.css'

function BathroomCard({ title, description, location }){
    return (
        <div className="bathroom-card">
            <div className="card-content">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default BathroomCard;