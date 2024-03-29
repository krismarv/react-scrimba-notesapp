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
                <div>
                    <span className='note-date'>{note.date}</span>
                    <i className="fas fa-trash" onClick={(event) => props.deleteNote(event, note.id)}></i>
                </div>
            </div>
        </div>
    ))

    return (
        <section className={`pane sidebar ${props.view}`}>
            <div className="sidebar--header">
                <img src='../images/MessyDoodle.png' id='header-image'></img>
                <div className='header-column'>
                    <h3>Notes</h3>
                    <div className="select">
                        <i className={props.view === 'list' ? 'fas fa-list' : 'fas fa-th'}></i>
                        <select id='view-select' onChange={props.changeView} value={props.view}>
                            <option value='list'>List view</option>
                            <option value='card'>Card view</option>
                    </select>
                    </div>
                    <div className="select">
                        <i className={props.direction==='asc' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'} onClick={props.changeDirection}></i>
                        <select id='sort-select' onChange={props.changeSort} value={props.sort}>
                            <option value='updated'>Date updated</option>
                            <option value='created'>Date created</option>
                            <option value='name'>Name</option>
                    </select>
                    </div>
                    <button className="new-note" onClick={props.newNote}>+ Add new</button>
                </div>
            </div>
            <div className={`note-container ${props.view}`}>
                {noteElements}
            </div>
        </section>
    )
}
