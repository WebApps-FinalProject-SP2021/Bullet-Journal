import { OverviewPage } from "./overviewPage.js"
import { JournalPage } from "./journalPage.js"

const ce = React.createElement

export class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "calendar"
        }
    }

    render() {
        let currentPage = this.state.currentPage;

        switch(currentPage) {
            case "overview":
                return(ce(OverviewPage))
            case "journal":
                return(ce(JournalPage))
            default:
                return(
                    ce("div", null,
                        ce("nav", null,
                            ce("div", {className: "nav-wrapper cyan lighten-1"},
                                ce("a", {className: "brand-logo", href: "#", style: {paddingLeft: "15px"}, onClick: e => this.switchPage("main", e)}, "Bullet Journal"),
                                ce("ul", {className: "right hide-on-med-and-down", id: "nav-mobile"},
                                    ce("li", {key: "navMain"},
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
                            ce("h2", null, "calendar page placeholder")
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
