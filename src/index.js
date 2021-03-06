import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      next: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (winner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.next ? 'X' : 'O';
    this.setState({
      squares: squares,
      next: !this.state.next,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;
    let y = draw(this.state.squares)
    let w = winner(this.state.squares);
    if (w) {
      status = 'WINNER is: ' + w;
    } else {
    	if(y){
    		status = "It's a DRAW!"
    	}
      	else status = 'Next player: ' + (this.state.next ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function winner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function draw(squares){
  var i;
  for(i = 0; i < 9; i++){
    if(!squares[i])
        break;
  }
  if(i == 9)
      return true;
  else return false;
}
