import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div 
                className={`${props.view} note title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.title}</h4>
                { props.view === 'card' ?
                    <div className='text-body'>{note.body.substring(0, 50) +  '...'}</div> : ""
                }
                <i className="fas fa-trash" onClick={props.deleteNote}></i>
            </div>
        </div>
    ))

    return (
        <section className={`pane sidebar ${props.view}`}>
            <div className="sidebar--header">
                <h3>Notes</h3>
                <select onChange={props.changeView} value={props.view}>
                    <option value='list'>List view</option>
                    <option value='card'>Card view</option>
                </select>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            <div class={`note-container ${props.view}`}>
                {noteElements}
            </div>
        </section>
    )
}
