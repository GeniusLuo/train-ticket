import React, {Component, lazy, Suspense} from 'react';
import './App.css';

// 直接打包到main.chunk.js 也就是说打包到主包中
// import About from "./About";

// 懒加载 /*webpackChunkName:"about"*/ 是对懒加载的包的重命名
const About = lazy(() => import(/*webpackChunkName:"about"*/'./About.jsx'));

// ErrorBoundary
// componentDidCatch

class App extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>hasError</div>
    }
    return (
      <div>
        <Suspense fallback={<div>loading</div>}>
          <About/>
        </Suspense>
      </div>
    )
  }
}

export default App;
