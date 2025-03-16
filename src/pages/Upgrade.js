import { Link } from "react-router-dom";
import { useUpgrade } from "../contexts/UpgradeContext"

const Upgrade = ()=>{
    const {upgradeState : {models}} = useUpgrade();
    return (
        <div>
            Hello World - Upgrade
            <Link to="/">Go to Homepage</Link>
            <Link to="poins">Go to Poins</Link>
        </div>
    )
}

export default Upgrade