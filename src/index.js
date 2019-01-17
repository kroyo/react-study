import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game.js';
import Clock from './components/timer.js';


class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
        <Clock />
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);


