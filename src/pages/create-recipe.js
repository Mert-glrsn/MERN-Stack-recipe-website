import { useState } from "react";
import axios from "axios";
import {getUserID} from "../hooks/getUserID"
import { useNavigate } from "react-router-dom";

export const Create=() =>{
      const userID = getUserID();
      const [recipe , setRecipe] = useState({
            name:"",
            ingredients:[],
            instructions : "",
            imageUrl:"",
            cookingTime:0,
            userOwner:userID
      }); 
      const navigate = useNavigate();
      
      const handleChange = (event)=>{
const {name , value} = event.target;
setRecipe({...recipe , [name]:value});
      };
      const ingredientChange = (event , idx)=>{
            const {value} = event.target;
            const ingredients = recipe.ingredients;
            ingredients[idx] = value;
            setRecipe({...recipe , ingredients});
      };
const addIngredient = ()=>{
setRecipe({...recipe , ingredients: [...recipe.ingredients , ""]});
      };
      const onSubmit = async (event) => {
event.preventDefault(); 
try {
await axios.post("http://localhost:3001/recipes", {...recipe}); 
alert("Recipe Created!");
navigate("/");
} catch (err) {
console.error(err);
}
};
return(
      <div>
<div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
            <label htmlFor="ingredients"> Ingredients</label>
            {recipe.ingredients.map((ingredient , idx) =>(
                  <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event)=>ingredientChange(event ,idx)} />
            ))}
            <button className="create-btn" onClick={addIngredient} type="button"> add ingredient</button>
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange}></textarea>
            <label htmlFor="imageUrl"> Image Url</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
            <label htmlFor="cookingTime">Cook Time</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
            <button  className="create-btn" type="submit"> Let's Create</button>
      </form>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Your Recipe App. All rights reserved.</p>
      </footer>
</div>
      );
}