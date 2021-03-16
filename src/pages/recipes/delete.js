import React, { useContext } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { AuthContext } from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'

const DeleteRecipe = (props) => {
    let history = useHistory();
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const recipe = JSON.stringify(props.location.recipe);
    const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com'

    const handleSubmit = (event) => {
        event.preventDefault()

        sendRequest(
            `${server_url}${props.location.pathname}`,
            'POST',
            {
                Authorization: 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
            },
            recipe
        ).then( async (res) => {
            await alert(res)
            history.push(`/recipes`)
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Are you sure you want to delete {props.location.recipe.title} </h2>
                <br />
                <Button variant='outlined' color='primary' type='submit'> Yes </Button>
                <Button variant='outlined' onClick={() => history.push(`/recipes`)}> No </Button>
            </form>
        </div>
    )}
  
  
  
  export default DeleteRecipe;