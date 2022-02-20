import Search from "@/front/components/Search";
import React from "react";

type SearchContainerProps = {
    onChange: (value: string) => void
}

const SearchContainer: React.FC<SearchContainerProps> = ({onChange}) => {
    return <Search onChange={onChange}/>
}

export default SearchContainer