import React from 'react';
import {Link} from 'react-router-dom';

const SearchFilter = () => {
    return(
        <div>
            <Link to ='/reviewcomponent'>
                <article className="center mw5 mw6-ns hidden ba mv4">
                    <h1 className="f4 bg-near-black white mv0 pv2 ph3">Title of card</h1>
                    <div className="pa3 bt">
                        <p className="f6 f5-ns lh-copy measure mv0">
                         - Data from a search result should be shown here <br />
                         - should probably be able to search by cuisines, locations, restaurant names <br />
                         - a click on a result should then gather result from diff apis and show result in the next page
                        </p>
                    </div>
                </article>
            </Link>
        </div>
    );
}
export default SearchFilter;