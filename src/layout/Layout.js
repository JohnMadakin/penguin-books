import React from 'react';
export default function Layout(props) {
  // const { sideButtons } = this.props;
  return (

    <div className="mx-auto">
      {props.children}
    </div>
  );
}
function getId(obj){
  return obj.id;
}

getId({
  get id(){
    return Math.random();
  }
});
