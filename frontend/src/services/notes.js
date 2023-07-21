import api from "./api";

const getAllNotes = () => {
    return api.get("/notes");
}


const createNote = (data) => {
    return api.post("/notes/register", data);
}


const deleteNote = (id) => {
    return api.delete(`/notes/${id}`)
  }
  
  const getNote = (id)  => {
    return api.get(`/notes/${id}`)
  }
  
  const modifyNote = (data, id) => {
    return api.put(`/notes/${id}`, data)
  }

export { getAllNotes, createNote, deleteNote, getNote, modifyNote };
export default { getAllNotes, createNote, deleteNote, getNote, modifyNote };