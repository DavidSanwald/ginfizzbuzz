import React, { Component } from 'react';
import GinFizzBuzzer from 'ginfizzbuzzer'
import './App.css';
import { Transition, animated } from 'react-spring'

const fns = {
  Fizz: style => <animated.div key={'Fizz'} className="Word" style={{ ...style, background: '#5DA2D5' }} >Fizz</animated.div>,
  FizzBuzz: style => <animated.div key={'FizzBuzz'} className="Word" style={{ ...style, background: '#F78888' }} ><p>Fizz</p><p>Buzz</p></animated.div >,
  Buzz: style => <animated.div key={'Buzz'} className="Word" style={{ ...style, background: '#F3D250' }} >Buzz</animated.div>
}


const page = element => fns[element] || (style => <animated.div key={element} className="Word" style={{ ...style, background: '#ECECEC' }} >{element.toString()}</animated.div>)

class App extends Component {
  onAppClick = (e) => console.log('Still Working')

  render () {
    return (
      <div className="App">
        <GinFizzBuzzer >
          {({ count, getToggleProps, reset, Fizz, Buzz, toggle, isRunning, FizzBuzz }) => {
            const element = Fizz || Buzz || FizzBuzz || count
            const el = page(element)
            return (
              <div {...getToggleProps({ onClick: this.onAppClick })} style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {isRunning ? <Transition
                  native
                  from={{ opacity: 0, transform: 'translate3d(100%,0,0)' }}
                  enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
                  leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}>
                  {el}
                </Transition> :
                  <Transition from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
                    {style => < animated.div key={'Buzz'} className="Word" style={{ ...style, color: 'black', background: '#F78888' }} >Stop</animated.div>}
                  </Transition>}
              </div>
            )
          }
          }
        </GinFizzBuzzer>
      </div >
    );
  }
}

export default App;
