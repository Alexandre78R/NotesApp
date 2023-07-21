import { useNavigate } from "react-router-dom";

function SearchBarAdmin({
  searchTerm,
  handleSearch,
  activedButton,
  redirection,
  textButton,
}) {
  const navigate = useNavigate();
  const handleClickAdd = () => {
    navigate(redirection);
  };
  return (
    <div className="search_bar_admin">
      <input
        type="text"
        className="search_input_admin"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {activedButton ? (
        <button className="btn_add_admin" onClick={handleClickAdd}>
          {textButton}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchBarAdmin;
