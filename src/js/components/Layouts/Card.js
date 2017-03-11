import React, { Component } from 'react'

export default class Card extends Component {

    render() {
        return (
            <div className="card">
                <div className="header clearfix">
                    <h4 className="title">{this.props.title}</h4>
                    <p className="category">{this.props.category}</p>
                    { this.props.header }
                </div>
                <div className="content">
                    { this.props.children }
                    { this.props.footer }
                </div>
            </div>
        );
    }

}
