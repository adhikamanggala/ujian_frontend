import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios';

class HomeReact extends Component {
    state = { listProduct: [] }

    componentDidMount() {
        var kacrutPromise = axios.get('http://localhost:1971/popok')
        kacrutPromise.then((res) => {
            // console.log(res.data)
            this.setState({ listProduct: res.data })
        }).catch((err) => {
            console.log()
        })
    }
    renderListProduct = () => {
        var listJSXProduct = this.state.listProduct.map((item) => {
            return (
                <div>
                    <h3>{item.nama}</h3>
                    <p>{item.description}</p>
                </div>
            )
        })
        return listJSXProduct;
    }
    render () {
        console.log(this.state.listProduct)
        return (
            <div align="center">
                <h1>Find a better place to go!</h1>
                <p>Thank God there are a lot of hidden Gems in town</p>
                {/* {this.renderListPopok()} */}
                {/* <h2>{this.props.pikachu}</h2> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pikachu: state.pikachu
    };
}

export default connect(mapStateToProps)(HomeReact);