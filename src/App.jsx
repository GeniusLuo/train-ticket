import React, {Component, createContext} from 'react';
import './App.css';

// 创建Context实例
const BatteryContext = createContext(90);
const OnlineContext = createContext(false);

// 最底层组件
// class Leaf extends Component {
//   render() {
//     return (
//       // Context消费者
//       <BatteryContext.Consumer>
//         {
//           battery => (
//             <OnlineContext.Consumer>
//               {
//                 online => <h1>Battery: {battery}, Online: {String(online)}</h1>
//               }
//             </OnlineContext.Consumer>
//           )
//         }
//       </BatteryContext.Consumer>
//     )
//   }
// }

// 最底层组件
class Leaf extends Component {
  // 定义contextType可以直接访问this.context而不使用Consumer
  static contextType = BatteryContext;

  render() {
    const battery = this.context;

    return (
      // Context消费者
      <h1>Battery: {battery}</h1>
    )
  }
}

// 中间组件
class Middle extends Component {
  render() {
    return <Leaf/>
  }
}

// 最上层组件
class App extends Component {
  state = {
    online: false,
    battery: 60
  };

  render() {
    const {battery, online} = this.state;

    return (
      // Context提供者
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({battery: battery - 1})}>Press
          </button>
          <button
            type="button"
            onClick={() => this.setState({online: !online})}>Switch
          </button>
          <Middle/>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}

export default App;
