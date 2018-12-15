import React from "react";
import ReactDOM from "react-dom";
import { Dropdown, Container, Grid, Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./styles.css";

class Games extends React.Component {
  state = { games: [], user_games: [], showGames: false, sort: "A-Z" };
  //   componentDidMount() {
  //     const userId = this.props.user.id
  //     axios.get('/api/board_games')
  //       .then(res => {
  //         console.log(res.data)
  //         this.setState({games: res.data});
  //       })
  //     axios.get(`/api/users/${userId}/board_games`)
  //       .then(res => {
  //         console.log(res.data);
  //         this.setState({user_games: res.data});
  //       } )

  //   }

  toggleGames = () => {
    this.setState({ showGames: !this.state.showGames });
  };

  removeGame = id => {
    const userId = this.props.user.id;
    axios.delete(`/api/users/${userId}/board_games/${id}`).then(res => {
      console.log(res);
    });
  };

  addGame = id => {
    const userId = this.props.user.id;
    axios.post(`api/users/${userId}/board_games`, { userId, id }).then(res => {
      console.log(res);
    });
  };

  dropDownMenu = () => {
    return (
      <Dropdown text="Sort">
        <Dropdown.Menu>
          <Dropdown.Item
            text="A-Z"
            onClick={() => this.setState({ sort: "A-Z" })}
          />
          <Dropdown.Item
            text="Z-A"
            onClick={() => this.setState({ sort: "Z-A" })}
          />
          <Dropdown.Item
            text="Time Needed"
            onClick={() => this.setState({ sort: "Time Needed" })}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  userLibrary = () => {
    const { user_games } = this.state;
    return user_games.map(game => (
      <Card key={game.id}>
        <Card.Content>
          <Card.Header>{game.title}</Card.Header>
          <Card.Description>
            Players: {game.min_players} - {game.max_players}
          </Card.Description>
          <Card.Description>Company: {game.company}</Card.Description>
          <Card.Description>Time Needed: {game.time_needed}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="red" onClick={() => this.removeGame(game.id)}>
            Remove from Library
          </Button>
        </Card.Content>
      </Card>
    ));
  };
  gamesList = () => {
    const { games, user_games } = this.state;
    return games.map(game => (
      <Card key={game.id}>
        <Card.Content>
          <Card.Header>{game.title}</Card.Header>
          <Card.Description>
            Players: {game.min_players} - {game.max_players}
          </Card.Description>
          <Card.Description>Company: {game.company}</Card.Description>
          <Card.Description>Time Needed: {game.time_needed}</Card.Description>
        </Card.Content>
        {user_games.include ? (
          <Card.Content extra>
            <Button basic color="green" onClick={() => this.addGame(game.id)}>
              Add to Library
            </Button>
          </Card.Content>
        ) : (
          <Card.Content extra>
            <Button basic color="red" onClick={() => this.removeGame(game.id)}>
              Remove from Library
            </Button>
          </Card.Content>
        )}
      </Card>
    ));
  };

  render() {
    console.log(this.state);
    const { showGames } = this.state;
    return (
      <Container>
        <h1>Games</h1>
        <Grid>
          <Grid.Column floated="left" width={2}>
            <h3>Your Games</h3>
          </Grid.Column>
          <Grid.Column floated="right" width={2}>
            {this.dropDownMenu()}
          </Grid.Column>
        </Grid>
        <Card.Group itemsPerRow={4}>{this.userLibrary()}</Card.Group>
        {showGames ? (
          <div>
            <Button basic onClick={this.toggleGames}>
              Done Adding
            </Button>
            <Card.Group itemsPerRow={4}>{this.gamesList()}</Card.Group>
          </div>
        ) : (
          <Button basic onClick={this.toggleGames}>
            Add a Game
          </Button>
        )}
      </Container>
    );
  }
}

// class Menu extends React.Component {
//   state = {};
//   dropDownMenu = () => {
//     return (
//       <Dropdown text="Sort">
//         <Dropdown.Menu>
//           <Dropdown.Item
//             text="A-Z"
//             onClick={() => this.setState({ sort: "A-Z" })}
//           />
//           <Dropdown.Item
//             text="Z-A"
//             onClick={() => this.setState({ sort: "Z-A" })}
//           />
//           <Dropdown.Item
//             text="Time Needed"
//             onClick={() => this.setState({ sort: "Time Needed" })}
//           />
//         </Dropdown.Menu>
//       </Dropdown>
//     );
//   };
//   render() {
//     console.log(this.state);
//     return <div>{this.dropDownMenu()}</div>;
//   }
// }

function App() {
  return (
    <div className="App">
      <Games />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
