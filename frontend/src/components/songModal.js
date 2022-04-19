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
      <Modal isOpen={true} toggle={toggle} animation={'false'}>
        <ModalHeader toggle={toggle}>New Song</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="song-title">Title</Label>
              <Input
                type="text"
                id="song-title"
                name="song"
                value={this.state.activeItem.song}
                onChange={this.handleChange}
                placeholder="Enter song title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song-artist">Artist</Label>
              <Input
                type="text"
                id="song-artist"
                name="artist"
                value={this.state.activeItem.artist}
                onChange={this.handleChange}
                placeholder="Enter song artist"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song-genre">Genre</Label>
              <select
                id="song-genre"
                name="genre"
                onChange={this.handleChange}
                value={this.state.activeItem.genre}
              >
                <option value=""> </option>
                <option value="Pop">Pop</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Rock">Rock</option>
                <option value="Classic">Classic</option>
                <option value="Country">Country</option>
                <option value="Indie">Indie</option>
                <option value="EDM">EDM</option>
                <option value="Jazz">Jazz</option>
                <option value="RnB">R&B</option>
                <option value="Other">Other</option>



              </select>
              {/* <Input
                type="text"
                id="song-genre"
                name="genre"
                value={this.state.activeItem.genre}
                onChange={this.handleChange}
                placeholder="Enter song genre"
              /> */}
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