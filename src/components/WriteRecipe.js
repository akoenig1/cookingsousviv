import React from "react";
import TextField from '@material-ui/core/TextField';

const WriteRecipe = (props) => {
    return(
      <div>
        <TextField
          id='title'
          label='Title'
          margin='normal'
          variant='outlined'
          fullWidth={true}
          defaultValue={props.state.title}
          onChange={props.handleChange}
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
          defaultValue={props.state.intro}
          onChange={props.handleChange}
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
          defaultValue={props.state.ingredients}
          onChange={props.handleChange}
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
          defaultValue={props.state.directions}
          onChange={props.handleChange}
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
          defaultValue={props.state.tags}
          onChange={props.handleChange}
        />
        <br />
      </div>
    )
}

export default WriteRecipe;