const ce = React.createElement;

const addTaskRoute = document.getElementById('addTaskRoute').value;
const allTasksRoute = document.getElementById('allTasksRoute').value;

export class TaskList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { 
            tasks: [],
            isShowingDetails: false, 
            addTitle: "",
            addDescription: "",
            addDueDate: "",
            addReminderDate: ""
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadTasks();
    }

    componentWillUnmount() {
        this._isMounted = false;
      }
    

    render() {
            return( 
            ce("div", {className: "container"},

                ce("div", {className: "row"},
                    ce("h3", {className: "center-align"}, "Task List")
                ),

                ce("div", {className: "row"},
                    ce("div", {className: "col s6"},
                        ce("div", {className: "card"},
                            ce("div", {className: "card-content"},
                                ce('span', {className: "card-title"}, "List"),
                                    //ce(Task, { show: () => this.setState({isShowing: !this.state.isShowing})}, null),
                                    this.state.tasks.map(task => ce(Task, {key: task.taskid, taskData: task, show: () => this.setState({isShowing: !this.state.isShowingDetails}) }, null)),
                                    ce("div",{className: "input-field"},
                                    ce('input', {placeholder:"Title", id: "edit-task"}),
                                        ce('div', null, "Temp Text")
                                )
                            )
                        )
                    ),
                    ce("div", {className: "col s6"},
                        ce("div", {className: "card"},
                            ce("div", {className: "card-content"},
                                ce('span', {className: "card-title"}, "Task Details"),
                                    this.state.isShowing ? ce(EditTask) : ce("div", null, "Click a Task to see its details")
                            )
                        )
                    )
                )
            )
        );
        
    }

    loadTasks() {
        fetch(allTasksRoute).then(res => res.json()).then(tasksRet => {if(this._isMounted) this.setState({ tasks: tasksRet })});
    }

    addTask(e) {
        fetch(addTaskRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify(this.state.newTask)
          }).then(res => res.json()).then(data => {
            if(data) {
              this.loadTasks();
              //this.setState({ taskMessage: "", newTask: "" });
            } else {
              //this.setState({ taskMessage: "Failed to add." });
            }
          });
    }

    changerHandler(e) {
        this.setState({ [e.target['id']]: e.target.value });
    }
}

class Task extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          title: props.taskData.title, 
          description: props.taskData.description, 
          completed: props.taskData.completed, 
          dueDate: props.taskData.dueDate,
          reminder: props.taskData.reminder       
        };
    }

    render() {return(
        ce("div", {className: "container", onClick: e => this.props.show()}, 

            ce("div", {className: "collection"},
                    
            ce("li", {className: "collection-item avatar"},
                ce("i", {className: "material-icons circle pink lighten-1"}),
                ce("span", {className: "title"}, this.state.title),
                ce("div", null, ce("span", null,  this.state.description)),
                this.state.dueDate == undefined ? ce("div", null, ce("span", null,  "No due date set")) : ce("div", null, ce("span", null,  "Due: " + this.state.dueDate)),
                this.state.reminder == undefined ? ce("div", null, ce("span", null,  "No reminder date set")) : ce("div", null, ce("span", null,  "Reminder: " + this.state.reminder)),
                this.state.completed ? ce('i', {className: "material-icons"}, 'check_box') : ce('i', {className: "material-icons"}, 'check_box_outline_blank'),
                ce("a", {className: "secondary-content"}, 
                    ce("i", {className: "material-icons"}),
                )   
            )
            ),
            
        )
    );
    }

}


class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            ce("div", {className: "container"},
                ce("div",{className: "row"},
                    ce("div",{className: "input-field col s6"},
                        ce('input', {placeholder:"tempplaceholder" , id: "edit-task"}),// need to add on chnage handler
                        ce('div', null, "Temp Text" ),
                    ),
                    ce("div",{className: "input-field col s6"},
                        'a'
                    ),
                    ce("div",{className: "input-field col s3"},
                        'b'
                    ),
                    ce("div",{className: "input-field col s3"},
                        'c'
                    ),
                    ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.editTask(e)}, "Save"),
                    ce('span', {id: "edit-task"}, this.state.createMessage)
                )
            )
        );

        
    }
    //TODO add all the change handlers and the routes to be changed
    editTask(e)
    {

    }
}
  

ReactDOM.render(
    ce(TaskList, null, null),
    document.getElementById('reactRoot')
  );

  
                // ce("li", {key: "editTask"},
                // ce("div", {className: "collapsible-header"}, "Edit"),
                // ce("div", {className: "collapsible-body"},
                //     ce("div", {className: "row"},
                //         ce("div", {className: "input-field col s12", id: "titleDiv"},
                //             ce("label", {htmlFor: "title"}, "Task Title"),
                //             ce("input", {type: "text", id: "title", value: this.state.title, onChange: e => this.changerHandler(e)}),
                //         ),
                //     ),
                //     ce("div", {className: "row"},
                //         ce("div", {className: "input-field col s12", id: "descriptionDiv"},
                //             ce("label", {htmlFor: "description"}, "Description"),
                //             ce('input', {type: "description", id: "description", value: this.state.description, onChange: e => this.changerHandler(e)}),
                //         )
                //     ),
                //     ce("div", {className: "row"},
                //         ce("div", {className: "input-field inline col s6", id: "dueDate"},
                //             ce("label", {htmlFor: "dueDate"}, "Due Date"),
                //             ce("input", {type: "text", id: "dueDate", value: this.state.dueDate, onChange: e => this.changerHandler(e)}),
                //         ),
                //         ce("div", {className: "input-field inline col s6", id: "reminderDiv"},
                //             ce("label", {htmlFor: "reminder"}, "Reminder"),
                //             ce("input", {type: "reminder", id: "reminder", value: this.state.reminder, onChange: e => this.changerHandler(e)}),
                //         ),
                //     ),
                //     ce("div", {className: "row"},
                //     //Todo add an indicator/checkmark for when a task is completed 
                //     )
                // ),