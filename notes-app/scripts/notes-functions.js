// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        return []
    }
}

//Save notes
const saveNotes = notes => localStorage.setItem('notes',JSON.stringify(notes))


const editNotes = (noteAttribute, editText) => {
    noteAttribute = editText
    saveNotes(notes)
}

// Remove a note from the list
const removeNote = id => {
    const noteIndex = notes.findIndex( note => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = note => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const status = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    }else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // Setup the status message
    status.textContent = generateLastEdited(note.updatedAt)
    status.classList.add('list-item__subtitle')
    noteEl.appendChild(status)

    return noteEl
}

// Sort your notes by one of three ways
const sortNotes = (notes, sortedBy) =>{
    if (sortedBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) return -1
            else if (a.updatedAt < b.updatedAt) return 1
            else return 0
        })
    } else if (sortedBy === 'byCreated'){
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1
            else if (a.createdAt < b.createdAt) return 1
            else return 0
        })

    } else if (sortedBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
            else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
            else return 0
        })
    } else{
        return notes
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortedBy)
    const filteredNotes = notes.filter( note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    notesEl.innerHTML = ''

    if (filteredNotes.length > 0){
        filteredNotes.forEach(note => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
    
}

// Generate the last edited message
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`
