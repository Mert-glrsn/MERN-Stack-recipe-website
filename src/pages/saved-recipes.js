import React, { useEffect, useState } from "react";
import { getUserID } from "../hooks/getUserID";
import { Link } from "react-router-dom";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = getUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeId}`);
      // Refresh the saved recipes list after deletion
      const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <Link to={`/recipes/${recipe._id}`}><button className="detail-btn">Details</button></Link>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div className="instructions">
                  <p>{recipe.instructions}</p>
            </div>
            <div className="ingredient">
                  <p>{recipe.ingredient}</p>
            </div>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <button className="saved-btn" onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    <footer className="footer">
        <p>&copy; 2024 Your Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
};
