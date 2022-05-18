import React from "react"
import Part from "./Part";

const Content = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)


    return(
        <div>
            <ul>
                {
                    parts.map(part => 
                        <Part key={part.id} name = {part.name} exercise={part.exercises} />
                    )
                } 
            </ul>
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

export default Content;