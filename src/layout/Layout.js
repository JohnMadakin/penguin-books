import React from 'react';

import Nav from '../components/Nav';

export default function Layout(props) {
  const { sideButtons } = props;
  return (

    <div className="mx-auto">
      <Nav sideButtons={sideButtons} />
      {props.children}
    </div>
  );
}
