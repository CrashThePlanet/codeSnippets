import styles from './../styles/LanguageCard.module.css'
import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image';

type props = {
    language: string,
    iconUrl: string,
    id?: string,
    update: Function
}
export default function LanguageCard(props: props) {

    const deleteLang = async () => {
        if (!props.id) return;
        const res = await fetch('/api/deleteLang', {
            method: "POST",
            body: JSON.stringify({langID: props.id})
        });
        props.update();
    }

    return (
        <motion.div
            className={"w-4/5 my-4 h-20 bgPrim flex row mx-auto p-2 rounded items-center cursor-pointer " + styles.card}
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.96}}
        >
            <Image width={64} height={64} className="w-16 h-auto mr-8" src={process.env.serverURL + "img/" + props.iconUrl} alt={props.language + " Icon"} />
            <div className={"flex row justify-between " + styles.seperator}>
                <p className="text-5xl">{props.language}</p>
                <motion.div
                    className={"w-16 h-auto flex items-center text-4xl opacity-0 " + styles.deleteAction}
                    onClick={() => deleteLang()}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </motion.div>
            </div>
        </motion.div>
    )
}