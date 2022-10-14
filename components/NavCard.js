import Link from "next/link";

const NavCard = props => {
    return (
        <div className="card w-75">
            <div className="card-body">
                <h5 className="card-title">{props.cardTitle}</h5>
                <p className="card-text">{props.cardDesc}</p>
                <Link href={props.url}><a className="btn btn-primary">Click here</a></Link>
            </div>
        </div>
    )
}

export default NavCard;