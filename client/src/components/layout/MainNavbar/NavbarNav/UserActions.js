import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/client.png")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Sir Robert Burbridge</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/profile">
            <img src={require("./../../../../images/icons/user.png")}/>Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/editprofile">
            <img src={require("./../../../../images/icons/edit.png")}/>Edit Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" className="text-danger">
            <img src={require("./../../../../images/icons/logout.png")}/>Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
