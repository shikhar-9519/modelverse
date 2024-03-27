import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModelCard = ({modelData}) => {
  const {id, name, provider, category }  = modelData ; 
  const history = useNavigate();
  const redirectToDetails = () => {
    history(`models/${id}`)
  }
  return (
      <div className="model-card" key={id}>
        <div className='model-card-body'>
          <div className='model-card-category'>{category}</div>
          <div className='model-card-name'>{name}</div>
          <div className='model-card-provider'>Provider: {provider}</div>
        </div>
        <div className='model-card-footer' onClick={redirectToDetails}>
          <div>Click for details</div>
        </div>
      </div>
  );
}

export default ModelCard;