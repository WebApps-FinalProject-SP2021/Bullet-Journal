import { TaskPage } from "./taskPage.js"
import { TrackerPage } from "./trackerPage.js"

const ce = React.createElement

export class DayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "day"
        }
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
                            ce("h2", null, "day page placeholder")
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
