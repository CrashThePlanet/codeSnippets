import styles from './../styles/Input.module.css'

import react from 'react';

type props = {
    className?: string,
    placeholder?: string,
    required?: false,
    label?: string,
    onChange: Function,
    rows?:number
}

export default function Textarea(props: props) {
    const lRef = react.createRef<HTMLLabelElement>()

    const handleChange = (event: any) => {
        if (event.target.value == '') {
            lRef.current!.style.fontSize = "16px"
            lRef.current!.style.top = "0"
        } else {
            lRef.current!.style.fontSize = "12px"
            lRef.current!.style.top = "-15px"
        }
        props.onChange(event.target.value);
    }
    
    return (
        <div className={styles.InputWrapper + " " + props.className + " "}>
            <textarea
                name=""
                placeholder={props.placeholder}
                required={props.required}
                onChange={() => handleChange(event)}
                rows={props.rows}
            />
            <label ref={lRef} className="">{props.label}</label>
        </div>
    )
}