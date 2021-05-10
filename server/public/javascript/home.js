const ce = React.createElement

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "main"
        }
    }

    render() {
        let currentPage = this.state.currentPage;
        let page;

        if(currentPage === "main") {
            // page = ce(MainPage);
            page = ce("p", null, "MainPage placeholder");
        } else if (this.state.currentPage === "calendar") {
            // page = ce(CalendarPage);
            page = ce("p", null, "CalendarPage placeholder");
        } else if (this.state.currentPage === "journal") {
            // page = ce(JournalPage);
            page = ce("p", null, "JournalPage placeholder");
        }

        return(
            ce("div", null,
                ce("nav", null,
                    ce("div", {className: "nav-wrapper cyan lighten-1"},
                        ce("a", {className: "brand-logo", href: "#", style: {paddingLeft: "15px"}, onClick: e => this.switchPage("main", e)}, "Bullet Journal"),
                        ce("ul", {className: "right hide-on-med-and-down", id: "nav-mobile"},
                            ce("li", {key: "navMain"},
                                ce("a", {href: "#", onClick: e => this.switchPage("main", e)}, "Main"),
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
                ce(Page, {currentPage: this.state.currentPage}),
            )
        )
    }

    switchPage(newPage, e) {
        e.preventDefault();
        this.setState({ currentPage: newPage })
    }
}
