import type {NextApiRequest, NextApiResponse} from 'next'
import {findByNameOrPostalCode} from "../../src/database"
import {Town} from "@/common/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Town[]>
) {
    if (Array.isArray(req.query.q)) {
        res.status(401)
    } else {
        const query = req.query.q
        try {
            const towns = await findByNameOrPostalCode(query)
            res.status(200).json(towns)
        } catch (e) {
            console.error(`Error occurred: ${e}`)
            res.status(500)
        }
    }
}
