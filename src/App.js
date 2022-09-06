import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar";
import ReciepeCard from "./components/ReciepeCard";


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [reciepes, setReciepes] = useState([]);

  // function to search for the reciepes

  const searcReciepes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    setReciepes(data.meals);
    setIsLoading(false);
         
  };

  useEffect(() => {
    searcReciepes();
  }, []);

  const handleSubmit = event => {
    event.preventDefault()
    searcReciepes()
  };




  return (
    <div className="container">
      <h2>Our Reciepe App</h2>
      <SearchBar  
        handleSubmit={handleSubmit}
        value={query}
        onChange={event => setQuery(event.target.value)}
        isLoading={isLoading}

      />
      <div className="reciepes">
      {reciepes ? reciepes.map(reciepe => (
        <ReciepeCard
          key={reciepe.idMeal}
          reciepe={reciepe}
        />
      )): "No Reciepes!" }

      </div>
    </div>
  );
}

export default App;
