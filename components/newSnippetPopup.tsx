import styles from './../styles/NewSnippetPopup.module.css'

import Input from './../components/input'
import Textarea from './../components/textarea';
import react from 'react';

import { motion } from 'framer-motion';

import {useRouter} from 'next/router';

type props ={
    close: Function;
}

export default function NewSnippetPopup(props: props) {

    const [shortName, setShortName] = react.useState('');
    const [desc, setDesc] = react.useState('');
    const [code, setCode] = react.useState('');

    const router = useRouter()

    const handleSubmit = async () => {        
        const res = await fetch('api/createSnippet', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({shortName, desc,code, parentID: router.query.langID})
        });
        if (res.ok) {
            props.close()
        }
    }

    return (
        <>
            <div className={styles.Wrapper + " bg absolute top-1/2 left-1/2 z-50 rounded shadow-lg p-2 text-center"}>
                <p className="text-4xl">Create a new Code-Snippet</p>
                <br />
                <Input label="Short description" className="w-full" onChange={(value:string) => setShortName(value)} />
                <Textarea label="What does it do?" className='w-full' onChange={(value:string) => setDesc(value)} rows={5} />
                <Textarea label="Code" className='w-full' onChange={(value:string) => setCode(value)} rows={5} />
                <motion.button
                        onClick={() => props.close()}
                        className="rounded bgPrim py-1 px-2 mt-3 mx-2 text-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Cancel</motion.button>
                    <motion.button
                        type="submit"
                        onClick={() => handleSubmit()}
                        className={styles.submitButton + " rounded bgAccent py-1 px-2 mt-3 mx-2 text-2xl"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Create</motion.button>
            </div>
            <div className={"fixed top-0 left-0 w-full h-screen z-40 " + styles.blackBack} onClick={() => props.close()}></div>
        </>
    )
}