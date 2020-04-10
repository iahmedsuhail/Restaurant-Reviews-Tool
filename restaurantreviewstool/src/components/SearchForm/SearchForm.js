import React from 'react';
import {Link} from 'react-router-dom';

const SearchForm = () => {
    return(
        <div>
            <p className='f3'>
                {'Search here for restaurants, maybe make an api fetch here and populate data in the SearchFilter component'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text'/>
                    <button className='w-30 grow f4 ph3 pv2 dib white bg-light-purple'>
                    <Link to ='/searchfilter'>
                    Search   
                    </Link>    
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default SearchForm;