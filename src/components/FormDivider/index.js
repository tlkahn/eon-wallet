import React from 'react';
import {Page} from 'react-onsenui';
import './FormDivider.css';


const FormDivider = (props) => {
  return (
    <div className="FormDivider__root">
      <div className="FormDivider__line" />
      <div className="FormDivider__text">OR</div>
      <div className="FormDivider__line"/>
    </div>
  );
}

export default FormDivider;
