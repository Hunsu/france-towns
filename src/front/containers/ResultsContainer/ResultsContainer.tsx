import styles from './ResultsContainer.module.css'
import Results from "@/front/components/Results";
import {Town} from "@/common/types";
import React from "react";

type ResultsContainerProps = {
    towns: Town[]
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({towns}) => {
    const metropolitanCities: Town[] = []
    const overseasCities: Town[] = []
    towns.forEach(town => {
        if (town.postalCode.startsWith("97") || town.postalCode.startsWith("98")) {
            overseasCities.push(town)
        } else {
            metropolitanCities.push(town)
        }
    })

    return <div className={styles.container}>
        <Results title="Villes de métropole" towns={metropolitanCities}/>
        <Results title="Villes d'outre-mer" towns={overseasCities}/>
    </div>
}

export default ResultsContainer