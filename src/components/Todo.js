import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



function Todo({ todos, deleteTodo, addTodo, setTodoDone }) {

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    
                    <div className="overview-text">
                        <h1>To Do's</h1>
                    </div>
                </div>

                <div className={todos.length === 0? "mid no-content" : "mid mid-invests"}>

                    {todos.length === 0? (
                            <p>No To Do's Registered Yet!</p>
                        ) : todos.map((item,index) => {
                            return ( 
                            <div className={item["done"] ? "card-entry entry-prof" : "card-entry entry-loss"} key={index}>
                                <h2 className="text-center">{item["title"]}</h2>
                                <p>Description: {item["description"]}</p>
                                <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                    deleteTodo(item["_id"]);
                                }} />
                                <button className={item["done"] ? "btn-add btn-add-investment-profit soft-shadow" : "btn-add btn-add-investment-loss soft-shadow"} onClick={() => {
                                    if (item["done"] == false) {
                                        setTodoDone(item["_id"], true);
                                    } else {
                                        setTodoDone(item["_id"], false);
                                    }
                                }}>{item["done"] == false ? "Mark as Complete" : "Mark as Pending"}</button>
                        </div> );
                    })}

                </div>


                <div className="bot">
                    <input className="earning-input" id="todo-title" placeholder="Title" type="text"></input>
                    <input className="earning-input" id="todo-reason" type="text" placeholder="To Do Description"></input>
                    <button className="btn-add soft-shadow" onClick={() => {addTodo(document.querySelector("#todo-title").value, document.querySelector("#todo-reason").value)}}>Add New Todo</button>
                </div>
            </div>

        </>
    );

}

export default Todo;