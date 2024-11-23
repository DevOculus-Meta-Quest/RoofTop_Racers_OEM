import * as hz from 'horizon/core';
import { PropTypes} from 'horizon/core';

class HideTeachingObjects extends hz.Component<typeof HideTeachingObjects> {
  static propsDefinition = {
    target: { type: PropTypes.Entity },
    visible: { type: PropTypes.Boolean, default: false }
  };

  start() {
    const target = this.props.target!;
    target.visible.set(this.props.visible)
  }
}
hz.Component.register(HideTeachingObjects);
