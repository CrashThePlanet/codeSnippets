import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import LanguageCard from './../components/languageCard'
import NewLangPopup from './../components/newLangPopup'
import FAB from './../components/fab';

import react from 'react'

import Link from 'next/link';

import { motion } from 'framer-motion'

type lang = {
  lang: string,
  id: string,
  img: string,
  snippets: Array<lang>
}

export default class Home extends react.Component {
  state = {
    popupOpen: false,
    langs: []
  }

  componentDidMount(): void {
    this.getLangs();
  }
  async getLangs()  {
    const res = await fetch('api/getLangs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json()
      this.setState({langs: data})
      console.log(this.state.langs);
      
    }  
  }
  openPopup():void {
    this.setState({popupOpen: true});
  }
  close():void {
    this.setState({popupOpen: false});
    this.getLangs();
  }

  render() {
    return (
      <div className={styles.container + " bg"}>
        <div className="p-6">
          {
            this.state.langs.map((lang: lang, index: number) => (
              <Link href={"/" + lang.id} key={index}>
                <LanguageCard key={lang.id} language={lang.lang} iconUrl="jsIcon.png" id={lang.id} update={() => this.getLangs()} />
              </Link>
            ))
          }
        </div>
        <FAB action={() => this.openPopup()} />

        {
          this.state.popupOpen && 
          <NewLangPopup close={() => this.close()} />
        }
      </div>
    )
  }
}
