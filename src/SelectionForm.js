// import React, { Component } from 'react';
// import App from './App'
// import './App.css';



// class SelectionForm extends React.Component {
//     constructor() {
//       super();
//       this.state = {SelectedValue: 'preferredStyle'};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({SelectedValue: event.target.value});
//     }
  
//     handleSubmit(event) {
//       // alert('Your favorite flavor is: ' + this.state.value);
//       event.preventDefault();
    
//     }
  
//     render() {
//       return (
     
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Pick your favorite flavor:
//             <select value={this.state.value} onChange={this.handleChange}>
//               <option value="age">Age</option>
//               <option value="preferredStyle">Preferred Style</option>
//               <option value="gender">Gender</option>
//               <App SelectedValue={this.state.SelectedValue}></App>
//             </select>
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
         
//       );
//     }
//   }
  
// //   ReactDOM.render(
// //     <SelectionForm />,
// //     document.getElementById('root')
// //   );


//   export default SelectionForm;