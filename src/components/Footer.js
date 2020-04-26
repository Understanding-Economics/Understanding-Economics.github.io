import React from 'react'
import "../css/Footer.css"

export default class Footer extends React.PureComponent {
    render() {
        return <footer className = "page-footer footer"> 
            Website developed by Kevin Bi, Adil Bhatia, and Julia Paul-Venturine. <br/>
            <a href = "https://github.com/Understanding-Economics/Understanding-Economics.github.io" target = "_blank">GitHub source for website</a>
        </footer>
    }
}