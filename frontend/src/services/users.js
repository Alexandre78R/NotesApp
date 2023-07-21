import api from "./api";

const getAllUsers = () => {
    return api.get("/users");
}

const getCurrentUser = () => {
    return api.get("/users/me");
}

const createAccount = (data) => {
    return api.post("/users/register", data);
}

const updateAvatar = (form) => {
    return api.post("/users/updateAvatar", form);
}

const deleteUtilisateur = (id) => {
    return api.delete(`/users/${id}`)
  }
  
  const getUser = (id)  => {
    return api.get(`/users/${id}`)
  }
  
  const modifyAccount = (data, id) => {
    return api.put(`/users/${id}`, data)
  }

export {getAllUsers, getCurrentUser, updateAvatar, createAccount, deleteUtilisateur, getUser, modifyAccount};
export default { getAllUsers, getCurrentUser, updateAvatar, createAccount, deleteUtilisateur, getUser, modifyAccount};