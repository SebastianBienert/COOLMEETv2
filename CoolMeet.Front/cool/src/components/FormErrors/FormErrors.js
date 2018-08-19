import React from 'react';
import './FormErrors.css';

export const FormErrors = ({formErrors}) =>
  {return (listOfErrorsNotEmpty(formErrors) &&
          <div className='formErrors'>
              {Object.keys(formErrors).map((fieldName, i) => {
                if(formErrors[fieldName].length > 0){
                  return (
                    <p key={i}>{formErrors[fieldName]}</p>
                  )        
                } else {
                  return '';
                }
              })}
          </div>)
  }
function listOfErrorsNotEmpty(formErrors) {
      for (var key in formErrors) {
          if (formErrors.hasOwnProperty(key)) {
              if(formErrors[key].length > 0)
                  return true;
          }
      }
      return false;
  }