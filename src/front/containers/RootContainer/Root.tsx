import styles from './Root.module.css'
import React, {useRef, useState} from "react";
import SearchContainer from "@/front/containers/SearchContainer";
import ResultsContainer from "@/front/containers/ResultsContainer";

const Root: React.FC = () => {
    const [towns, setTowns] = useState([])
    const timeout = useRef<number>()
    const onChange = async (value: string) => {
        window.clearTimeout(timeout.current)
        if (!value.trim()) {
            setTowns([])
        } else {
            timeout.current = window.setTimeout(async () => {
                const response = await fetch(`/api/town?q=${value}`)
                const towns = await response.json()
                setTowns(towns)
            }, 400)
        }
    }

    return <div className={styles.root}>
        <SearchContainer onChange={onChange}/>
        <ResultsContainer  towns={towns}/>
    </div>
}

export default Root