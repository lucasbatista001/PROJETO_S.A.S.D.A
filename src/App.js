import './App.css';
import MqttClient from './MqttClient';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>MQTT com React</h1>
      <MqttClient />
      </header>
    </div>
  );
}

export default App;
