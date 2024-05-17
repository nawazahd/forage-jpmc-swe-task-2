import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean, // Add showGraph property
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, // Initialize showGraph as false
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.getDataFromServer();
    }, 100);
  }

  getDataFromServer() {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      this.setState({ data: serverResponds });
    });
  }

  // Toggle showGraph when the button is clicked
  toggleGraphVisibility = () => {
    this.setState((prevState) => ({
      showGraph: !prevState.showGraph,
    }));
  };

  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
    return null; // Don't render graph if showGraph is false
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={this.toggleGraphVisibility}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
