'use babel';

import TaskPanelView from './task-panel-view';
import { CompositeDisposable } from 'atom';

export default {

  taskPanelView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.taskPanelView = new TaskPanelView(state.taskPanelViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.taskPanelView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'task-panel:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.taskPanelView.destroy();
  },

  serialize() {
    return {
      taskPanelViewState: this.taskPanelView.serialize()
    };
  },

  toggle() {
    console.log('TaskPanel was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
