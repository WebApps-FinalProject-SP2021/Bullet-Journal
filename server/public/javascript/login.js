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
        ce('h2', null, 'This is where the home page would go')
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
        const name = this.state.createName;
        const username = this.state.createUserName;
        const password = this.state.createPass;
        const email = this.state.createEmail;
        fetch(createRoute, {  // change route 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
            body: JSON.stringify({ name, username, password, email })
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