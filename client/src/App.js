import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import BettingSection from './components/BettingSection';
import { horses } from './store';
import Horse from './components/Horse';
export const socket = io.connect('http://localhost:3002')
export let winner = '';

socket.on('winner', function (response) {
  winner = response.name;
  console.log(`W: ${winner}`);
})





const App = () => {

  let [completed, setCompleted] = useState(0)
  let [completed1, setCompleted1] = useState(0)
  let [completed2, setCompleted2] = useState(0)
  let [completed3, setCompleted3] = useState(0)
  let [completed4, setCompleted4] = useState(0)
  let [completed5, setCompleted5] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCompleted(completed = horses[0].distance)
    }, 100);
  }, [])

  useEffect(() => {
    setInterval(() => {
      setCompleted1(completed1 = horses[1].distance)
    }, 100);
  }, [])

  useEffect(() => {
    setInterval(() => {
      setCompleted2(completed2 = horses[2].distance)
    }, 100);
  }, [])

  useEffect(() => {
    setInterval(() => {
      setCompleted3(completed3 = horses[3].distance)
    }, 100);
  }, [])

  useEffect(() => {
    setInterval(() => {
      setCompleted4(completed4 = horses[4].distance)
    }, 100);
  }, [])

  useEffect(() => {
    setInterval(() => {
      setCompleted5(completed5 = horses[5].distance)
    }, 100);
  }, [])



  return (
    <div className="App">
      <Horse bgcolor={"#fa93a8"} completed={completed} />
      <br></br>
      <Horse bgcolor={"#4287f5"} completed={completed1} />
      <br></br>
      <Horse bgcolor={"#7c89c4"} completed={completed2} />
      <br></br>
      <Horse bgcolor={"#f099cc"} completed={completed3} />
      <br></br>
      <Horse bgcolor={"#aefcb9"} completed={completed4} />
      <br></br>
      <Horse bgcolor={"#eb4034"} completed={completed5} />
      <br></br>
      <BettingSection />
    </div>
  )
}



export default App;

