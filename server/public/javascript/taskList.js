const ce = React.createElement;

const addTaskRoute = document.getElementById('addTaskRoute').value;
const editTaskRoute = document.getElementById('editTaskRoute').value;
const allTasksRoute = document.getElementById('allTasksRoute').value;
const csrfToken = document.getElementById("csrfToken").value;

//const instance = M.Datepicker.getInstance(document.getElementById("addReminderDate"));
//console.log(instance.toString());

export class TaskList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        //this.handleTitleChange = this.handleTitleChange.bind(this);
        this.state = { 
            tasks: [],
            editTask: null,
            editTitle: "",
            editDescription: "",
            //editcompleted: false,
            editDueDate: "",
            editReminderDate: "",
            editTaskid: -1,
            isEditing: false, 
            addTitle: "",
            addDescription: "",
            //addcompleted: false,
            addDueDate: null,
            addReminderDate: null,
            isAdding: false,
            completed: false,
        };
        //this.taskElement = React.createRef();
    }

    changerHandler(e) {
        this.setState({ [e.target['id']]: e.target.value });
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
                                this.state.tasks.map(task => ce(Task, {key: task.id + task.title + task.description + task.dueDate + task.reminder, taskData: task, show: () => {this.setState({editTask: task}); this.setState({editTaskid: task.taskid}), this.setState({isEditing: !this.state.isEditing}); this.setState({isAdding: false})} }, null)),
                                ce("a", {className: "waves-effect waves-light btn", onClick: (e) => {this.setState({isAdding: !this.state.isAdding}); this.setState({isEditing: false})}}, "Add Task"),
                            )
                        )
                    ),
                    ce("div", {className: "col s6"},
                        ce("div", {className: "card"},
                            ce("div", {className: "card-content"},
                                ce('span', {className: "card-title"}, "Task Details"),
                                    this.state.isEditing ? 
                                        ce(EditTask, {editTask: (e) => this.editTask(e), onDataChange: (e) => this.changerHandler(e), taskState: this.state.editTask}, null) : 
                                        this.state.isAdding ? 
                                            ce(AddTask, {addTask: (e) => this.addTask(e), onDataChange: (e) => this.changerHandler(e)}, null) : 
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
            // TODO: fix dayid
            body: JSON.stringify({taskid: -1, dayid: 1, title: this.state.addTitle, description: this.state.addDescription, completed: false, dueDate: this.state.addDueDate, reminder: this.state.addReminderDate})
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
        const task = this.state.editTask;
        console.log(task);
        fetch(editTaskRoute, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            // TODO: fix dayid
            body: JSON.stringify({taskid: this.state.editTaskid, dayid: 1, title: task.title, description: task.description, completed: task.completed, dueDate: task.dueDate, reminder: task.reminder})
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
}

class Task extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          task: props.taskData,
          title: props.taskData.title, 
          description: props.taskData.description, 
          completed: props.taskData.completed, 
          dueDate: props.taskData.dueDate,
          reminder: props.taskData.reminder,
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
                this.state.dueDate == "" || this.state.dueDate == null ? ce("div", null, ce("span", null,  "No due date set")) : ce("div", null, ce("span", null,  "Due: " + this.state.dueDate)),
                this.state.reminder == "" || this.state.reminder == null ? ce("div", null, ce("span", null,  "No reminder date set")) : ce("div", null, ce("span", null,  "Reminder: " + this.state.reminder)),
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


class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.changeData("task", "");
        this.changeData("description", "");
        this.changeData("completed", false);
        this.changeData("dueDate", null);
        this.changeData("reminder", null);
        // this.state = {
        // };
    }

    changeData(id, value) {
        const e = {target: {id: id, value: value}}
        this.props.onDataChange(e);
    }

    handleChange(e) {
        this.props.onDataChange(e);
    }
    
    componentDidMount() {
        M.AutoInit();
        const dueDateInstance = M.Datepicker.init(document.getElementById("addDueDate"), {
            format: "yyyy-mm-dd",
            onSelect: () => {
                const day = dueDateInstance.toString();
                this.changeData("addDueDate", day);
            },
            onOpen: () => {
                console.log("open");
                this.changeData("addDueDate", null);
            },
            onDraw: () => {
                console.log("draw");
                this.changeData("addDueDate", null);
            },
            onClose: () => {
                console.log("closed");
                // const e = {target: {id: "addDueDate", value: ""}};
                // this.props.onDataChange(e);
            }});
        const reminderDateInstance = M.Datepicker.init(document.getElementById("addReminderDate"), {
            format: "yyyy-mm-dd",
            onSelect: () => {
                const day = reminderDateInstance.toString();
                this.changeData("addReminderDate", day);
            },
            onOpen: () => {
                console.log("open");
                this.changeData("addReminderDate", null);
            },
            onDraw: () => {
                console.log("draw");
                this.changeData("addReminderDate", null);
            },
            onClose: () => {
                console.log("closed");
                // const e = {target: {id: "addReminderDate", value: ""}};
                // this.props.onDataChange(e);
            }});
        }

    render() {
        return(
            ce("div", {className: "container"},
                ce("div",{className: "row"},
                    ce("form",{className: "col s12"},
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('label', {htmlFor:"addTitle"}, "Task Title" ),
                                    ce('input', {type: "text", id: "addTitle", onChange: (e) => this.handleChange(e),  className: "validate"})
                            ), 
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('label', {htmlFor:"addDescription"}, "Description" ),
                                ce('input', {type: "text", id: "addDescription", onChange: (e) => this.handleChange(e),  className: "validate"}),
                            ),
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s6"},
                                ce('label', {htmlFor:"edit_due_date"}, "Due Date" ),
                                ce('input', {type: "text", id: "addDueDate", className: "datePicker"}),
                            ),
                            ce("div",{className: "input-field col s6"},
                                ce('label', {htmlFor:"edit_reminder_date"}, "Reminder Date" ),
                                ce('input', {type: "text", id: "addReminderDate", className: "datepicker"}),
                            ),
                        ),
                        ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.addTask(e)}, "Add"),
                            //ce('span', {id: "add-task"}, this.state.createMessage)
                       
                    )
                )
            )
        );

        

        
    }
}

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        const task = props.taskState;
        this.state = {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            reminder: task.reminder,
        };
    }

    handleChange(e) {
        // TODO: fix removal of last character
        const task = {title: this.state.title, description: this.state.description, dueDate: this.state.dueDate, reminder: this.state.reminder, completed: false};
        console.log(task);
        const ev = {target: {id: "editTask", value: task}};
        this.props.onDataChange(ev);
    }
    
    componentDidMount() {
        M.AutoInit();
        const dueDateInstance = M.Datepicker.init(document.getElementById("editDueDate"), {
            format: "yyyy-mm-dd",
            onSelect: () => {
                const day = dueDateInstance.toString();
                this.setState({dueDate: day});
                this.handleChange(null);
            },
            onOpen: () => {
                console.log("open");
                this.setState({dueDate: null});
            },
            onDraw: () => {
                console.log("draw");
                this.setState({dueDate: null});
            },
            onClose: () => {
                console.log("closed");
                //this.setState({dueDate: ""});
            }
            });
        const reminderDateInstance = M.Datepicker.init(document.getElementById("editReminderDate"), {
            format: "yyyy-mm-dd",
            onSelect: () => {
                const day = reminderDateInstance.toString();
                this.setState({reminder: day});
                this.handleChange(null);
            },
            onOpen: () => {
                console.log("open");
                this.setState({reminder: null});
            },
            onDraw: () => {
                console.log("draw");
                this.setState({reminder: null});
            },
            onClose: () => {
                console.log("closed");
                //this.setState({reminder: ""});
            }
            });
        }


    render() {
        return(
            ce("div", {className: "container"},
                ce("div",{className: "row"},
                    ce("form",{className: "col s12"},
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('input', {type: "text", id: "editTitle",  onChange: (e) => {this.setState({title: e.target.value}); this.handleChange(e)}, className: "validate", defaultValue: this.state.title}, null),
                                ce('label', {htmlFor:"editTitle", className:"active"}, "Task Title")                                
                            ), 
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('input', {type: "text", id: "editDescription", onChange: (e) => {this.setState({description: e.target.value}); this.handleChange(e)}, className: "validate", defaultValue: this.state.description}, null),
                                ce('label', {htmlFor:"editDescription", className:"active"}, "Description" )
                            ),
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s6"},
                                ce('input', {type: "text", id: "editDueDate", className: "datepicker", defaultValue: this.state.dueDate}, null),
                                ce('label', {htmlFor:"editDueDate", className:"active"}, "Due Date" )
                            ),
                            ce("div",{className: "input-field col s6"},
                                ce('input', {type: "text", id: "editReminderDate", className: "datepicker", defaultValue: this.state.reminder}, null),
                                ce('label', {htmlFor:"editReminderDate", className:"active"}, "Reminder Date")
                                
                            ),
                        ),
                        ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: (e) => this.props.editTask(e)}, "Save"),
                            //ce('span', {id: "edit-task"}, this.state.createMessage)
                       
                    )
                )
            )
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