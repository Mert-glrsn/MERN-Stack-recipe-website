import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Recipe Detail</h1>
      <div>
        <h2 className="detail-name">{recipe.name}</h2>
        <p className="detail-description">{recipe.description}</p>
        <img className="detail-img" src={recipe.imageUrl} alt={recipe.name} />
        <div className="detail-instructions">
          <li>{recipe.instructions}</li>
        </div>
        <div className="detail-ingredient">
          <p>{recipe.ingredient}</p>
        </div>
        <p className="detail-cookingtime">Cooking Time: {recipe.cookingTime} minutes</p>
        </div>
    </div>
  );
};
