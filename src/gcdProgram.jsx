import React from 'react';
import ReactDom from 'react-dom';

import {PolynomialComponent} from "./polynomialComponent.jsx"
import {GCDComponent} from "./gcdComponent.jsx"
import {FieldSelector} from "./fieldSelector.jsx"

// Web Form API
class GCDPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polynomials: [[-2,-1],[-1, 1, 1]],
      showGCD: false,
      field: "q",
    }
  }
  add(index) {
    let polynomials = this.state.polynomials
    polynomials[index].push(0)
    this.setState({polynomials, showGCD: false})
  }
  handle(pi, e, i) {
    let polynomials = this.state.polynomials
    polynomials[pi][i] = e.target.value
    this.setState({polynomials, showGCD: false})
  }
  
  updateUnits(e) {
	const modulo = Number(event.target.value)
	this.setState({field: modulo || "q", showGCD: false})
  }
  
  render() {
    
    return <div>{this.state.polynomials.map((poly, i) =>
        <PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/>
      )}
      <br></br>
      <FieldSelector handleChange={this.updateUnits.bind(this)}/>
      <br></br><button onClick={_ => this.setState({polynomials: [[0],[0]], showGCD: false})}>Reset</button>
      <br></br><button onClick={_ => this.setState({showGCD: true})}>Calculate GCD</button>
      
      {this.state.showGCD ? <GCDComponent polynomials={this.state.polynomials} shouldCalculate={this.state.showGCD} field={this.state.field}/> : ""}
      </div>
  }
}

ReactDom.render(<GCDPage/>, document.getElementById("main"))