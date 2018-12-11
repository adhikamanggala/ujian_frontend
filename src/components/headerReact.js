import React, { Component } from 'react'; 
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Cookies  from 'universal-cookie';
import { onLogOut, keepLogin } from "../actions";
import axios from 'axios'


const cookies = new Cookies();

class headerReact extends Component { 

    state = {jumlah :0}

    componentDidMount = () => {
    this.getApiCart()
    }

    getApiCart = () => {
    axios.get('http://localhost:1971/cart', {
        params : {
        username : this.props.username
        }
    }).then((res) => {
        console.log(res.data.length)
        this.setState({jumlah : res.data.length})
    })
    }
   

    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

   

    onClickLogOut = () => {
        this.props.onLogOut();
        cookies.remove('dataUser');
    }
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
    //class component
    // state = { bebas: 'Lepas', aku: 'Terbang'}

    // componentWillMount() {
    //     console.log('Ini Will Mount')
    // }

    // componentDidMount() {
    //     console.log('Ini Did Mount')
    //     this.setState({ bebas: 'Lepas', dimana:'Engkau'});
    // }

    // componentWillUpdate() {
    //     console.log('Ini Will Update')
    // }

    // componentDidUpdate() {
    //     console.log('Ini Did Update')
    // }

    render() {
        if(this.props.username === "") {
            
                return (
                    <div>
                    <Navbar color=" " light expand="md">
                    <NavbarBrand href="/" style={{ color:'#ff9100'}} id='logo'>{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/login"><NavLink>Product</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/about"><NavLink>About</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/contact"><NavLink>Contact</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/register"><NavLink>Register</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/login"><NavLink>Login</NavLink></Link>
                        </NavItem>
                        
                        
                        </Nav>
                    </Collapse>
                    </Navbar>
                    </div>
                ) 
                } else if (this.props.username === "admin"){
                    return (
                        <Navbar color="" light expand="md">
                        <NavbarBrand href="/" style={{ color:'#ff9100'}} id='logo'>{this.props.navBrand}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/productlist"><NavLink>Product</NavLink></Link>
                            </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                Hello, {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/manageproduct">Manage Product</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        Status
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onClickLogOut}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                         </UncontrolledDropdown>
                         </Nav>
                         </Collapse>
                         </Navbar>
                         
            
                    )
        }
        return (
            <Navbar color="" light expand="md">
                        <NavbarBrand href="/" style={{ color:'#ff9100'}} id='logo'>{this.props.navBrand}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/productlist"><NavLink>Product</NavLink></Link>
                            </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                Hello, {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/cart">Cart</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/history">History</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onClickLogOut}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                         </UncontrolledDropdown>
                         </Nav>
                         </Collapse>
                         </Navbar>
        )
    }
}


const mapStateToProps = (state) => {
    return { username: state.auth.username, cart: state.auth.jumlahCart }
}

export default connect(mapStateToProps, {onLogOut, keepLogin})(headerReact);