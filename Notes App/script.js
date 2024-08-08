document.getElementById('add-note').addEventListener('click', function() {
    const noteText = document.getElementById('note-text').value;
    const noteImage = document.getElementById('note-image').files[0];
    if (noteText.trim() === "") {
        alert("Please write something before adding a note.");
        return;
    }

    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note');

    const noteContent = document.createElement('p');
    noteContent.textContent = noteText;

    const noteImg = document.createElement('img');
    if (noteImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            noteImg.src = e.target.result;
        };
        reader.readAsDataURL(noteImage);
    }
    noteImg.classList.add('note-image');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-note');
    editButton.innerHTML = '✎';
    editButton.addEventListener('click', function() {
        const isEditing = noteContainer.classList.toggle('editing-note');
        if (isEditing) {
            document.getElementById('note-text').value = noteContent.textContent;
            document.getElementById('note-image').value = ''; // Clear image input
            noteContainer.querySelector('.delete-note').style.display = 'none';
            editButton.textContent = '✓';
            editButton.addEventListener('click', function() {
                noteContent.textContent = document.getElementById('note-text').value;
                noteImg.src = document.getElementById('note-image').files[0] ? URL.createObjectURL(document.getElementById('note-image').files[0]) : '';
                noteContainer.classList.remove('editing-note');
                editButton.textContent = '✎';
                editButton.removeEventListener('click', arguments.callee); // Remove previous event listener
                noteContainer.querySelector('.delete-note').style.display = 'block';
            });
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-note');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', function() {
        noteContainer.remove();
    });

    noteContainer.appendChild(noteContent);
    if (noteImage) noteContainer.appendChild(noteImg);
    noteContainer.appendChild(editButton);
    noteContainer.appendChild(deleteButton);

    document.getElementById('notes-container').appendChild(noteContainer);

    document.getElementById('note-text').value = ''; // Clear the textarea after adding the note
    document.getElementById('note-image').value = ''; // Clear the file input after adding the note
});
