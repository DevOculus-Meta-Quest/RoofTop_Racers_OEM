import * as hz from 'horizon/core';
import { Events } from "Events";
import { PlayerFireEventOnTriggerBase } from 'PlayerEventTriggerBase';

class PlayerVictoryTrigger extends PlayerFireEventOnTriggerBase<typeof PlayerVictoryTrigger> {

  static propsDefinition = {
    particle1: { type: hz.PropTypes.Entity },
    particle2: { type: hz.PropTypes.Entity },
  };

  protected onEntityEnterTrigger(): void {}
  protected onEntityExitTrigger(): void {}
  protected onPlayerExitTrigger(): void {}

  protected onPlayerEnterTrigger(enteredBy: hz.Player): void {
    console.log(`Player entered victory trigger: ${enteredBy.name.get()}`);
    
    // Assuming the player's match time is already calculated somewhere in the game manager logic
    // Here we are triggering the event that should carry this player's finish time
    
    // Assuming `matchTime` is part of the data available, we'll include it in the event
    const matchTime = this.getMatchTimeForPlayer(enteredBy);
    if (matchTime !== undefined) {
      this.sendLocalBroadcastEvent(Events.onPlayerReachedGoal, { player: enteredBy, matchTime });
    }

    // Play victory particles
    [this.props.particle1, this.props.particle2].forEach(particle => {
      particle?.as(hz.ParticleGizmo)?.play();
    });
  }

  // Placeholder function - Replace this with actual logic to get the player's finish time
  private getMatchTimeForPlayer(player: hz.Player): number | undefined {
    // Here we are assuming there's some existing manager or state in the game that holds player times
    // If you can find that, you can use that instead of this placeholder
    // For now, I'm returning an example time of 60 seconds
    return 60; // Replace with actual match time retrieval logic
  }
}

hz.Component.register(PlayerVictoryTrigger);
