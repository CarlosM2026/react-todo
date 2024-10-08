import React from 'react'

const InputWithLabel = (props) => {

    const inputRef = React.useRef()

    React.useEffect(() => {
        inputRef.current.focus() 
    })

    return (
        <>
            <label htmlFor="todoTitle">{props.children}</label>
            <input name="title" type="text" id="todoTitle" value={props.todoTitle} onChange={props.handleTitleChange} ref = {inputRef}/>
        </>
    ) 
}

export default InputWithLabel