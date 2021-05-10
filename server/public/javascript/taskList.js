const ce = React.createElement


export class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tasks: [],
            isShowing: false, 
            
        }
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
                                    ce(Task, { show: () => {this.setState({isShowing: !this.state.isShowing})}}, null)
                     
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

    changerHandler(e) {
        this.setState({ [e.target['id']]: e.target.value });
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "Test Title", 
          description: "Test Description", 
          completed: "False", 
          dueDate: "5/9/2021",
          reminder: "5/8/2021", 
 
        };
    }
    render() {return(
        ce("div", {className: "container", onClick: e => this.props.show()}, 

            ce("div", {className: "collection"},
                    
            ce("li", {className: "collection-item avatar"},
                ce("i", {className: "material-icons circle pink lighten-1"}),
                ce("span", {className: "title"}, this.state.title),
                ce("div", null, ce("span", null,  this.state.description)),
                ce("div", null, ce("span", null,  this.state.dueDate)),


                ce("div", null, ce("span", null,  this.state.completed)),
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
                        // ce('input ', {placeholder:"tempplaceholder" , id: "edit-task"}),// need to add on chnage handler
                        ce('div', null, "Temp Text" ),
                    ),
                    ce("div",{className: "input-field col s6"},
                        
                    ),
                    ce("div",{className: "input-field col s3"},
                        
                    ),
                    ce("div",{className: "input-field col s3"},
                        
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