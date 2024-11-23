import * as hz from 'horizon/core';
import { Events } from 'Events';
import { RaceManager } from 'RaceManager';

class LeaderboardController extends hz.Component<typeof LeaderboardController> {
  static propsDefinition = {
    leaderboardName: { type: hz.PropTypes.String, default: 'Leaderboard' }, // Using the existing leaderboard name
  };

  constructor() {
    super();
  }

  preStart() {
    // Listen to the event when a player reaches the goal
    this.connectLocalBroadcastEvent(Events.onPlayerReachedGoal, (data) => {
      const player = data.player as hz.Player;

      // Find the RaceManager instance to get the player's race time
      const raceManager = RaceManager.getInstance();

      // Get the player's final race time from RaceManager
      if (raceManager) {
        const raceParticipant = raceManager.getRaceParticipant(player);
        if (raceParticipant) {
          const matchTime = Math.floor(raceParticipant.lastKnownRaceTime);

          // Update the leaderboard using setScoreForPlayer
          if (this.world.leaderboards) {
            this.world.leaderboards.setScoreForPlayer(this.props.leaderboardName!, player, matchTime, true);
            console.log(`Updated leaderboard with player: ${player.name.get()} and time: ${matchTime}`);
          } else {
            console.error("Leaderboards are not available in the world object.");
          }
        } else {
          console.error("Race participant data not found for player.");
        }
      } else {
        console.error("RaceManager instance not found.");
      }
    });
  }

  start() {}
}

hz.Component.register(LeaderboardController);
