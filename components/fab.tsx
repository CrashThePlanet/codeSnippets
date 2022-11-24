import styles from './../styles/FAB.module.css'
import { motion } from 'framer-motion';

type props = {
    action: Function
}

export default function FAB(props: props) {

    return (
        <motion.button
          className={styles.addButton + " p-4 rounded-full h-16 w-16 grid place-items-center text-4xl text-center"}
          onClick={() => props.action()}
        >+</motion.button>
    )
}