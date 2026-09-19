import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((newToyData) => {
        setToys([...toys, newToyData]);
      });
  }
function handleUpdateToy(updatedToy) {
  const updatedToys = toys.map((toy) =>
    toy.id === updatedToy.id ? updatedToy : toy
  );
  setToys(updatedToys);
}
function handleDeleteToy(id) {
  const updatedToys = toys.filter((toy) => toy.id !== id);
  setToys(updatedToys);
}

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onUpdateToy={handleUpdateToy} onDeleteToy={handleDeleteToy}/>
    </>
  );
}

export default App;
