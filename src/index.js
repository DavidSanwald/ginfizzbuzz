
import React from 'react';


const defaultProps = {
  interval: 1000,
  start: 0,
  initialRunning: true,
  onReset: () => { }
}

const isFizz = n => n % 3 === 0
const isBuzz = n => n % 5 === 0
const both = (fn1, fn2) => n => fn1(n) && fn2(n)
const isFizzBuzz = both(isFizz, isBuzz)

const inc = x => x + 1
const incCount = previousState => ({
  ...previousState, count: inc(previousState.count)
})

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

class FizzBuzzer extends React.Component {

  initialState = { count: 0, isRunning: this.props.initialRunning }



  state = { ...this.initialState }

  _clearIntervalID = () => {
    if (this.state.intervalID) {
      this.intervalID = clearInterval(this.state.intervalID)
    }
  }

  _setIntervalID = () => {
    if (!this.intervalID) {
      this.intervalID = setInterval(
        () => this.tick(),
        this.props.interval
      )
    }
  }

  componentDidMount () {
    this.state.isRunning ? this._setIntervalID() : this._clearIntervalID()
  }

  componentDidUpdate (prevProps, prevState) {
    !prevState.isRunning ? this._setIntervalID() : this._clearIntervalID()
  }

  componentWillUnmount () {
    this._clearIntervalID()
  }

  toggle = () => {
    this.setState(({ isRunning }) => ({ isRunning: !isRunning }))
  }

  start = () => {
    this.setState({ isRunning: true })
  }

  reset = () => {
    this.setState(this.initialState)
  }

  stop = () => {
    this.setState({ isRunning: false })
  }

  getToggleProps = ({ onClick, ...props } = {}) => ({ onClick: callAll(onClick, this.toggle), ...props })

  getStateAndHelpers () {
    return {
      Fizz: isFizz(this.state.count) && !isFizzBuzz(this.state.count) ? 'Fizz' : false,
      Buzz: isBuzz(this.state.count) && !isFizzBuzz(this.state.count) ? 'Buzz' : false,
      FizzBuzz: isFizzBuzz(this.state.count) ? 'FizzBuzz' : false,
      count: this.state.count,
      isRunning: this.state.isRunning,
      toggle: this.toggle,
      reset: this.reset,
      getToggleProps: this.getToggleProps
    }
  }

  tick () {
    this.setState(
      incCount
    );
  }

  render () {
    return this.props.children(this.getStateAndHelpers());
  }
}

FizzBuzzer.defaultProps = defaultProps

export default FizzBuzzer