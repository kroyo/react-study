/**
 * @description 九宫格格子组件 
 * 
 */
import React from 'react';

function Square(props) {
  if(props.highlight){
    return (
      <button className="square" onClick={props.onClick} style={{color: "red"}}>
        {props.value}
      </button>
    )
  }else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={this.props.winnerLine.includes(i)}
       />
    )
  }

  render() {
    let rows = [];
    let row;
    for(let i = 0; i < 3; i++) {
      row = [];
      for(let j = 3*i; j < 3*(i+1); j++) {
        row.push(this.renderSquare(j));
      }
      rows.push(<div className="board-row" key={i}>{row}</div>)
    }
    return (
      <div>
        {rows}
      </div>
    )
  }
}

export default Board;