import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs');
import path from 'path'


type lang = {
    lang: string,
    id: string,
    img: string,
    snippets: Array<lang>
}
export default function handler(
    req: NextApiRequest,
    res:NextApiResponse<any>
) {
    if (req.method !== "POST") return;
    const dir = path.resolve('./public/');
    const data:any = JSON.parse(fs.readFileSync(dir + "/data.json", {encoding: "utf-8"}))
    res.status(200).send({snippets: data.langs.find((lang: lang) => lang.id === req.body.langID).snippets})
}