import React, { useState, useEffect, useContext } from 'react';
import { Link, Route, Switch, matchPath, } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import axios from 'axios';
import Recipe from '../../components/recipes/Recipe';
import Button from '@material-ui/core/Button';
import '../../styles/recipes/styles.css';
import { arrowFunctionExpression } from "@babel/types" // eslint-disable-line no-unused-vars 

function getRecipeList(server_url) {
  return axios.get(`${server_url}/recipes`)
    .then(res => res.data.recipe_list)
    .catch(err => {
      console.log(err);
    }
  );
};

function getRecipe(server_url, id) {
  return axios.get(`${server_url}/recipes/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    }
  );
};

function Recipes({history}) {
  const [recipes, setRecipes] = useState([]);
  const auth = useContext(AuthContext);
  const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com';

  const match = matchPath(history.location.pathname, {
    path: "/recipes/:id"
  });
  
  let recipeId;
  
  if (match && match.params.id) {
    recipeId = match.params.id;
  }

  useEffect(() => {
    let mounted = true
    getRecipeList(server_url)
      .then(recipe_list => {
        if(mounted) {
          setRecipes(recipe_list);
        }
      })
    return () => mounted = false;
  }, [server_url]);

  return(
    <div>
      <h1>RECIPES</h1>

      <ul className="list-group recipe-list">
        { history.location.pathname === '/recipes' ?
          recipes.map(({ title, intro, url, instaPhoto }) =>
            <li key={url} className="list-group-item">
              <div className="recipe-image-container">
                {/* <div className="recipe-image-dummy"></div> */}
                <img src={instaPhoto.media_url} alt="food" className="recipe-image"></img>
              </div>
              <div className="recipe-text-container">
                <Link to={`${url}`} className="align-top recipe-title row">
                  {title}
                </Link>
                <p className="recipe-intro row">{intro}</p>
              </div>
            </li> 
          ) : ''
        }
        <Switch>
          <Route exact path="/recipes/:id" render={(props) => ( <Recipe recipe={recipes.filter( recipe => recipe.url === `/recipes/${recipeId}` )} {...props} /> )} />
          {/* <Route exact path="/recipes/:id" render={(props) => ( <Recipe recipe={getRecipe(server_url, "60459f6050d14d74f4f7f989")} {...props} /> )} /> */}
        </Switch>
        { auth.isAdmin && history.location.pathname==='/recipes' && (
          <Button 
            variant='outlined' 
            onClick={() => history.replace('/recipes/create')}
          > 
            Create 
          </Button>
        )}
      </ul> 

    </div>
  );
}

export default Recipes;