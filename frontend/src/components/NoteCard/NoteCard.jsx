import React from "react";

function NoteCard() {
  return (
    <div class="note">
      <div class="note-header">
        <h2>TITRE</h2>
      </div>
      <div class="note-body"></div>
      <div class="note-footer">
        <img
          src="chemin/vers/image-utilisateur.png"
          alt="Image de l'utilisateur"
        />
        <p>Nom d'utilisateur</p>
      </div>
      <div class="card_actions_notes">
        <span class="action_edit_note" title="Modifier">
          &#x270E;
        </span>
        <span class="action_edit_note" title="Supprimer">
          &#x2716;
        </span>
      </div>
    </div>
  );
}

export default NoteCard;
