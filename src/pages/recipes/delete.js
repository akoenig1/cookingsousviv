import React from 'react';
import axios from 'axios';

import { useHistory, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'

const DeleteRecipe = (props) => {
    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault()
        const recipe = props.location.recipe

        const server_url = (process.env.NODE_ENV === 'development')
        ? 'http://localhost:5000'
        : 'https://cookingsousviv-backend.herokuapp.com'

        axios.post(`${server_url}${props.location.pathname}`, recipe)
            .then( (res) => {
                alert(res.data)
                history.push('/recipes')
            })
            .catch((err) => console.log(err))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Are you sure you want to delete {props.location.recipe.title} </h2>
                <br />
                <Button variant='outlined' color='primary' type='submit'> Yes </Button>
                <Button variant='outlined' onClick={() => history.push('/recipes')}> No </Button>
            </form>
        </div>
    )}
  
  
  
  export default DeleteRecipe;