import React, {useState, useMemo, memo, useCallback} from 'react';

const Counter = memo(function Counter(props) {
  console.log('Counter render');
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  )
});

// App 主组件
function App() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  // 写法一, 缺陷是每次点击button都会渲染自组件Counter
  /*const onClick = () => {
    console.log('Click');
  }*/

  // 优化一, 这样保证每次点击时不会渲染自组件Counter
  /*const onClick = useMemo(() => {
    return () => {
      console.log('Click')
    }
  }, []);*/

  // 优化二, 这样保证每次点击时不会渲染自组件Counter
  /*const onClick = useCallback(() => {
    console.log('Click');
    setClickCount(clickCount + 1);
  }, [clickCount]);*/

  // 优化三, 这样保证每次点击时不会渲染自组件Counter
  const onClick = useCallback(() => {
    console.log('Click');
    setClickCount((clickCount) => clickCount + 1);
  }, []);

  // useMemo(() => fn) 等价于 userCallback(fn)

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setCount(count + 1)
        }}>
        Click ({count}) double: ({double})
      </button>
      <Counter count={double} onClick={onClick}/>
    </div>
  )
}

export default App;

