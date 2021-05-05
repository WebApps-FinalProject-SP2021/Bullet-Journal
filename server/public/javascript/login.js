// import './stylesheets/theme.css';
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
        return ce('h2', null, 'This is where the home page would go')
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
  
    render() {
      ce("div",
        {
          class: "row"
        },
        ce(
          "form",
          {
            class: "col s12"
          },
          ce(
            "div",
            {
              class: "row"
            },
            ce(
              "div",
              {
                class: "input-field col s6"
              },
              ce("input", {
                id: "first_name",
                type: "text",
                class: "validate"
              }),
              ce(
                "label",
                {
                  for: "first_name"
                },
                "First Name"
              )
            ),
            ce(
              "div",
              {
                class: "input-field col s6"
              },
              ce("input", {
                id: "last_name",
                type: "text",
                class: "validate"
              }),
              ce(
                "label",
                {
                  for: "last_name"
                },
                "Last Name"
              )
            )
          ),
          ce(
            "div",
            {
              class: "row"
            },
            ce(
              "div",
              {
                class: "input-field col s12"
              },
              ce("input", {
                disabled: true,
                value: "I am not editable",
                id: "disabled",
                type: "text",
                class: "validate"
              }),
              ce(
                "label",
                {
                  for: "disabled"
                },
                "Disabled"
              )
            )
          ),
          ce(
            "div",
            {
              class: "row"
            },
            ce(
              "div",
              {
                class: "input-field col s12"
              },
              ce(
                "input",
                {
                  id: "password",
                  type: "password",
                  class: "validate"
                },
                ce(
                  "label",
                  {
                    for: "password"
                  },
                  "Password"
                )
              )
            )
          ),
          ce(
            "div",
            {
              class: "row"
            },
            ce("div", {class: "input-field col s12"},
              ce('input', {type: "email", id: "createEmail", value: this.state.createEmail, onChange: e => this.changerHandler(e)}),
              ce("label", {for: "email"}, "Email")
            )
          )
        )
      )
      return ce('div', null,
        ce('h2', null, 'Login:'),
        ce('br'),
        'Username: ',
        ce('input', {type: "text", id: "loginName", value: this.state.loginName, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('br'),
        'Password: ',
        ce('input', {type: "password", id: "loginPass", value: this.state.loginPass, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('br'),
        ce('button', {onClick: e => this.login(e)}, 'Login'),
        ce('span', {id: "login-message"}, this.state.loginMessage),
        ce('h2', null, 'Create User:'),
        ce('br'),
        ce('br'),
        'Name: ',
        ce('input', {type: "text", id: "createName", value: this.state.createName, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('br'),
        'User Name: ',
        ce('input', {type: "text", id: "createUserName", value: this.state.createUserName, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('br'),
        'Password: ',
        ce('input', {type: "password", id: "createPass", value: this.state.createPass, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('br'),
        'Email: ',
        ce('input', {type: "email", id: "createEmail", value: this.state.createEmail, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('br'),
        
        ce('button', {onClick: e => this.createUser(e)}, 'Create User'),
        ce('span', {id: "create-message"}, this.state.createMessage)
      );
    }
  
    changerHandler(e) {
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

    createUser(e)
    {
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
              this.setState({ loginMessage: "Login Failed" });
            }
          });
    }
    

    
  }


ReactDOM.render(
        ce(checkLogIn, null, null),
        document.getElementById('reactRoot')
      );