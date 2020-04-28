import React from 'react'
import "../css/Footer.css"

export default class Footer extends React.PureComponent {
    render() {
        return <footer className = "page-footer footer"> 
            Website developed by Kevin Bi, Adil Bhatia, and Julia Paul-Venturine. Project led by Professor <a href = "https://stefanie-stantcheva.onrender.com/" target = "_blank">Stefanie Stantcheva.</a><br/>
            <a href = "https://github.com/Understanding-Economics/Understanding-Economics.github.io" target = "_blank">GitHub source for website</a>
        </footer>
    }
}