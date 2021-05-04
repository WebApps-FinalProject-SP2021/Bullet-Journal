class Hello extends React.Component{
    render(){
        return React.CreateElement('div', null, `Hello ${this.props.toWhat}`);
    }

    
}
ReactDOM.render(
        React.createElement(Hello, {toWhat: 'this is React'}, null),
        document.getElementById('reactRoot')
      );