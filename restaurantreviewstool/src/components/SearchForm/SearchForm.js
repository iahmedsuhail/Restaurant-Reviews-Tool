import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './SearchForm.css';

const SearchForm = ({ onInputChange, onSearchClick, searchfield }) => {

    let history = useHistory();
    var handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchfield.trim().length != 0) {
            onSearchClick(); 
            history.push('/searchfilter');
        }
    }

    return(
        <div className="App">
            <p className=' sunflower-medium f-headline lh-solid f2'>
                Welcome to Restaurant Reviews Tool! Search here for restaurants...
            </p>
            <div className='center'>
                <div className='form measure center pa4 br3 shadow-5'>
                    <input className='f4 pa2 center w-100' type='text' value={searchfield} onChange={onInputChange} onKeyDown={handleKeyDown}/>
                    <Link className="no-decoration bg-light-purple" to ='/searchfilter'>
                        <button className='grow f4 ph3 pv2 dib white bg-light-purple' onClick={onSearchClick}>
                            Search     
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchForm;