import react from "react";

import { withRouter } from 'next/router';

import styles from './../styles/[langID].module.css'

import LevitatingBackButton from '../components/levitatingBackButton';
import FAB from './../components/fab';
import NewSnippetPopup from './../components/newSnippetPopup';
import SnippetCard from './../components/snippetCard';

type cProps = {
    props: any,
    router: any
}
type snippet = {
    id: string,
    headline: string,
    description: string,
    code: string
}

export default withRouter(class LangClass extends react.Component<cProps> {
    state = {
        popupOpen: false,
        snippets: [],
    }
    
    async getSnippets() {
        const res = await fetch('api/getSnippets', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({langID: this.props.router.query.langID})
        })
        const data = await res.json();
        if (res.ok) {
            this.setState({snippets: data.snippets})
        }
    }


    componentDidMount(): void {
        this.getSnippets()
    }
    openPopup(): void {
        this.setState({popupOpen: true})
    }
    closePopup(): void {
        this.setState({popupOpen: false})
        this.getSnippets();
    }
    render() {
        return(
            <div className={styles.snippetWrapper + " w-full min-h-screen bg"}>
                <div className={styles.content + " pt-2"}>
                    {this.state.snippets.length === 0 && (
                        <p className="pt-2 text-2xl mx-auto w-max">There are no code-snippets</p>
                    )}
                    {this.state.snippets.length !== 0 && this.state.snippets.map((snippet:snippet, index: number) => (
                        <SnippetCard data={snippet} key={index} />
                    ))}
                </div>
                <LevitatingBackButton />
                <FAB action={() => this.openPopup()} />
                {
                    this.state.popupOpen &&
                    <NewSnippetPopup close={() => this.closePopup()} />
                }
            </div>
        )
    }
})