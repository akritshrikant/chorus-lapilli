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
      xIsNext: true,
      count: 1,
    };
  }

  adjacent(i){
    let arr;
    switch(i){
      case 0:
        arr = [4, 1, 3];
        break;
      case 1:
        arr = [4, 0, 2, 3, 5];
        break;
      case 2:
        arr = [4, 1, 5];
        break;
      case 3:
        arr = [4, 0, 1, 6, 7];
        break;
      case 4:
        arr = [0, 1, 2, 3, 5, 6, 7, 8];
        break;
      case 5:
        arr = [4, 1, 2, 7, 8];
        break;
      case 6:
        arr = [4, 3, 7];
        break;
      case 7:
        arr = [4, 3, 5, 6, 8];
        break;
      case 8:
        arr = [4, 5, 7];
        break;
    }
    for (let x = 0; x < arr.length; x++)
    {
      if (this.state.squares[arr[x]] == (this.state.xIsNext ? 'X' : 'O')){
        return arr[x];
      }
    }
    return -1;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    if (this.state.count > 6) {
      let pos = this.adjacent(i);
      if (pos == -1){
        return;
      }
      if ((pos != 4) && squares[4] == (this.state.xIsNext ? 'X' : 'O'))
      {
        let squares2 = squares;
        squares2[pos] = null;
        squares2[i] = this.state.xIsNext ? 'X' : 'O';
        if (calculateWinner(squares2) != this.state.xIsNext ? 'X' : 'O' && squares2[4] == this.state.xIsNext ? 'X' : 'O'){
          return;
        }
      }
      squares[pos] = null;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    this.state.count++;
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
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
