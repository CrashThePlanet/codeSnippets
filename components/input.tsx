import styles from './../styles/Input.module.css'

import react from 'react';

type props = {
    className?: string,
    placeholder?: string,
    required?: false,
    label?: string,
    onChange: Function
}

export default function Input(props: props) {
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
            <input
                type="text"
                name=""
                placeholder={props.placeholder}
                required={props.required}
                onChange={() => handleChange(event)}
            />
            <label ref={lRef} className="inputHasValue">{props.label}</label>
        </div>
    )
}