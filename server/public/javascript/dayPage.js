import { TaskPage } from "./taskPage.js"
import { TasksToday } from "./taskList.js"
import { TrackerPage } from "./trackerPage.js"

const ce = React.createElement

export class DayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "day",
            tasks: []
        }
    }

    componentDidMount() {
        this.loadTasks();
    }

    render() {
        let currentPage = this.state.currentPage;

        switch(currentPage) {
            case "task":
                return(ce(TaskPage))
            case "tracker":
                return(ce(TrackerPage))
            default:
                return(
                    ce("div", null,
                        ce("nav", null,
                            ce("div", {className: "nav-wrapper cyan lighten-1"},
                                ce("a", {className: "brand-logo", href: "#", style: {paddingLeft: "15px"}, onClick: e => this.switchPage("day", e)}, "Bullet Journal"),
                                ce("ul", {className: "right hide-on-med-and-down", id: "nav-mobile"},
                                    ce("li", {className: "active", key: "navOverview"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("day", e)}, "Today"),
                                    ),
                                    ce("li", {key: "navTasks"},
                                    ce("a", {href: "#", onClick: e => this.switchPage("task", e)}, "Tasks"),
                                    ),
                                    ce("li", {key: "navTracker"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("tracker", e)}, "Moods & Habits"),
                                    ),
                                )
                            )
                        ),
                        ce("div", {className: "container"},
                            ce("div", {className: "row"},
                                ce("h4", {className: "center-align"}, "Current & Upcoming"),
                            ),
                            ce("div", {className: "row"},
                                ce(TasksToday),
                                ce("div", {className: "col s6"}) //placeholder for moods & habits
                                )
                            )
                        )
                )
        } 
    }
    switchPage(newPage, e) {
        e.preventDefault();
        this.setState({ currentPage: newPage })
    }

    loadTasks() {
        fetch(allTasksRoute).then(res => res.json()).then(tasksRet => {console.log(tasksRet); this.setState({ tasks: tasksRet })});
    }
}
