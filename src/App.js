import React, { Component } from "react";
import matchCard from "./components/matchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matches.json";

class App extends Component {
  // Setting this.state.matches to the matches json array
  state = {
    matches,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.matches.forEach(matchCard => {
      matchCard.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.matches.find((o, i) => {
      if (o.id === id) {
        if(matches[i].count === 0){
          matches[i].count = matches[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.matches.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }

  // Map over this.state.matches and render a matchCard component for each match object
  render() {
    return (
      <Wrapper>
        <Title>Cartoon Character's Roulette Game</Title>
        {this.state.matches.map(match => (
          <matchCard
            clickCount={this.clickCount}
            id={match.id}
            key={match.id}
            image={match.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
