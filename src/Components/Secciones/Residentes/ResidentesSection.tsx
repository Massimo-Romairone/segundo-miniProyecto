import { useEffect, useState } from "react";
import { Element } from "react-scroll";


function ResidentesSection() {

const [residentes, setResidentes] = useState([]);


useEffect(() => {
    fetch("https://68cb2705430c4476c34c20bf.mockapi.io/residentes")
        .then(response => response.json())
        .then(data => setResidentes(data));
}, []);

    return (
        <Element name="residentes">
            <h2>Residentes</h2>
        </Element>
    )
}

export default ResidentesSection;