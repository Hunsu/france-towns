import PgClient from "./PgClient";
import {QueryResult} from "pg";
import {Town} from "@/common/types"

type TownTable = {
    postal_code: string
    name: string
}

const QUERY = 'SELECT postal_code, name FROM town where name ilike $1 or postal_code = $2 order by name LIMIT 100'

export const findByNameOrPostalCode = async (query: string): Promise<Town[]> => {
    const result = await PgClient.query(QUERY, [`%${query}%`, query]) as QueryResult<TownTable>
    return result.rows.map(e => {
        return {
            postalCode: e.postal_code,
            name: e.name
        }
    })
}