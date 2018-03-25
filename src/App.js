import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";
//console.log(friends);


class App extends Component {

  // Setting this.state.friends to the friends json array
  state = {
    selectedFriends: [],
    score: 0,
    friendsArray: friends,
    correct: "",
    highScore: [0]
    // friends
  };

  // testIfMatch = (haystack, arr) => {
  //   return arr.some(function (v) {
  //     return haystack.indexOf(v) >= 0;
  //   });
  // };

  shuffle = (arrayInput, realIndexParam) => {
      // formula for deciding whether the score get a + 1 or goes back to 0.  If any item in this.state.selectedFriends exists in this.state.FriendsArray, then 0, otherwise, +1:
      // let found = this.state.selectedFriends.indexOf(this.state.friendsArray[realIndexParam]));
      // console.log(found);
      
      if (this.state.selectedFriends.indexOf(this.state.friendsArray[realIndexParam]) > -1) {
        console.log("matched, you lose");
        this.state.highScore.push(this.state.score);
        this.setState({highScore: this.state.highScore.sort()});
        console.log(this.state.highScore);
        let newScore = 0;
        this.setState({ correct: "Incorrect! Starting Over!" });
        this.setState({ score: newScore });
        this.setState({ selectedFriends: [] });
      } else {
        console.log("unique, keep going");
        //this.state.score += 1;
        
        let newScore = this.state.score + 1;
        console.log("newScore: " + newScore);
        //
        this.setState({ score: newScore }, () => {
          console.log('score after the callback: ' + this.state.score);
          console.log(this.state.friendsArray);
          console.log(this.state.selectedFriends);
          this.state.highScore.push(this.state.score);
          this.setState({highScore: this.state.highScore.sort()});
          this.setState({ correct: "Keep Going!" });
          console.log("high score: " + this.state.highScore);
        }); 
        //
        // this.setState({ score: newScore });
        // console.log("score: " + this.state.score);
        
        
        // this.state.highScore.push(this.state.score);
        //this.setState({highScore: this.state.highScore.sort()});
        
      }
    
      //console.log("score: " + this.state.score);

    this.state.selectedFriends.push(this.state.friendsArray[realIndexParam]);
    
    var currentIndex = arrayInput.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arrayInput[currentIndex];
      arrayInput[currentIndex] = arrayInput[randomIndex];
      arrayInput[randomIndex] = temporaryValue;
    }
    this.setState({ friendsArray: arrayInput });
  }

  // var removeFriend = function (id) {
  //   this.setState({ friends });
  //   return const friends = this.state.friends.filter(friend => friend.id !== id);
  // }

  removeFriend = id => {
    console.log(this.state.selectedFriends);
    // Filter this.state.friends for friends with an id not equal to the id being removed
    //const friends = this.state.friends.filter(friend => friend.id !== id);
    //const friends = this.state.friends.shuffle(this.state.friends);
        



    this.state.selectedFriends.push(this.state.friends.filter(friend => friend.id === id));

    
  
    // let newScore = this.state.score + 1;
    // this.setState({ score: newScore });
    // Set this.state.friends equal to the new friends array
    // this.setState({ selectedFriends: newSelectedFriends, 
    //                 friends });
    this.setState({ friends });

    //console.log(this.state.selectedFriends);
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    console.log(this.state.friendsArray);
    return (
      <Wrapper>
        <Title>Friends List Score: {this.state.score} {this.state.correct} High Score: {this.state.highScore[this.state.highScore.length -1]}</Title>
        {this.state.friendsArray.map(friend => (
          <FriendCard
            shuffle={this.shuffle}
            friends={this.state.friendsArray}
            removeFriend={this.removeFriend}
            id={friend.id}
            realIndex={this.state.friendsArray.indexOf(friend)}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
