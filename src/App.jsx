import React, {Component, useState, useEffect} from 'react';
import './App.css';

class App2 extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  };

  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  };

  componentDidMount() {
    document.title = this.state.count;

    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.count;
  }

  render() {
    const {count, size} = this.state;
    return (
      <button type="button" onClick={() => {
        this.setState({count: count + 1})
      }}>click {count} size {size.width}x{size.height}</button>
    )
  }
}

function App(props) {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  };

  // count和size每次的改变都会触发这个事件
  useEffect(() => {
    document.title = count + '';
  });

  useEffect(() => {
    // componentDidMount和componentDidUpdate 触发
    window.addEventListener('resize', onResize, false);

    // componentWillUnMount触发
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
    // 第三参数决定是否更新
  }, []);

  return (
    <button type="button" onClick={() => {
      setCount(count + 1)
    }}>click {count} size {size.width}x{size.height}</button>
  )
}

export default App;

