import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CreateRecipe = () => {
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com'

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = JSON.stringify({
      title: event.target.title.value,
      intro: event.target.intro.value,
      ingredients: event.target.ingredients.value,
      directions: event.target.directions.value,
      tags: event.target.tags.value,
    })

    sendRequest(
      `${server_url}/recipes/create`,
      'POST',
      {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json'
      },
      formData,
    ).then( async (res) => {
      await history.replace(`${res.url}`)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  // const populateInstaPhotos = async () => {
  //   try {
  //     await sendRequest(
  //       `${server_url}/recipes/create`,
  //       'GET',
  //       null,
  //       {
  //         Authorization: 'Bearer ' + auth.token
  //       }
  //     );
  //   } catch (err) {}  
  // }
  
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id='title'
          label='Title'
          margin='normal'
          variant='outlined'
          fullWidth={true}
          />
        <br />
        <TextField
          id='intro'
          label='Intro'
          multiline
          rows={20}
          margin="normal"
          variant='outlined'
          fullWidth={true}
          />
          <br />
          <TextField
          id='ingredients'
          label='Ingredients'
          multiline
          rows={20}
          margin="normal"
          variant='outlined'
          fullWidth={true}
          />
          <br />
          <TextField
          id='directions'
          label='Directions'
          multiline
          rows={40}
          margin="normal"
          variant='outlined'
          fullWidth={true}
          />
          <br />
          <TextField
          id='tags'
          label='Tags'
          multiline
          rows={6}
          margin="normal"
          variant='outlined'
          fullWidth={true}
          />
          <br />
          <Button variant='outlined' color='primary' type='submit'> Create Post </Button>
          </form>
      <br />
      <Button variant='outlined' onClick={() => history.replace('/recipes')}> Cancel </Button>
    </div>
  )
}  

export default CreateRecipe;