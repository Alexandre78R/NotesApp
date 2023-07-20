import React from "react";

function NoteCard() {
  return (
    <div class="note">
      <div class="note-header">
        <h1>TITRE</h1>
      </div>
      <div class="note-body">
        <p>Texte de la note</p>
      </div>
      <div class="note-footer">
        <img
          src="chemin/vers/image-utilisateur.png"
          alt="Image de l'utilisateur"
        />
        <p>Nom d'utilisateur</p>
      </div>
    </div>
  );
}

export default NoteCard;
