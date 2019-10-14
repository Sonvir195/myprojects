import React, { Component } from 'react';

class Main extends Component {

  render() {
  	return (
    	<div id="content">
        	<h3> Search Party </h3>
        		<div className="form-group mr-sm-2">
            		<input
             			id="partyName"
              			type="text" 
              			ref= {(input) => {this.partyName=input}}             				
              			className="form-control"
              			placeholder="Party Name"
              			required />
          		</div>              
                <button
                  name ={this.partyName}                                
                  onClick = {(event) => {
                    this.props.searchDpl(event.target.name)
                  }}
                >
                  Search
                </button>     		
        	
        		<p>&nbsp;</p>
        		<h2>DPL List</h2>
        		<table className="table">
          			<thead>
            			<tr>
              				<th scope="col">#</th>
              				<th scope="col">Name</th>
              				<th scope="col">Address</th>
              				<th scope="col">Country</th>
              				<th scope="col">Street</th>
                      <th scope="col">City</th>

            			</tr>
          			</thead>
                <tbody id="dplList">
                  {this.props.dpls.map((dpl, key) => {
                    return (
                      <tr key ={key}>
                          <th scope="row">{dpl.id.toString()}</th>
                          <td>{dpl.name}</td>
                          <td>{dpl.country}</td>
                          <td>{dpl.addr}</td>
                          <td>{dpl.street}</td>
                          <td>{dpl.city}</td>                          
                      </tr>   

                    )
                  })}
                            
                </tbody>          			
        		</table>
        </div>            
    );
  }
}
export default Main;

