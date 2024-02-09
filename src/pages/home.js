import React, { useEffect, useState } from "react";
import { getUserID } from "../hooks/getUserID";
import { Link } from "react-router-dom";
import axios from "axios";


export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isAdmin, setIsAdmin] = useState("");
  const userID = getUserID();


  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/SavedRecipes/ids/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };
  const checkAdminStatus = async () => {
    try {
      // Fetch user details or check the user role from your backend
      const response = await axios.get(`http://localhost:3001/auth/users/${userID}`);
      const isAdmin = response.data.username === "admin";
      setIsAdmin(response.data.isAdmin);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
    checkAdminStatus();
    fetchSavedRecipes();
  }, [userID]);


  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", { recipeID, userID });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      // Send a request to delete the recipe with recipeId
      await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
  
      // Update the recipes state by removing the deleted recipe
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      // You might want to show an error message to the user or handle the error in a way that makes sense for your application.
    }
  };

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <ul className="container" key={recipe._id}>
            <li>
              <div>
                <h2>{recipe.name}</h2>
                <Link to={`/recipes/${recipe._id}`}><button className="detail-btn">Details</button></Link>
                <button
                  className="home-btn"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              {isAdmin && (
                  <button className="delete-btn" onClick={() => deleteRecipe(recipe._id)}>
                    Delete
                  </button>
                )}
            </li>
          </ul>
        ))}
      </ul>
      <footer className="footer">
        <p>&copy; 2024 Your Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
