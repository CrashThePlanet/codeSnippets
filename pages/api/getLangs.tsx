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
    res:NextApiResponse<Array<lang>>
) {
    if (req.method !== "GET") return;
    const dir = path.resolve('./public/');
    const data:any = JSON.parse(fs.readFileSync(dir + "/data.json", {encoding: "utf-8"}))
    const langs = data.langs.map((lang: lang) => {
        return {
            lang: lang.lang,
            img: lang.img,
            id: lang.id
        }
    });
    res.status(200).send(langs)
}