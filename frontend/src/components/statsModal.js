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

  findBestRatedSong = () => {
    console.log(this.state)
    var best_song = null
    var best_artist = null
    var best_rating = -1
    this.state.activeItem.songsList.forEach((song) => {
        if (song.rating_average && song.rating_average > best_rating) {
            best_song = song.song
            best_artist = song.artist
            best_rating = song.rating_average
        }
    })
    // console.log(best_song,best_rating)
    return [best_song, best_artist]
  }

  userRatingsCount = () => {
      return this.state.activeItem.ratingsList.length
  }

  songCount = () => {
      return this.state.activeItem.songsList.length
  }

  popularGenre = () => {
      var genres = {}
      this.state.activeItem.songsList.forEach((song) => {
        if (song.genre in genres){
            genres[song.genre].push(song.rating_average)
        } else {
            genres[song.genre] = [song.rating_average]
        }
      })
    //   console.log('g', genres)

      var best_genre = null
      var best_rating = -1
      for (let g in genres) {
          let sum = genres[g].reduce((a, b) => a + b)
          let len = genres[g].length
          if (best_rating < sum/len){
              best_genre = g
              best_rating = sum/len
          }
      }
      return [best_genre]
  }

  renderItems = () => {
      let [best_song, best_artist] = this.findBestRatedSong()
      let ratings_count = this.userRatingsCount()
      let songs_count = this.songCount()
      let [best_genre] = this.popularGenre()
      
      return (
          <div>
            <div>
                    TOP RATED SONG: {best_song} by {best_artist}
            </div>
            <div>
                    YOUR RATING COUNT: {ratings_count}
            </div>
            <div>
                    NUMBER OF SONGS: {songs_count}
            </div>
            <div>
                    TOP RATED GENRE: {best_genre}
            </div>
          </div>
      );
  }

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} animation={'false'}>
        <ModalHeader toggle={toggle}>STATISTICS</ModalHeader>
        <ModalBody>
          <Label> {this.renderItems()} </Label>
          
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