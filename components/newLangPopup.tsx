
import styles from './../styles/NewLangPopup.module.css'

import { motion } from 'framer-motion';

type props = {
    close: Function,
}

export default function NewLangPopup(props: props) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (e.target.name.value === '') return;
        try {
            const res = await fetch('api/createLang', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: e.target.name.value})
            });
            if (res.status === 200) {
                props.close();
                return;
            }
        } catch (error) {
            
        }
    }

    return (
        <div className={"fixed top-0 left-0 grid place-items-center w-full h-full " + styles.wrapper}>
            <div className={"input bgPrim z-20 rounded text-center p-3 " + styles.formWrapper}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">What&apos;s the name of the Language?</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        pattern="[a-zA-Z0-9\-#]{1,255}"
                        title="Name can contain alphabets (a to z and A to Z) and digits (0 to 9). Maximun 255 character"
                    /> <br />
                    <motion.button
                        onClick={() => props.close()}
                        className="rounded py-1 px-2 mt-3 mx-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Cancel</motion.button>
                    <motion.button
                        type="submit"
                        className="rounded py-1 px-2 mt-3 mx-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Create</motion.button>
                </form>
            </div>
            <div className={"w-full h-full z-10 absolute top-0 left-0 " + styles.blackBG} onClick={() => props.close()} ></div>
        </div>
    )
}