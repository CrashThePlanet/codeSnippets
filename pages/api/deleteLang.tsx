import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs')

type lang = {
    lang: string,
    id: string,
    img: string,
    snippets: Array<lang>
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Boolean>
    ) {
        const data:any = JSON.parse(fs.readFileSync("data.json", {encoding: "utf-8"}))
        if (req.body === "") {
            res.end();
            return;
        }
    try {
        const reqData = JSON.parse(req.body)
        data.langs.map((lang: lang) => {
            if (lang.id === reqData.langID) {
                data.langs.splice(data.langs.indexOf(lang), 1)
            }
        })
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 4), "utf8")
        res.status(200).send(true)
    } catch (error: any) {
        console.log(error);
        
        res.status(500).send(error)
    }
}