import React from 'react'
import "../css/Footer.css"

export default class Footer extends React.PureComponent {
    render() {
        return <footer className = "page-footer footer"> 
            Website developed by <a href = "http://kevinbi.com/" target = "_blank">Kevin Bi</a>, Adil Bhatia, and Julia Paul-Venturine. Project led by <a href = "https://stefanie-stantcheva.onrender.com/" target = "_blank">Stefanie Stantcheva</a>.<br/>
            <a href = "https://github.com/Understanding-Economics/Understanding-Economics.github.io" target = "_blank">GitHub source for website</a>
        </footer>
    }
}