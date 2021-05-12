import { TaskPage } from "./taskPage.js"
import { TasksToday } from "./taskList.js"
import { TrackerPage } from "./trackerPage.js"
import { checkLogIn } from "./login.js"
import { MyChart } from './myChart.js'

const ce = React.createElement

const allTasksRoute = document.getElementById('allTasksRoute').value;

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
            case "logout":
                return(ce(checkLogIn))
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
                                    ce("li", {key: "navLogout"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("logout", e)}, "Logout"),
                                    ),
                                )
                            )
                        ),
                        ce("div", {className: "container"},
                            ce("div", {className: "row"},
                                ce("h4", {className: "center-align"}, "Current & Upcoming"),
                            ),
                            ce("div", {className: "row"},
                                ce('input', {type: "text", id: "pickDay", className: "datepicker", defaultValue: getCurrentDate()}, null),
                            ),
                            ce("div", {className: "row"},
                                ce(TasksToday),
                                ce("div", {className: "col s6"}), //placeholder for moods & habits
                                ce(MoodChart),
                                ce("div", {className: "col s6"}) //placeholder for moods & habits
                             ),
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
    componentDidMount() {
        M.AutoInit();
        const dueDateInstance = M.Datepicker.init(document.getElementById("pickDay"));
    }
}

class MoodChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        habits: [],
        moodRatings: {"05/04/2021":0, "05/05/2021":1, "05/06/2021":1, "05/07/2021":2,  "05/08/2021":0, "05/09/2021":1, }, //set back to 0   
   
      };
    }
    componentDidMount() {
        this._isMounted = true;
        //this.loadMoods();

    }

    render() {
        return(
        ce("div", {className: "container"},

            ce("div", {className: "row"},
                ce("div", {className: "col s6"},
                    ce("div", {className: "card"},
                        ce("div", {className: "card-content"},
                            ce('span', {className: "card-title"}, "Mood Charts"),    
                            ce(MyChart, {ratings: this.state.moodRatings}),
                            console.log("current : " + JSON.stringify(this.state.moodRatings)),
                        )
                    )
                )
            ),
        )
    );}
}


function getCurrentDate()
{
    let today = new Date();
    let  dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return ( mm + '/' + dd + '/' + yyyy);
}
