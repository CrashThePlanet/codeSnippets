import styles from './../styles/SnippetCard.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCopy } from '@fortawesome/free-solid-svg-icons'

import react from 'react'

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


type cProps = {
    data: any
}

export default class SnippetCard extends react.Component<cProps> {
    state= {
        extended: false
    }
    copyToClipboard() {
        navigator.clipboard.writeText(this.props.data.code);
    }

    componentDidMount() {
        hljs.initHighlighting()
    }

    render() {
        return (
            <div className="w-4/5 mx-auto">
                <div className={styles.wrapper + " w-full h-12 rounded bgPrim p-2 cursor-pointer mt-2 flex row items-center justify-between shadow-xl z-10 relative"}
                    onClick={() => this.setState({extended: !this.state.extended})}
                >
                    <p className="text-2xl">{this.props.data.headline}</p>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
                {this.state.extended && 
                    <div className={styles.content + " w-full bgPrim -mt-1 p-2 pt-2 rounded-b"}>
                        {this.props.data.description}
                        <div className={styles.codeBlock + " mt-2 bg rounded p-1 relative"}>
                            <pre>
                                <code>
                                    {this.props.data.code}
                                </code>
                            </pre>
                            <FontAwesomeIcon icon={faCopy} onClick={() => this.copyToClipboard()} className={styles.copyIcon + " absolute right-1 top-1 text-xl cursor-pointer"} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}