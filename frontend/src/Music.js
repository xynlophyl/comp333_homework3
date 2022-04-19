// STARTED FROM HERE
import React, { Component} from "react";
import SongModal from "./components/songModal";
import RatingModal from "./components/ratingModal";
import StatsModal from "./components/statsModal";

import axios from "axios";

class Music extends Component {
    constructor(props){
        super(props);
        this.state = {
            songsList:[],
            ratingsList:[],
            ratedSongs: [],
            userSongs: [],
            activeSong:{
                id: null,
                song: '',
                artist: '',
            },
            activeRating: {
                song_artist: '',
                song: '',
                artist: '',
                rating: '',
            },
            songModal: false,
            ratingModal: false,
            statsModal: false,

            errorFlag: false,
            errorMsg: null,
            config: {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token 6a19c2c42d0a044cb1f7b58f6625fe10f802507c01b17d6d46f831cf4c72023d"
                }
            },
        }
    };

    componentDidMount() {
        this.refreshList();
    };

    trackUserRatedSongs = () => {
        this.state.songsList.forEach((song) => {
            if (this.state.ratedSongs.includes(song.song_artist)  && !this.state.userSongs.includes(song)){
                this.state.userSongs.push(song)
            }   
        })
    }

    mapSongsToRating = () => {
        this.state.ratingsList.forEach((rating) => {
            // console.log(rating.id)
            if (!this.state.ratedSongs.includes(rating.song_artist)){
                this.state.ratedSongs.push(rating.song_artist)
            }
        })
    }

    refreshList = () => {
        this.setState({errorMessage: null})
        axios
            .get("http://localhost:8000/api/songs/")
            .then((res) => this.setState({songsList: res.data}))
            .catch((err) => console.log(err))
        // console.log('getting ratings')
        axios
            .get("http://localhost:8000/api/ratings/", this.state.config)
            .then((res) => this.setState({ratingsList: res.data}))
            .catch((err) => console.log(err))
        // console.log('ratings', this.state.ratingsList)
        // console.log('songs', this.state.songsList)
        this.mapSongsToRating()
        this.trackUserRatedSongs()
        console.log('user', this.state.userSongs)
    };
    
    toggleSongModal = () => {
        this.setState({songModal: !this.state.songModal});
    };

    toggleRatingModal = () => {
        this.setState({ratingModal: !this.state.ratingModal});
    };

    toggleStatsModal = () => {
        this.setState({statsModal: !this.state.statsModal});
    };

    handleSubmit = (item, type) => {
        this.refreshList()
        if (type == 'songs') {
            this.toggleSongModal();
            item.song_artist = item.song + '_'+item.artist
            if (!item.id) {
                axios
                    .post(`http://localhost:8000/api/${type}/`, item)
                    .then((res) => this.refreshList())
                    .catch((e) => this.setState({errorFlag:true, errorMessage: 'this song and artist combination already exists'}))
                return;
            }
            // update method
            axios 
                .put(`http://localhost:8000/api/${type}/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        } else {
            this.toggleRatingModal();
            if (this.state.ratedSongs.includes(item.song_artist)){
                // console.log('already rated')
                this.setState({errorFlag: true, errorMessage: 'user has already rated this song, please rate another song.'})
                return;
            }
            axios
            .post(`http://127.0.0.1:8000/api/ratings/`, item, this.state.config)
            .then((res) => this.refreshList())
            .catch((e) => console.log(e))
            return;


            // update method
            
        }
        // create method 

    }

    handleDelete = (item, type) => {
        axios
            .delete(`http://localhost:8000/api/${type}/${item.id}/`, item)
            .then((res) => this.refreshList());
    };



    createSong = () => {
        // console.log("new song")
        const item = { song_artist: "", song: "", artist: "", genre: "" };
        this.setState({activeSong: item, songModal: !this.state.songModal})
        if (this.state.ratingModal) {
            this.setState({ratingModal: !this.state.ratingModal})
        }
    };

    editSong = (item) => {
        // console.log(item)
        this.setState({ activeSong: item, songModal: !this.state.songModal });
        console.log(this.state.activeSong)

        if (this.state.ratingModal) {
            this.setState({ratingModal: !this.state.ratingModal})
        }
    };

    editRating = (item) => {
        // console.log(item)
        this.setState({ activeRating: item, ratingModal: !this.state.ratingModal });
        if (this.state.songModal) {
            this.setState({songModal: !this.state.songModal})
        }

        console.log('active rating', this.state.activeRating)

    };

    checkStats = () => {
        this.setState({statsModal: !this.state.statsModal})
    }

    renderSongs = (songs) => {
        // console.log(songs)
        return songs.map((item,i) => (
            <li
                key={i}
                className=""
            >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.song} | Artist: {item.artist} | Genre: {item.genre} | {item.rating_average}
                </span>
                <span>
                    <button
                        onClick={()=>this.editSong(item)}
                    >
                        edit
                    </button>
                    <button
                        onClick={()=>this.editRating(item)}
                    >
                        rate
                    </button>
                    <button
                        onClick={()=> this.handleDelete(item, 'songs')}
                    >
                        delete
                    </button>
                    
                </span>

            </li>
        ));
    };

    // renderUsers = (users) => {
    //     axios
    //         .get(`http://localhost:8000/api//${item.id}/`, ))
    // }
    
    render() {
        return(
            <main className="container">
                <h1 className="header">songs</h1>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            <span>
                            </span>
                            {this.state.songModal ? (
                                <SongModal
                                    activeItem = {this.state.activeSong}
                                    toggle = {this.toggleSongModal}
                                    onSave = {this.handleSubmit}
                                />
                            ): null}
                            {this.state.ratingModal ? (
                                <RatingModal
                                    activeItem = {this.state.activeRating}
                                    toggle = {this.toggleRatingModal}
                                    onSave = {this.handleSubmit}
                                />
                            ): null}
                            {this.state.statsModal ? (
                                <StatsModal
                                    activeItem = {this.state}
                                    toggle = {this.toggleStatsModal}
                                    onSave = {this.handleSubmit}
                                />
                            ): null}
                            {this.state.errorFlag ? (
                                <p>{this.state.errorMessage}</p>
                            ): null}
                            {this.renderSongs(this.state.songsList)}
                        </div>
                        <div className="">
                                <button
                                    className=""
                                    onClick={this.createSong}
                                >
                                    add song
                                </button>
                                <button
                                    onClick={this.checkStats}
                                >
                                    song stats
                                </button>
                            </div>
                    </div>
                </div>
            </main>
        )
    }
};

export default Music;
