import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
  
    this.setState({ activeItem });
  };

  render() {
    const { onSave } = this.props;
    return (
      <Modal isOpen={true} animation={false}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={this.state.activeItem.firstName}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={this.state.activeItem.lastName}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwordConfirm">Confirm Password</Label>
              <Input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={this.state.activeItem.passwordConfirm}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem,'songs')}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}