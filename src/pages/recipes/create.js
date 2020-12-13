import React from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const CreateRecipe = () => {
    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            title: event.target.title.value,
            intro: event.target.intro.value,
            ingredients: event.target.ingredients.value,
            directions: event.target.directions.value,
            tags: event.target.tags.value,
            //instaPhoto: event.target.instaPhoto.value
        }

        const server_url = (process.env.NODE_ENV === 'development')
        ? 'http://localhost:5000'
        : 'https://cookingsousviv-backend.herokuapp.com'
  
        axios.post(`${server_url}/recipes/create`, data)
            .then( async (res) => await history.replace(`${res.data}`) )
            .catch((err) => console.log(err))
    }
  
    const populateInstaPhotos = () => {
        const server_url = (process.env.NODE_ENV === 'development')
        ? 'http://localhost:5000'
        : 'https://cookingsousviv-backend.herokuapp.com'

        return axios.get(`${server_url}/recipes/create`)
                    .then(response => console.log(response))
                    .catch((err) => console.log(err))
    }
  
      return(
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id='title'
              label='Title'
              margin='normal'
              variant='outlined'
              fullWidth='true'
              />
            <br />
            <TextField
              id='intro'
              label='Intro'
              multiline
              rows={20}
              margin="normal"
              variant='outlined'
              fullWidth='true'
              />
             <br />
             <TextField
              id='ingredients'
              label='Ingredients'
              multiline
              rows={20}
              margin="normal"
              variant='outlined'
              fullWidth='true'
              />
             <br />
             <TextField
              id='directions'
              label='Directions'
              multiline
              rows={40}
              margin="normal"
              variant='outlined'
              fullWidth='true'
              />
             <br />
             <TextField
              id='tags'
              label='Tags'
              multiline
              rows={6}
              margin="normal"
              variant='outlined'
              fullWidth='true'
              />
             <br />
             <Button variant='outlined' color='primary' type='submit'> Submit </Button>
             </form>
          <br />
          <Button variant='outlined' onClick={() => history.replace('/recipes')}> Cancel </Button>
        </div>
    )}
  
  
  
  export default CreateRecipe;