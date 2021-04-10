import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../../hooks/useHttpClient';
import { AuthContext } from '../../context/auth-context';
import SelectPhoto from '../../components/SelectPhoto';
import WriteRecipe from '../../components/WriteRecipe';
import Button from '@material-ui/core/Button';

const useFormProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const goForward = () => {
    setCurrentStep(currentStep + 1);
  }

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  }

  return [currentStep, goForward, goBack];
}

const CreateRecipe = () => {
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const [currentStep, goForward, goBack] = useFormProgress();
  const [state, setState] = useState({
    title: "",
    intro: "",
    ingredients: "",
    directions: "",
    tags: "",
    photo: null,
  });
  const auth = useContext(AuthContext);
  const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com';


  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.id]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = JSON.stringify({
      title: state.title,
      intro: state.intro,
      ingredients: state.ingredients,
      directions: state.directions,
      tags: state.tags,
      photo: state.photo
    });

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

  const steps = [
    <SelectPhoto state={state} setState={setState} useFormProgress={useFormProgress}/>, 
    <WriteRecipe state={state} handleChange={handleChange}/>
  ];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return(
    <div>
      <form onSubmit={handleSubmit}>
        {steps[currentStep]}
      </form>
      <br />
      <Button variant='outlined' onClick={() => history.replace('/recipes')}> Cancel </Button>
      {!isFirst && 
        <Button 
          onClick={() => goBack()}
        >
          Go Back
        </Button>
      }
      <Button 
        variant='outlined' 
        color='primary' 
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          isLast ? handleSubmit(e) : goForward();
        }}
      > 
        {isLast ? "Create Post" : "Next"} 
      </Button>
    </div>
  );
}  

export default CreateRecipe;