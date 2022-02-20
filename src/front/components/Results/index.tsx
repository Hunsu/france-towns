import React from "react";
import styles from "./Results.module.css"
import {Town} from "@/common/types";
import {getDataProps} from "@/front/helpers/props";

type TitleProps = {
    title: string
}

type ResultsProps = {
    title: string,
    towns: Town[]
}

type TownsListProps = {
    towns: Town[]
}

type SearchTextProps = {
    nbResults: number
}

const Title: React.FC<TitleProps> = ({title}) => {
    return <div className={styles.title}>{title}</div>
}

const SearchText: React.FC<SearchTextProps> = ({nbResults}) => {
    const className = nbResults > 0 ? styles.hasResults : styles.noResults;
    let text
    if (nbResults == 0) {
        text = "Aucune ville correspondant au texte saisi"
    } else if (nbResults == 1) {
        text = "Une ville correspond au texte saisi"
    } else {
        text = `${nbResults} villes correspondant au texte saisi`
    }
    return <div className={`${className} ${styles.searchText}`}><label>{text}</label></div>
}

const TownComponent: React.FC<Town> = ({name, postalCode}) => {
    return <div className={styles.town}>
        <span data-cy= "town-name" className={styles.townName}>{name}</span>
        <span data-cy="town-postalCode" className={styles.townPostalCode}>{postalCode}</span>
    </div>
}

const TownsList: React.FC<TownsListProps> = ({towns}) => {
    if (towns.length == 0) {
        return <></>
    }

    return <div className={styles.townsWrapper}>
        {towns.map( (town, index) => {
            return <TownComponent postalCode={town.postalCode} name={town.name} key={index}/>
        })}
    </div>
}


const Results: React.FC<ResultsProps> = ({title, towns, ...props}) => {
    return <div className={styles.wrapper} {...getDataProps(props as { [x: string]: string })}>
        <Title title={title}/>
        <SearchText nbResults={towns.length}/>
        <TownsList towns={towns} />
    </div>
}

export default Results