const ce = React.createElement;

const addTaskRoute = document.getElementById('addTaskRoute').value;
const allTasksRoute = document.getElementById('allTasksRoute').value;
const csrfToken = document.getElementById("csrfToken").value;

export class TaskList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        //this.handleTitleChange = this.handleTitleChange.bind(this);
        this.state = { 
            tasks: [],
            isShowingDetails: false, 
            addTitle: "",
            addDescription: "",
            completed: false,
            addDueDate: null,
            addReminderDate: null,
            isAdding: false,
        };
    }

    changerHandler(e) {
        this.setState({ [e.target['id']]: e.target.value });
    }

    getTaskState() {
        return {title: this.addTitle, description: this.addDescription, completed: this.completed, dueDate: this.addDueDate, reminder: this.addReminderDate}
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
                                this.state.tasks.map(task => ce(Task, {key: task.taskid, taskData: task, show: () => {this.setState({isShowingDetails: !this.state.isShowingDetails}); this.setState({isAdding: false})} }, null)),
                                ce("a", {className: "waves-effect waves-light btn", onClick: (e) => {this.setState({isAdding: true}); this.setState({isShowingDetails: false})}}, "Add Task"),
                            )
                        )
                    ),
                    ce("div", {className: "col s6"},
                        ce("div", {className: "card"},
                            ce("div", {className: "card-content"},
                                ce('span', {className: "card-title"}, "Task Details"),
                                    this.state.isShowingDetails ? 
                                        ce(EditTask, {isAdding: false, editTask: (e) => this.editTask(e), taskState: () => this.getTaskState()}, null) : 
                                        this.state.isAdding ? 
                                            ce(EditTask, {isAdding: true, addTask: (e) => this.addTask(e), onDataChange: (e) => this.changerHandler(e)}, null) : 
                                            ce("div", null, "Click a Task to see its details")
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
            // TODO: replace nulls with option[date]
            body: JSON.stringify({taskid: -1, dayid: 1, title: this.state.addTitle, description: this.state.addDescription, completed: false, dueDate: null, reminder: null})
          }).then(res => res.json()).then(data => {
            if(data) {
              console.log("success");
              this.loadTasks();
              //this.setState({ taskMessage: "", newTask: "" });
            } else {
              console.log("failure")
              //this.setState({ taskMessage: "Failed to add." });
            }
          });
    }

    editTask(e) {
        // fetch(addTaskRoute, { 
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        //     body: JSON.stringify(this.state.newTask)
        //   }).then(res => res.json()).then(data => {
        //     if(data) {
        //       this.loadTasks();
        //       //this.setState({ taskMessage: "", newTask: "" });
        //     } else {
        //       //this.setState({ taskMessage: "Failed to add." });
        //     }
        //   });
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

    flipCompleted(e) {
        // TODO: Ajax to update completed attribute in DB
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
                // this.state.completed ? ce('i', {className: "material-icons"}, 'check_box') : ce('i', {className: "material-icons"}, 'check_box_outline_blank'),
                // ce("label", null, 
                //     ce("input", {type: "checkbox", className: "filled-in", onClick: e  => this.flipCompleted()}, null),
                //     ce("span", null, "Done")
                // ),
                ce("a", {className: "secondary-content"}, 
                    ce("i", {className: "material-icons"}),
                )   
            )
            ),
            
        ));
    }

}


class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            
        };
    }

    handleChange(e) {
        this.props.onDataChange(e);
    }
    // handleDescriptionChange(e) {
    //     this.props.onDescriptionChange(e.target.value);
    // }
    // handleDueDateChange(e) {
    //     this.props.onDueDateChange(e.target.value);
    // }
    // handleReminderChange(e) {
    //     this.props.onReminderChange(e.target.value);
    // }
    render() {
        return(
            ce("div", {className: "container"},
                ce("div",{className: "row"},
                    ce("form",{className: "col s12"},
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('label', {htmlFor:"edit_title"}, "Task Title" ),
                                ce('input', {type: "text", id: "addTitle", onChange: (e) => this.handleChange(e),  className: "validate"}),
                            ), 
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('label', {htmlFor:"edit_description"}, "Description" ),
                                ce('input', {type: "text", id: "addDescription", onChange: (e) => this.handleChange(e),  className: "validate"}),
                            ),
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s6"},
                                ce('label', {htmlFor:"edit_due_date"}, "Due Date" ),
                                ce('input', {type: "text", id: "addDueDate", onChange: (e) => this.handleChange(e),  className: "validate"}),
                            ),
                            ce("div",{className: "input-field col s6"},
                                ce('label', {htmlFor:"edit_reminder_date"}, "Reminder Date" ),
                                ce('input', {type: "text", id: "addReminderDate", onChange: (e) => this.handleChange(e),  className: "datepicker"}),
                            ),
                        ),
                        this.props.isAdding ? ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.addTask(e)}, "Add") : ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.editTask(e)}, "Save"),
                            ce('span', {id: "edit-task"}, this.state.createMessage)
                       
                    )
                )
            )
            // ce("div", {className: "container"},
            //     ce("div",{className: "row"},
            //         ce("div",{className: "input-field col s6"},
            //             this.props.isAdding ? 
            //                 ce('input', {placeholder:"Title", id: "addTitle", onChange: (e) => this.handleChange(e)}) :
            //                 ce
            //             //ce('div', null, "Temp Text" ),
            //         ),
            //         ce("div",{className: "input-field col s6"},
            //             ce('input', {placeholder:"Description", id: "addDescription", onChange: (e) => this.handleChange(e)}),
            //         ),
            //         ce("div",{className: "input-field col s3"},
            //             ce('input', {placeholder:"Due Date", id: "addDueDate", onChange: (e) => this.handleChange(e)}),
            //         ),
            //         ce("div",{className: "input-field col s3"},
            //             ce('input', {placeholder:"Reminder Date", id: "addReminderDate", onChange: (e) => this.handleChange(e)}),
            //         ),
            //         this.props.isAdding ? ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.addTask(e)}, "Add") : ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.editTask(e)}, "Save"),
            //         ce('span', {id: "edit-task"}, this.state.createMessage)
            //     )
            // )
        );

        

        
    }
    //TODO add all the change handlers and the routes to be changed
    // editTask(e)
    // {

    // }
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