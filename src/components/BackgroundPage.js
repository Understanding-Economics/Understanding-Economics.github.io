import React from 'react'

export default class HomePage extends React.Component {
    render() {
        document.title = "Background - Understanding Economics";
        return (
            <div className = "HomePage">
                <span>
                    <p>
                       Some background info about the project here.
                    </p>

                    <p>
                        Some other background info.
                    </p>
                </span>

                
            </div>
        )
    }
}