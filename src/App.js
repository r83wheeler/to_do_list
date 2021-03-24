import React from 'react';
import './App.css';
import Task from './Task'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    //define the state
    this.state = {
      items: [],
      //object for the current item, stores the text and key
      currentItem: {
        text: '',
        key: ''
      }
    }
    //hard bind the this value to the constructor function so the handleInput method doesn't lose it's context,,, do the same for addItem
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e) {
    //to change the state variable, use the method called setState
    this.setState({
      //inside this object are the variables that I want to update
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  addItem(e) {
    //prevent the button's default behavior (refreshing the page)
    e.preventDefault();
    //get the current item and store it in a variable called newItem
    const newItem = this.state.currentItem;
    console.log(newItem);
    //check if the newItem.text is not empty
    if (newItem.text !== "") {
      //unpack all of the items in the list and converts them into individual items
      const newItems = [...this.state.items, newItem];
      //update the state variable
      this.setState({
        //set the items to the newItems array
        items: newItems,
        //now set the current item back to empty values 
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
  }
  deleteItem(key) {
    //property called filter that filters the items that meets the condition we give
    //will filter all items that key doesn't match and store it in filteredItems
    const filteredItems = this.state.items.filter(item =>
      item.key !== key);
    //update state
    this.setState({
    items: filteredItems
  })
}
//define the function, it recieves the value and key
setUpdate(text, key){
  const items = this.state.items;
  //loop through each item using the map function
  items.map(item =>{
    //check if the item key is equal to the key that is provided in the function
    if(item.key===key){
      //then change the text to the text value
      item.text=text;
    }
  })
  //update this state with the new items
  this.setState({
    items: items
  })
}



render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter Task"
            //link the input field and current item by setting the value of the input field to currentItem.text
            //variables and methods must be enclosed inside of curly braces because it is part of jsx when including javascript variable or method inside of an html file
            value={this.state.currentItem.text}
            //sets the onChange to the handleInput method
            onChange={this.handleInput} />
          <button type="submit">Add</button>
        </form>
      </header>
      <Task items={this.state.items}
        deleteItem={this.deleteItem}
        setUpdate ={this.setUpdate}></Task>
    </div>
  );
}
}

export default App;
