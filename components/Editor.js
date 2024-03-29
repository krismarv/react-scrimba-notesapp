import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ currentNote, updateNote, updateTitle }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className="pane editor">
            <input
                id='title-input'
                onChange={updateTitle}
                value={currentNote.title}
                >
            </input>
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
                name='body'
            />
        </section>
    )
}
