import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Favorites from './pages/favorites';
import CreateRecipe from './pages/recipes/create';
import UpdateRecipe from './pages/recipes/update';
import DeleteRecipe from './pages/recipes/delete';
import Recipes from './pages/recipes/index';
import Unauthorized from './components/Unauthorized';

function Routes(props) {    
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/favorites" component={Favorites} />
      <ProtectedRoute path="/recipes/create" component={CreateRecipe} />
      <ProtectedRoute path="/recipes/:id/update" component={UpdateRecipe} />
      <ProtectedRoute path="/recipes/:id/delete" component={DeleteRecipe} /> 
      <Route path="/recipes" component={Recipes} />
      <Route path= "/unauthorized" component={Unauthorized} />
    </Switch>
  );
}

export default Routes;