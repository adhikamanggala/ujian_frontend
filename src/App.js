import React, { Component } from 'react';
import './support/css/style.css'
import './support/css/styleTemplate.css'
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import HeaderReact from './components/headerReact';
// import ContentReact from './components/contentReact';
// import CarouselReact from './components/CarouselReact'
// import InputReact from './components/InputReact';
import RegisterReact from './components/RegisterReact';
import LoginReact from './components/LoginReact'
import HomeReact from './components/HomeReact'
import ProductList from './components/ProductList'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions'
import { withRouter } from 'react-router-dom'
import ManageProduct from './components/ManageProduct';
import ProductDetail from './components/ProductDetail';
import CartReact from './components/CartReact';
// import HistoryReact from './components/HistoryReact'

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    const username = cookies.get('dataUser');
    if(username !== undefined) {
        this.props.keepLogin(username);
    }
    else {
      this.props.cookieChecked();
    }
}

  
  
  onBtnOKClick = () => {
    this.setState({ content: 'Ini  On CLick'})
  }

  onBtnLoginClick = () => {
      var username = this.refs.username.refs.tbUsername.value;
      this.setState({ username })
  }

  render() {
    if (this.props.cookie) {
    return (
     
      <div>
        <HeaderReact headerText="Refer" navBrand={"Refer"} />

         {/* <Route exact path="/" component={CarouselReact}/> */}
       
       

        {/* <ContentReact>
          <h1>Find a better place to go!</h1>
          <p>Thank God there are a lot of hidden Gems in town</p>
          {this.props.headerText}
          {this.props.children}
        </ContentReact> */}

          <Route exact path="/" component={HomeReact}/>
          <Route path="/login" component={LoginReact}/>
          <Route path="/register" component={RegisterReact}/>
          <Route path="/productlist" component={ProductList}/>
          <Route path="/manageproduct" component={ManageProduct}/>
          <Route path="/productdetail" component={ProductDetail}/>
          <Route path="/cart" component={CartReact}/>
          {/* <Route path="/history" component={HistoryReact}/> */}


        {/* <Button color="primary" onClick={this.onBtnOKClick}>Add</Button> */}
      
      </div>
      );
    }
    return (<div>
              <center><h1>Loading...</h1></center>
          </div>);
  }
}



const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie }
}

export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked})(App));
