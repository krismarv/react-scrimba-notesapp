import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {

    // set notes from localStorage
    let notesInitial = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []
    const [notes, setNotes] = React.useState(notesInitial)

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    const [view, setView] = React.useState('list')

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            // N O T E: GENERATE UNIQUE TITLES!!!
            title: `Note ${notes.length+1}`,
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes]);
        localStorage.setItem('notes', JSON.stringify(notes));
        setCurrentNoteId(newNote.id)
    }
    
    function moveToTop(notes, currentId){
        let newNotes = notes
        newNotes.unshift(newNotes.splice(newNotes.findIndex(item => item.id===currentId),1)[0]);
        return newNotes
    }

    function updateNote(text) {
        setNotes(oldNotes => {
            let newNotes = oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, 
                    body: text }
                : oldNote
        })
        newNotes = moveToTop(newNotes, currentNoteId)
        localStorage.setItem('notes', JSON.stringify(newNotes))
        return newNotes
        }
        )
    }

    function updateTitle (event) {
        setNotes(oldNotes => {
            let newNotes = oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, 
                    title: event.target.value }
                : oldNote
        })
        newNotes = moveToTop(newNotes, currentNoteId);
        localStorage.setItem('notes', JSON.stringify(newNotes))
        return newNotes
        }
        )
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function deleteNote(){
        setNotes (oldNotes => {
            let newNotes = oldNotes.filter (item => {
                return item.id!=currentNoteId
            })
            localStorage.setItem('notes', JSON.stringify(newNotes));
            return newNotes
        })
    }
    
    function changeView(event){
        setView(event.target.value)
    }

    console.log(notes)

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                    changeView={changeView}
                    view={view}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote}
                        updateTitle={updateTitle} 
                    />
                }
            </Split>
            :
            // no new notes
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
