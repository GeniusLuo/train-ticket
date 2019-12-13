import React, {PureComponent ,useState , useRef} from 'react';


class Counter extends PureComponent{
  state = {
    name: 'GeniusLuo'
  };

  speak() {
    console.log('speak');
    console.log(this.state.name)
  }

  render() {
    const {props} = this;
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    );
  }
}

// App 主组件
function App() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    // 可以共享组件counter上的属性和方法
    counterRef.current.speak()
  };

  const counterRef = useRef();

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setCount(count + 1)
        }}>
        Click ({count})
      </button>
      <Counter ref={counterRef} onClick={onClick} count={count}/>
    </div>
  )
}

export default App;

