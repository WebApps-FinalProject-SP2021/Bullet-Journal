import { CalendarPage } from "./calendarPage.js"
import { JournalPage } from "./journalPage.js"

const ce = React.createElement

export class OverviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "overview"
        }
    }

    render() {
        let currentPage = this.state.currentPage;

        switch(currentPage) {
            case "calendar":
                return(ce(CalendarPage))
            case "journal":
                return(ce(JournalPage))
            default:
                return(
                    ce("div", null,
                        ce("nav", null,
                            ce("div", {className: "nav-wrapper cyan lighten-1"},
                                ce("a", {className: "brand-logo", href: "#", style: {paddingLeft: "15px"}, onClick: e => this.switchPage("overview", e)}, "Bullet Journal"),
                                ce("ul", {className: "right hide-on-med-and-down", id: "nav-mobile"},
                                    ce("li", {className: "active", key: "navOverview"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("overview", e)}, "Overview"),
                                    ),
                                    ce("li", {key: "navJournal"},
                                    ce("a", {href: "#", onClick: e => this.switchPage("journal", e)}, "Journal"),
                                    ),
                                    ce("li", {key: "navCalendar"},
                                        ce("a", {href: "#", onClick: e => this.switchPage("calendar", e)}, "Calendar"),
                                    ),
                                )
                            )
                        ),
                        ce("div", {className: "container"},
                            ce("h2", null, "overview page placeholder")
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
