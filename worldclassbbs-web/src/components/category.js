import React from 'react';

export default class CategoryDropDown extends React.Component {
    constructor(){
        super();
        this.state = {
            categoryPopup: '',
        }
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }
    render() {
        return(
            <span onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} className="categories"> | Categories {this.state.categoryPopup}</span>
            );
    };
    onMouseEnterHandler(){
        this.setState({
            categoryPopup: <Categories categories={this.props.categories} />
        })

    };
    onMouseLeaveHandler(){
        this.setState({
            categoryPopup: '',
        })
    }
}

class Categories extends React.Component {
    constructor(){
        super();
        this.state = {
            categories: []
        };
    };
    render() {
        return(
            <ul className="CategoryList">
                {this.state.categories}
            </ul>
        )
    };
    componentDidMount(){
        let rows = [];
        this.props.categories.forEach(element => {
            rows.push(<li>{element.name}</li>);
        });
        this.setState({categories: rows});
    };
}