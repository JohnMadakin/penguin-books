import React from 'react';
import {
  Link,
  // Switch,
  // Route,
  // useRouteMatch
} from "react-router-dom";
import Book from '../pages/Book';

export default function SingleWork(props) {
  // let { path, url } = useRouteMatch();

  let rgcopy = "";
  if (props.work.rgcopy && props.work.rgcopy.length){
    rgcopy = props.work.rgcopy.substring(0,250) + "...";
  }
  return (
    <div className="md:flex max-w-screen-md mx-auto m-6">
      <div className="md:flex-shrink-0">
        <img className="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="Woman paying for a purchase" />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6">
        <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{props.work.authorweb}</div>
        <Link to={`/authors/${props.work.workid}`} className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">{props.work.titleAuth}</Link>
        <p className="mt-2 text-gray-600">{rgcopy}</p>
      </div>
      {/* <Switch>
        <Route path={`${path}/:topicId`}>
          <Book />
        </Route>
      </Switch> */}
    </div>  
    );
}
