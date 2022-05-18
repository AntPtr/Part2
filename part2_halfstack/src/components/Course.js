import React from "react"
import Header from "./Header";
import Content from "./Content";


const Course = ({course}) => {

    return(
        <div>
            <ul>
            {course.map(course => {
                return(
                <li key = {course.id}>
                    <Header  title = {course.name}/>
                    <Content parts = {course.parts}/>
                </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Course;