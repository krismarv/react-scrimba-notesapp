import React, { useEffect } from "react"
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
    const [sort, setSort] = React.useState('updated')
    const [direction, setDirection] = React.useState('asc')


    function createNewNote() {
        const newNote = {
            id: nanoid(),
            // N O T E: GENERATE UNIQUE TITLES!!!
            title: `Note ${notes.length+1}`,
            body: "# Type your markdown note's title here", 
            date: new Date().toLocaleDateString('cs-CZ'), 
            updated: Date.now()
        }
        setNotes(prevNotes => [newNote, ...prevNotes]);
        localStorage.setItem('notes', JSON.stringify(notes));
        doSort(sort);
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        setNotes(oldNotes => {
            let newNotes = oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, 
                    body: text, 
                    updated: Date.now() }
                : oldNote
        })

        localStorage.setItem('notes', JSON.stringify(newNotes));
        doSort(sort);
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
 
        localStorage.setItem('notes', JSON.stringify(newNotes));
        doSort(sort);
        return newNotes
        }
        )
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function deleteNote(event, noteid){
        setNotes (oldNotes => {
            let newNotes = oldNotes.filter (item => {
                return item.id!=noteid
            })
            localStorage.setItem('notes', JSON.stringify(newNotes));
            return newNotes
        })
    }
    
    function changeView(event){
        setView(event.target.value)
    }

    function doSort(currentSort) {
        switch (currentSort) {
            case "updated":
                if (direction==='asc') {
                    setNotes(oldNotes => {
                        return [...oldNotes].sort((a,b) => {
                            return a.updated - b.updated
                        })
                    });
                    break;
                } else {
                    setNotes(oldNotes => {
                        return [...oldNotes].sort((a,b) => {
                            return b.updated - a.updated
                        })
                    });
                    break;
                }
            case "created":
                if (direction === 'asc') {
                    setNotes(oldNotes => {
                        return [...oldNotes].sort((a,b) => {
                            if (a.date > b.date) {
                              return 1
                          } else if (a.date < b.date) {
                              return -1
                          } else if (a.date == b.date) {
                              return 0
                          }
                        })
                    });
                    break;
                } else {
                    setNotes(oldNotes => {
                        return [...oldNotes].sort((a,b) => {
                            if (a.date > b.date) {
                              return -1
                          } else if (a.date < b.date) {
                              return 1
                          } else if (a.date == b.date) {
                              return 0
                          }
                        })
                    });
                    break;
                }
            case "name":
                if (direction === 'asc') {
                    setNotes(oldNotes => {
                        return [...oldNotes].sort((a,b) => {
                            let titleA = a.title.toUpperCase();
                            let titleB = b.title.toUpperCase();
                            if (titleA > titleB) {
                              return 1
                          } else if (titleA < titleB) {
                              return -1
                          } else if (titleA == titleB) {
                              return 0
                          }
                        })});
                break; 
                } else {
                    setNotes(oldNotes => {
                        return [...oldNotes].sort((a,b) => {
                            let titleA = a.title.toUpperCase();
                            let titleB = b.title.toUpperCase();
                            if (titleA > titleB) {
                              return -1
                          } else if (titleA < titleB) {
                              return 1
                          } else if (titleA == titleB) {
                              return 0
                          }
                        })});
                break;
                }

        }
    }

    
    // sorting
    function changeSort(event) {
        setSort(event.target.value);
    }
    useEffect(()=>{
        doSort(sort);
    }, [sort, direction])

    function changeDirection(event) {
        setDirection(oldValue => oldValue==='asc' ? 'desc' : 'asc')
    }

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
                    changeSort={changeSort}
                    sort={sort}
                    direction={direction}
                    changeDirection={changeDirection}
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
