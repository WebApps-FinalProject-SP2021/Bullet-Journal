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
                    ce("form",{className: "col s12"},
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('label', {htmlFor:"edit_title"}, "Task Title" ),
                                ce('input', {type: "text", id: "edit_title",  className: "validate"}),// need to add on change handler
                            ), 
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s12"},
                                ce('label', {htmlFor:"edit_description"}, "Description" ),
                                ce('input', {type: "text", id: "edit_description",  className: "validate"}),
                            ),
                        ),
                        ce("div",{className: "row"},
                            ce("div",{className: "input-field col s6"},
                                ce('label', {htmlFor:"edit_due_date"}, "Due Date" ),
                                ce('input', {type: "text", id: "edit_due_date",  className: "validate"}),
                            ),
                            ce("div",{className: "input-field col s6"},
                                ce('label', {htmlFor:"edit_reminder_date"}, "Reminder Date" ),
                                ce('input', {type: "text", id: "edit_reminder_date",  className: "datepicker"}),
                            ),
                        ),
                            ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.editTask(e)}, "Save"),
                            ce('span', {id: "edit-task"}, this.state.createMessage)
                       
                    )
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
    document.getElementById('reactRoot'),
    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.datepicker');
    //     var instances = M.Datepicker.init(elems, autoClose);
    //   }),
    
);
