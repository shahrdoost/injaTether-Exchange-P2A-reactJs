import React, {Component} from 'react';

import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';

import {Icon} from "coinmarketcap-cryptocurrency-icons";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';

import {
    Link,
} from "react-router-dom";
import {Button} from "@material-ui/core";


class HeaderPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            data: '',
            count: props.count
        };
        this.mounted = true;
    }


    getCookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    }


    CheckLogin() {
        if (this.getCookie('__react_session__') != null) {
            return true
        } else {
            return false
        }
    }


    componentDidMount() {
        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': ' Bearer ' + this.getCookie('__react_session__')['token']
            }
        };
        try {

            fetch(this.getCookie('__react_session__')['url'] + "/auth/profile", requestOptions)
                .then(res => res.json())
                .then(
                    async (result) => {

                        if (result.statusCode === 500) {
                            window.location.replace("/login");
                        }

                        if (result.statusCode === 401) {
                            window.location.replace("/login");
                        }

                        if (result === null) {
                            window.location.replace("/login");
                        }

                        if (result.data === null) {
                            window.location.replace("/login");
                        }

                        await this.setState({
                            isLoaded: true,
                            data: result,
                            formInput: ''
                        });

                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            work: true,
                            error
                        });
                    }
                )
        } catch (e) {

        }
    }


    render() {

        const {data} = this.state;

        return (


            <div>


                <div className="topnavmobile">

                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home"> <Link as={Link} to="/panel/dashboard"><Icon i='usdt' size={25}/> ???????????????? </Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/panel/dashboard">??????????????</Nav.Link>
                                <Nav.Link as={Link} to="/panel/kyc">??????????????</Nav.Link>
                                <Nav.Link as={Link} to="/panel/tickets">????????????????</Nav.Link>
                                <Nav.Link as={Link} to="/panel/buysell">???????? ?? ????????</Nav.Link>
                                <Nav.Link as={Link} to="/panel/cards">???????? ??????????</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                </div>

                <div className="topnav">

                    <Navbar collapseOnSelect expand="lg" variant="light" fixed="top" style={{
                        right: '100px',
                        paddingTop: '1rem',
                        backgroundColor: '#F6F6F6',
                        paddingLeft: '1rem',
                    }}>
                        <Navbar.Brand href="#home"><Icon i='usdt' size={25}/> ???????????????? </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">

                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">{data.email}</Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    ????????
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                </div>


                <div className="sidebar">
                    <Link as={Link} to="/panel/dashboard"><HomeRoundedIcon
                        style={{fontSize: 30, color: 'white'}}></HomeRoundedIcon></Link>
                    <Link as={Link} to="/panel/buysell"><ShoppingCartRoundedIcon
                        style={{fontSize: 30, color: 'white'}}></ShoppingCartRoundedIcon></Link>
                    <Link as={Link} to="/panel/tickets"><EmailRoundedIcon
                        style={{fontSize: 30, color: 'white'}}></EmailRoundedIcon></Link>
                    <Link as={Link} to="/panel/kyc"><AccountCircleRoundedIcon
                        style={{fontSize: 30, color: 'white'}}></AccountCircleRoundedIcon></Link>
                    <Link as={Link} to="/panel/cards"><CreditCardRoundedIcon
                        style={{fontSize: 30, color: 'white'}}></CreditCardRoundedIcon></Link>

                    {/* <a onClick={this.increment.bind(this)}>{this.props.count}</a>
                    <a onClick={this.increment.bind(this)}>{this.props.name}</a>*/}
                </div>

            </div>

        );
    }
}

export default HeaderPanel;
