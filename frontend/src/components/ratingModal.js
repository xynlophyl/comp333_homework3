import React, { Component } from "react";
import { NavItem } from "reactstrap";
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
      rating: this.props.activeItem.rating,
    };
  }

  handleChange = (e) => {
    let {name, value} = e.target;
    const activeItem = {...this.state.activeItem, [name]: value};

    this.setState({ activeItem });
  };

  render() {
    const {toggle, onSave} = this.props;

    return (
      <Modal isOpen={true} toggle={toggle} animation={'false'}>
        <ModalHeader toggle = {toggle}> new rating</ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup>
            <Label for="song-rating">rating</Label>
            <Input
              type="text"
              id="song-rating"
              name="rating"
              value={this.state.activeItem.rating}
              onChange={this.handleChange}
              placeholder="enter new rating"
            />
          </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem, 'ratings')}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}