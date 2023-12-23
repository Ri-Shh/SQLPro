import React from "react";
import styles from './Nav.module.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../logo.png';

function Nav(props) {
    
    return (
        <div className={styles.navleft}>
            <div onClick={props.handleClick} className={styles.click}>
                {
                    props.flag ?
                    <div className={styles.centeredContent}>
                        <span>Connect to client</span>
                        <img src={logo} style={{ width: 50, height: 40}} />
                    </div>
                    : 
                    <img src={logo} style={{ width: 50, height: 40}} />
                }
            </div>
            {
                props.flag ?
                <Sidebar>
                    <Menu>
                        <SubMenu label="MySQL">
                        <MenuItem> Databases </MenuItem>
                        <MenuItem> Tables </MenuItem>
                        </SubMenu>
                        <SubMenu label="PostgreSQL">
                        <MenuItem> Databases </MenuItem>
                        <MenuItem> Tables </MenuItem>
                        </SubMenu>
                        <SubMenu label="Oracle Server">
                        <MenuItem> Databases </MenuItem>
                        <MenuItem> Tables </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
                : <></>
            }
        </div>
    );
}


export default Nav;

