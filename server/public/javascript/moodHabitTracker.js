import { MyChart } from './myChart.js';


// const getAllDaysRoute = document.getElementById('getAllDays').value;
// const getHabitsRoute = document.getElementById('getHabits').value;
// const addHabitRoute = document.getElementById('addHabit').value;
// const removeHabitRoute = document.getElementById('removeHabit').value;
// const csrfToken = document.getElementById("csrfToken").value;

const ce = React.createElement



export class MoodHabitPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        habits: [],
        isAdding: false, 
        isEditing:false, 
        completed: false,
        addedRating: false, 
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
                ce("h3", {className: "center-align"}, "Moods and Habits")
            ),

            ce("div", {className: "row"},
                ce("div", {className: "col s6"},
                    ce("div", {className: "card"},
                        ce("div", {className: "card-content"},
                            ce('span', {className: "card-title"}, "Moods"),
                            ce(Mood,{moodCallback: (currentRating) =>{
                                let copy = Object.assign ({}, this.state.moodRatings);
                                copy[getCurrentDate()] = currentRating; 
                                this.setState({moodRatings:copy});
                            }, moodRatings:this.state.moodRatings })
                            // ce(Mood,{moodCallback: (name, currentRating) =>{
                            //     let deepCopy = new Map();
                            //     for (let [key, value] of this.state.moodRatings)
                            //     {
                            //         deepCopy.set(key,(() => { 
                            //         let copy = Object.assign ({}, value); 
                            //         return copy;
                            //     })())
                            //     }
                            //     deepCopy.set(name, (() => { 
                            //         let toChange = deepCopy.get(name) || {};
                            //         toChange[getCurrentDate()] = currentRating;
                            //     })()); 
                            //     this.setState({moodRatings:deepCopy})
                            // }})
                            // this.state.moods.map(mood => ce(Mood), key:)
                        )
                    )
                ),
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
            ce("div", {className: "row"},
                ce("div", {className: "col s12"},
                    ce("div", {className: "card"},
                        ce("div", {className: "card-content"},
                            ce('span', {className: "card-title"}, "Habits to work on"), 
                            ce(Habit),
                            ce("div", {className: "row"},
                                ce("div", {className: "divider"}),
                                ce("div",{className: "input-field col s3"},
                                    ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.addHabit(e)}, "Add"),
                                ),
                            ),
                        )
                    )
                ),
            )
        )
    );}
    
    // case class Day(dayid: Int, date: LocalDate, mood: Option[Int])
    loadMoods() {
        fetch(getAllDaysRoute).then(res => res.json()).then( dayRef => {console.log(dayRef); /*if(this._isMounted) this.setState({ tasks: tasksRet })*/});
    }

}



class Mood extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        moodName: "Temp Mood", 
        // moodRatings: {},
        moodId: 0, 
        currentSelected: -1, 

      };
    }

    componentDidMount() {
      M.AutoInit();
    }
    onSubmit(e)
    {

    }
    render() {
    return(
        ce("div", {className: "container"},
            ce("div", {className: "row"},
                ce("div", {className: "center-align"}, this.state.moodName),
                ce("form", {},
                    ce("div", null),
                    ce("label", null,
                        ce("input", {name: "group1",  type: "radio", checked: this.state.currentSelected==0, onChange: e => this.setState({currentSelected:0})}),
                        ce("span", null, "Great"),
                    ),
                    
                    ce("div", null),
                    ce("label", null,
                        ce("input", {name: "group1",  type: "radio", checked: this.state.currentSelected==1, onChange: e => this.setState({currentSelected:1})}),
                        ce("span", null, "Neutral"),
                    ),
                   
                    ce("div", null),
                    ce("label", null,
                        ce("input", {name: "group1", type: "radio", checked: this.state.currentSelected==2, onChange: e => this.setState({currentSelected:2})}),
                        ce("span", null, "Bad"),
                    ),
                    ce("div", null),
                    this.props.moodRatings[getCurrentDate()] == undefined ? (ce("a", {className: "waves-effect waves-light btn pink lighten-1",  onClick: e => {
                        // this.setState();
                        // this.setState({moodRatings: this.state.moodRatings.concat(this.state.currentSelected)});
                        if (this.state.currentSelected != -1 ) this.props.moodCallback(this.state.currentSelected);
                        
                        this.setState({currentSelected: -1});
                        }}, "Submit")) :  ce("div",{className: "btn-flat disabled"}, "Submit")

                )
            )
        )
    );}
    // changerHandler(e) {
    //     console.log("changeHandler called on: " + e);
    //     this.setState({ [e.target['id']]: e.target.value });
    // }
    
}
class Habit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        habitName: "", 
        habitDescription: "", 
        
      };
    }

    componentDidMount() {
      M.AutoInit();
    }

    render() {return(
        ce("div", {className: "container"},
        ce("div",{className: "row"},
            ce("form",{className: "col s12"},
                ce("div",{className: "row"},
                    ce("div",{className: "input-field col s12"},
                        ce('label', {htmlFor:"habitName"}, "Habit Name" ),
                            ce('input', {type: "text", id: "habitName", onChange: (e) => this.handleChange(e),  className: "validate"})
                    ), 
                ),
                ce("div",{className: "row"},
                    ce("div",{className: "input-field col s12"},
                        ce('label', {htmlFor:"habitDescription"}, "Habit Description" ),
                        ce('input', {type: "text", id: "habitDescription", onChange: (e) => this.handleChange(e),  className: "validate"}),
                    ),

                ),
                
                ce("div",{className: "input-field col s3"},
                    ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.editHabit(e)}, "Edit"),
                ),
                // ce("div",{className: "input-field col s3"},
                //     ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.saveHabit(e)}, "Save"),
                // ),
                ce("div",{className: "input-field col s3"},
                    ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.props.deleteHabit(e)}, "Delete"),
                ),
                    //ce('span', {id: "add-task"}, this.state.createMessage)
               
            )
        )
    )
    );}

    changerHandler(e) {
        console.log("changeHandler called on: " + e);
        this.setState({ [e.target['id']]: e.target.value });
      }
}

function getCurrentDate()
{
    let today = new Date();
    let  dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return ( mm + '/' + dd + '/' + yyyy);
}