import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import TextCard from "./TextCard";



function Todo({ todos, deleteTodo, addTodo }) {

    let totalTodo = 0;
    let lastMonthTodo = 0;

    todos.map(val => (
        totalTodo -= parseInt(val["amount"])
    ));

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    
                    <div className="overview-text">
                        <h1>To Do's</h1>
                    </div>
                </div>

                <div className="mid-container">

                    <div className={todos.length === 0? "mid no-content" : "mid"}>

                        {todos.length === 0? (
                            <p>No To Do's Registered Yet!</p>
                        ) : todos.map((item,index) => {
                            return ( <div className="entry entry-loss" key={index}>
                                <p className="entry-value">${item["title"]}</p>
                                <p>{item["description"]}</p>
                                <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                    deleteTodo(item["_id"]);
                                }} />
                            </div> );
                        })}

                    </div>

                </div>


                <div className="bot">
                    <input className="todo-input" id="todo-title" placeholder="Title" type="text"></input>
                    <input className="todo-input" id="todo-reason" type="text" placeholder="To Do Description"></input>
                    <button className="btn-add soft-shadow" onClick={() => {addTodo(document.querySelector("#todo-title").value, document.querySelector("#todo-reason").value)}}>Add New Todo</button>
                </div>
            </div>

        </>
    );

}

export default Todo;