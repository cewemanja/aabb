'use babel';

import AabbView from './aabb-view';
import { CompositeDisposable } from 'atom';

export default {

  aabbView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aabbView = new AabbView(state.aabbViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aabbView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aabb:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aabbView.destroy();
  },

  serialize() {
    return {
      aabbViewState: this.aabbView.serialize()
    };
  },

  toggle() {
    console.log('Aabb was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
