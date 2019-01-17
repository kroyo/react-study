/**
 * @description 井字棋游戏组件
 * 
 */
import React from 'react';
import Board from './board.js';
import '../index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastStep: 'Game start'
      }], //历史记录
      stepNumber: 0, // 步数
      xIsNext: true, // 下一步谁下棋子 true: X , false: O
      sort: false
    }
  }

  // 下棋子的点击事件
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares).winner || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const location = '('+ (Math.floor(i / 3) + 1) +','+ ((i % 3) + 1) +')';
    const desc = squares[i] + ' moved to ' + location;
    this.setState({
      history: history.concat([{
        squares: squares,
        lastStep: desc
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  toggleSort() {
    this.setState({
      sort: !this.state.sort
    })
  }

  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const win = calculateWinner(current.squares);

    let status;
    if(win.winner){
      status = 'Winner: ' + win.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    if(this.state.sort) {
      history = this.state.history.slice();
      history.reverse();
    }

    const moves = history.map((step, move) => {
      if(move === this.state.stepNumber) {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}><strong>{step.lastStep}</strong></a>
          </li>
        );
      }
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{step.lastStep}</a>
        </li>
      );
    });

    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this.handleClick(i)}
            winnerLine={win.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleSort()}>Sort</button>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}


function calculateWinner(squares) {
  // 三个位置棋子相同 则判胜负
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];  // 变量赋值 a = lines[i][0]  b = lines[i][1]  c = lines[i][2]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

export default Game;