import { Link } from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom"


export const Navbar = () =>{
      const[cookies, setCookies] = useCookies(["access_token"]);
      const navigate = useNavigate();
      const logout = () =>{
            setCookies("access_token" , "");
            window.localStorage.removeItem("userID");
navigate("/auth");
      };
      return(
<div className="navbar">
      <Link to="/">home</Link>
      <Link to="/create-recipe">create</Link>
      <Link to="/saved-recipes">saved</Link>
      {!cookies.access_token?(<Link to="/auth">login/register</Link>) : <button className="logout-btn" onClick={logout}>Log Out</button>}
</div>
      );
}