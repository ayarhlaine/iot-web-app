import React, { useState, useEffect } from 'react';
import { Room, whenRooms, closeRooms } from './sensor/SensorService';
import './App.css';

function App() {
  const initialState:Room[] =[];
  const [rooms, setRooms] = useState(initialState);
  useEffect(() => {
    whenRooms().subscribe((rooms: Room[]) => setRooms(rooms));
    return () => {
      closeRooms()
    };
  }, []);
  return (
    <div className="app">
      {
        rooms.map((room) => (
          <div>
            <p>
              Light : {room.light ? 'ON' : 'OFF'}
            </p>
            <p>
              AirTemperature : {room.airTemperature}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default App;
