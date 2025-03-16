import { Link } from "react-router-dom";
import { usePoins } from "../contexts/PoinsContext"

const Poins = ()=>{
    const { poinsState : {models}} = usePoins();

    return (
        <main>
            <header>
            <span>Poins</span>
            <Link to="/">Go to Homepage</Link>
            </header>
           
            <div>
                <div className="searchbar">

                </div>
                <div className="imageList">
                    
                </div>
            </div>
        </main>
    )
}

export default Poins 