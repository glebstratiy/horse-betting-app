import React, { useState } from "react";
import { socket } from "../App";
import { winner } from "../App";
import { horses } from "../store";


const maxStep = 5;
const maxDist = 100;
let horseBet = '';
let timer;
let timer1;


const randomValue = () => {
  return Math.round(Math.random() * maxStep)
}

const winnerValue = () => {
  return Math.round(Math.random() * maxStep + 1)
}

const ticker = () => {
  horses.map(horse => {
    if (horse.name === winner) {
      const currentDist = horse.distance += winnerValue();
      horse.distance = maxDist < currentDist ? maxDist : currentDist
    }
    else {
      const currentDist = horse.distance += randomValue();
      horse.distance = maxDist < currentDist ? maxDist : currentDist
    }
  })
}

const clear = () => {
  horses.forEach((horse) => {
    horse.distance = 0
  })
}

const BettingSection = () => {
  let [balance, setBalance] = useState(100)
  let [running, setRunning] = useState(false)

  const betHandler = (horse, i) => {
    return () => {
      if (!running) {
        socket.emit('start')
        socket.emit('bet', horse[i].name)
        setRunning(true)
        horseBet = horse[i].name;
        clear()
        timer = setInterval(() => {
          ticker();
        }, 1000);
        timer1 = setInterval(() => {
          if (horse[i].name === winner && horse[i].distance === maxDist) {
            setBalance(balance += 60)
            clearInterval(timer1)
          }
        }, 1000);
        setBalance(balance -= 10)
      }
      else if (running) {
        socket.emit('start')
        socket.emit('bet', horse[i].name)
        horseBet = horse[i].name;
        clearInterval(timer)
        clear();
        timer = setInterval(() => {
          ticker();
        }, 1000);
        timer1 = setInterval(() => {
          if (horse[i].name === winner && horse[i].distance === maxDist) {
            setBalance(balance += 60)
            clearInterval(timer1)
          }
        }, 1000);
        setBalance(balance -= 10)
      }
    }
  }

  return (
    <div className="betting-section">
      <p>Betting Section</p>
      <div className="balance">
        <h1>Balance: {balance}</h1>
        <h2>You bet on: {horseBet}</h2>
      </div>
      <div className="horse-choice">
        <div className="first-horse">
          <button onClick={betHandler(horses, 0)} id='first-horse'>Princess Diana</button>
        </div>
        <div className="second-horse">
          <button onClick={betHandler(horses, 1)} id='second-horse'>Cricket</button>
        </div>
        <div className="third-horse">
          <button onClick={betHandler(horses, 2)} id='third-horse'>Rebel</button>
        </div>
        <div className="fourth-horse">
          <button onClick={betHandler(horses, 3)} id='fourth-horse'>Lucy</button>
        </div>
        <div className="fivth-horse">
          <button onClick={betHandler(horses, 4)} id='fivth-horse'>Lacey</button>
        </div>
        <div className="sixth-horse">
          <button onClick={betHandler(horses, 5)} id='sixth-horse'>Ginger</button>
        </div>
      </div>
      <div className="Start button">

      </div>
    </div>
  );
};

export default BettingSection;
