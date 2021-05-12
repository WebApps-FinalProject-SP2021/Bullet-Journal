import { DayPage } from "./dayPage.js"
import { TrackerPage } from "./trackerPage.js"
import { TaskList } from "./taskList.js"
import { checkLogIn } from "./login.js"

// const addTaskRoute = document.getElementById('addTaskRoute').value;
// const editTaskRoute = document.getElementById('editTaskRoute').value;
// const deleteTaskRoute = document.getElementById('deleteTaskRoute').value;
// const allTasksRoute = document.getElementById('allTasksRoute').value;
// const csrfToken = document.getElementById("csrfToken").value;
const ce = React.createElement

export class TaskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "task"
        }
    }

    render() {
        let currentPage = this.state.currentPage;

        switch(currentPage) {
            case "day":
                return(ce(DayPage))
            case "tracker":
                return(ce(TrackerPage))
            case "logout":
                return(ce(checkLogIn))
            default:
                return(
                    ce("div", null,
                        ce("nav", null,
                            ce("div", {className: "nav-wrapper cyan lighten-1"},
                                ce("a", {className: "brand-logo", href: "#", style: {paddingLeft: "15px"}, onClick: e => this.switchPage("day", e)}, "Bullet Journal"),
                                ce("ul", {className: "right hide-on-med-and-down", id: "nav-mobile"},
                                    ce("li", {key: "navDay"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("day", e)}, "Today"),
                                    ),
                                    ce("li", {key: "navTasks", className: "active"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("task", e)}, "Tasks"),
                                    ),
                                    ce("li", {key: "navTracker"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("tracker", e)}, "Moods & Habits"),
                                    ),
                                    ce("li", {key: "navLogout"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("logout", e)}, "Logout"),
                                    ),
                                )
                            )
                        ),
                        ce("div", null, 
                            ce(TaskList),
                        )
                    )
                )
                
        } 
    }
    switchPage(newPage, e) {
        e.preventDefault();
        this.setState({ currentPage: newPage })
    }
}
