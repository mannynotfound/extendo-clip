import React, {PropTypes, Component} from 'react'
import style from './Command.css';

export default class Header extends Component {

  static propTypes = {
    fn: PropTypes.func.isRequired,
    text: PropTypes.string,
  }

  handleClick() {
    this.props.fn()
  }

  render() {
    return (
      <div
        className={style.Command}
        onClick={this.handleClick.bind(this)}>
        {this.props.text}
      </div>
    )
  }
}
