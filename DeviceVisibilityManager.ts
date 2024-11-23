import * as hz from 'horizon/core';

type Props = {
  showOnVR: boolean;
  showOnDesktop: boolean;
  showOnMobile: boolean;
};

class VisiblePerPlatform extends hz.Component<Props> {
  static propsDefinition = {
    showOnVR: { type: hz.PropTypes.Boolean, default: false },
    showOnDesktop: { type: hz.PropTypes.Boolean, default: false },
    showOnMobile: { type: hz.PropTypes.Boolean, default: false },
  };

  private readonly visibleToList = new Set<hz.Player>();

  preStart() {
    this.handlePlayerEntryAndExit();
  }

  start() {}

  private handlePlayerEntryAndExit() {
    // Consolidated event handling for both player entry and exit
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterWorld, this.onPlayerEnter.bind(this));
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerExitWorld, this.onPlayerExit.bind(this));
  }

  private onPlayerEnter(player: hz.Player): void {
    if (this.shouldPlayerSeeEntity(player)) {
      this.visibleToList.add(player);
    }
    this.updateVisibility();
  }

  private onPlayerExit(player: hz.Player): void {
    this.visibleToList.delete(player);
    this.updateVisibility();
  }

  private shouldPlayerSeeEntity(player: hz.Player): boolean {
    const deviceType = player.deviceType.get();
    return (
      (this.props.showOnVR && deviceType === hz.PlayerDeviceType.VR) ||
      (this.props.showOnDesktop && deviceType === hz.PlayerDeviceType.Desktop) ||
      (this.props.showOnMobile && deviceType === hz.PlayerDeviceType.Mobile)
    );
  }

  private updateVisibility() {
    if (this.visibleToList.size > 0) {
      this.entity.setVisibilityForPlayers(Array.from(this.visibleToList), hz.PlayerVisibilityMode.VisibleTo);
    } else {
      // Setting visibility for all players to hidden instead of using an invalid "Invisible" mode.
      this.entity.setVisibilityForPlayers([], hz.PlayerVisibilityMode.HiddenFrom);
    }
  }
}

hz.Component.register(VisiblePerPlatform);
