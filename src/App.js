import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home"
import {Auth} from "./pages/auth"
import {Create} from "./pages/create-recipe"
import { SavedRecipes} from "./pages/saved-recipes"
import { RecipeDetail} from "./pages/RecipeDetail"
import {Navbar} from "./components/navbar";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/create-recipe" element={<Create />}/>
          <Route path="/recipes/:id" element={<RecipeDetail />}/>
          <Route path="/saved-recipes" element={<SavedRecipes />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
