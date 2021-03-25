import React from 'react';
import './Task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';

function Task(props) {
    //get props.items and store in a new var called items so it is easier to access 
    const items = props.items;//these items will be recieved as props 
    //
    const tasks = items.map(item => {
        return <div className="list" key={item.key}>
            <p>
                <input type="text"
                    id={item.key}
                    value={item.text}
                    //onChange attribute needs to be defined 
                    onChange={
                        (e) => {
                            //passing the value and key value as the parameters
                            props.setUpdate(e.target.value, item.key)
                        }
                    }
                />
                <span>
                    <FontAwesomeIcon className="faicons"
                        icon='trash'
                        //give the onClick property the method of props.deleteItem use arrow function to pass the referrence 
                        //pass a key value to identify which item is being deleted
                        onClick={() => props.deleteItem(item.key)
                        } />
                </span>
            </p>
        </div>
    })
    return (
        <div>
            <FlipMove duration={300} easing="ease-in-out">
                {tasks}
            </FlipMove>
        </div>
    )
}




export default Task;