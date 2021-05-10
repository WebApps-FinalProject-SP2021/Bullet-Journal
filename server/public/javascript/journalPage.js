import { OverviewPage } from "./overviewPage.js"
import { CalendarPage } from "./calendarPage.js"

const ce = React.createElement

export class JournalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "journal"
        }
    }

    render() {
        let currentPage = this.state.currentPage;

        switch(currentPage) {
            case "overview":
                return(ce(OverviewPage))
            case "calendar":
                return(ce(CalendarPage))
            default:
                return(
                    ce("div", null,
                        ce("nav", null,
                            ce("div", {className: "nav-wrapper cyan lighten-1"},
                                ce("a", {className: "brand-logo", href: "#", style: {paddingLeft: "15px"}, onClick: e => this.switchPage("overview", e)}, "Bullet Journal"),
                                ce("ul", {className: "right hide-on-med-and-down", id: "nav-mobile"},
                                    ce("li", {key: "navOverview"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("overview", e)}, "Overview"),
                                    ),
                                    ce("li", {className: "active", key: "navJournal"},
                                    ce("a", {href: "#", onClick: e => this.switchPage("journal", e)}, "Journal"),
                                    ),
                                    ce("li", {key: "navCalendar"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("calendar", e)}, "Calendar"),
                                    ),
                                )
                            )
                        ),
                        ce("div", {className: "container"},
                            ce("h2", null, "journal page placeholder")
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
