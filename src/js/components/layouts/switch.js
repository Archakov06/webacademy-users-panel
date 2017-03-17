import React from 'react';

export default class Switch extends React.Component {

  static defaultProps = {
    checked: false,
    onClick: () => {},
    disabled: false,
    className: '',
    size: 'normal'
  }

  constructor(props) {
    super(props);
    this.state = {checked: this.props.checked};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({checked: nextProps.checked});
  }

  handleClick = (e) => {
    e.preventDefault();
    if(!this.props.disabled) {
      console.log(this.state);
      this.props.onClick();
      this.setState({checked: !this.state.checked});
    }
  };

  render() {
    const className = [
      'rswitch',
      this.props.className,
      'rswitch--' + this.props.size,
      this.state.checked ? 'rswitch--checked' : '',
      !this.props.disabled ? '' : 'disabled'
    ].join(' ').replace(/\s{2,}/g,' ').trim();
    return (
      <div className={className} onClick={this.handleClick}>
        <div className="rswitch-toggle" children={this.props.children}></div>
      </div>
    );
  }

  static propTypes = {
    checked: React.PropTypes.bool,
    size: React.PropTypes.string,
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string
  }

}
