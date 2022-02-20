import styles from './Search.module.css'
import React from "react";

const Wrapper: React.FC = ({children}) => {
    return <div className={styles.wrapper}>
        {children}
    </div>
}

type LabelProps = {
    label: string
}

type SearchInputProps = {
    placeholder: string,
    onChange: (input: string) => void
}

type SearchProps = {
    onChange: (input: string) => void
}

const Label: React.FC<LabelProps> = ({label}) => {
    return <span className={styles.label}>{label}</span>
}

const SearchInput: React.FC<SearchInputProps> = ({placeholder, onChange}) => {
    return (
        <div className={styles.inputWrapper}>
            <input className={styles.input} placeholder={placeholder}
                   onChange={(event) => onChange(event.target.value)}/>
        </div>)
}

const Search: React.FC<SearchProps> = ({onChange}) => {
    return <Wrapper>
        <Label label="Je recherche..."/>
        <SearchInput placeholder="...une ville, un code postal" onChange={onChange}/>
    </Wrapper>
}

export default Search