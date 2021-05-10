// import M from "../../materialize/js";
import { TaskList } from './taskList.js';
console.log("Running version 4.");

const validateRoute = document.getElementById("validateRoute").value;
const createRoute = document.getElementById("createRoute").value;
const csrfToken = document.getElementById("csrfToken").value;

const ce = React.createElement

class checkLogIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loggedIn: false };
    }
  
    render() {
      if (this.state.loggedIn) {
        //return ce('h2', null, 'This is where the home page would go')
        return ce(TaskList);
      } else {
        return ce(LoginComponent, { doLogin: () => this.setState( { loggedIn: true }) });
      }
    }
  }
  

class LoginComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loginName: "", 
        loginPass: "", 
        createName: "", 
        createUserName: "", 
        createPass: "",
        createEmail: "",
        loginMessage: "",
        createMessage: ""
      };
    }

    componentDidMount() {
      M.AutoInit();
    }
  
    render() { return(
      ce("div", {className: "container"},
          ce("div", {className: "row"},
            ce("form", {className: "col s12 m6 offset-m3"},
              ce("h3", {className: "center-align"}, "Bullet Journal"),
              ce("ul", {className: "collapsible"},
                ce("li", {className: "active", key: "loginListItem"},
                  ce("div", {className: "collapsible-header active"}, "Log In"),
                  ce("div", {className: "collapsible-body"},
                    ce("div", {className: "row valign-wrapper"},
                      ce("div", {className: "input-field col s4", id: "loginNameDiv"},
                        ce("label", {htmlFor: "loginName"}, "Username"),
                        ce("input", {type: "text", id: "loginName", value: this.state.loginName, onChange: e => this.changerHandler(e)}),
                      ),
                      ce("div", {className: "input-field col s4", id: "loginPassDiv"},
                        ce("label", {htmlFor: "loginPass"}, "Password"),
                        ce("input", {type: "password", id: "loginPass", onChange: e => this.changerHandler(e)}),
                      ),
                      ce("div", {className: "col s1"}),
                      ce("div", {className: "col s3"},
                        ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.login(e)}, "Log in"),
                        ce("span", {id: "login-message"}, this.state.loginMessage),
                      ),
                    ),
                  ),
                ),
                ce("li", {key: "signupListItem"},
                  ce("div", {className: "collapsible-header"}, "Sign Up"),
                  ce("div", {className: "collapsible-body"},
                    ce("div", {className: "row"},
                      ce("div", {className: "input-field col s12", id: "createNameDiv"},
                        ce("label", {htmlFor: "createName"}, "Name"),
                        ce("input", {type: "text", id: "createName", value: this.state.createName, onChange: e => this.changerHandler(e)}),
                      ),
                    ),
                    ce("div", {className: "row"},
                      ce("div", {className: "input-field col s12", id: "createEmailDiv"},
                        ce("label", {htmlFor: "createEmail"}, "Email"),
                        ce('input', {type: "email", id: "createEmail", value: this.state.createEmail, onChange: e => this.changerHandler(e)}),
                      )
                    ),
                    ce("div", {className: "row"},
                      ce("div", {className: "input-field inline col s6", id: "createUserNameDiv"},
                        ce("label", {htmlFor: "createUserName"}, "Username"),
                        ce("input", {type: "text", id: "createUserName", value: this.state.createUserName, onChange: e => this.changerHandler(e)}),
                      ),
                      ce("div", {className: "input-field inline col s6", id: "createPassDiv"},
                        ce("label", {htmlFor: "createPass"}, "Password"),
                        ce("input", {type: "password", id: "createPass", value: this.state.createPass, onChange: e => this.changerHandler(e)}),
                      ),
                    ),
                    ce("a", {className: "waves-effect waves-light btn pink lighten-1", onClick: e => this.createUser(e)}, "Create Account"),
                    ce('span', {id: "create-message"}, this.state.createMessage),
                  ),
                ),
              ),
            ),
          ),
        )
      );}
  
    changerHandler(e) {
      console.log("changeHandler called on: " + e);
      this.setState({ [e.target['id']]: e.target.value });
    }
  
    login(e) {
      const username = this.state.loginName;
      const password = this.state.loginPass;
      fetch(validateRoute, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        body: JSON.stringify({ username, password })
      }).then(res => res.json()).then(data => {
        if(data) {
          this.props.doLogin();
        } else {
          this.setState({ loginMessage: "Login Failed" });
        }
      });
    }

    createUser(e) {
      const fullname = this.state.createName;
      const username = this.state.createUserName;
      const password = this.state.createPass;
      const email = this.state.createEmail;
        fetch(createRoute, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
          body: JSON.stringify({ fullname, username, password, email })
        }).then(res => res.json()).then(data => {
          if(data) {
            this.props.doLogin();
          } else {
             this.setState({ createMessage: "User Creation Failed" });
          }
        });
    }
  }


ReactDOM.render(
        ce(checkLogIn, null, null),
        document.getElementById('reactRoot')
      );