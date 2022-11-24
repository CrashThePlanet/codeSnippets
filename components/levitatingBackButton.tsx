import styles from './../styles/LevetatingBackButton.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

import { useRouter } from 'next/router';


export default function LevitatingBackButton() {
    const router = useRouter()
    return (
        <div className={styles.bWrapper + " font bgPrim fixed top-0 left-0 text-3xl py-1 px-3 rounded-br cursor-pointer shadow-lg"} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
    )
}