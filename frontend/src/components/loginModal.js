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
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} animation={false}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Title</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                placeholder="Password"
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