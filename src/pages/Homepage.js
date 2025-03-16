import { Link } from "react-router-dom"

const Homepage = () =>{
    console.log("Rendering Homepage");
    return (
        <div>
            <h2>Advik Marketing </h2>
            <Link to="/poins"> Go to Poins</Link><br/><br/>
            <Link to="/upgrade"> Go to Upgrade</Link>
        </div>
    )
}

export { Homepage }