export class TabSwitcher {
  constructor({ initTab = null } = {}) {
    this.initTab = initTab
    this.reset()
  }

  switch(tab) {
    if (this.currentTab === tab) {
      this.reset()
    } else {
      this.currentTab = tab
    }
  }

  isTab(tabs) {
    if (Array.isArray(tabs)) {
      return tabs.indexOf(this.currentTab) >= 0
    }
    return this.currentTab === tabs
  }

  setTab(tab) {
    this.currentTab = tab
  }

  getTab() {
    return this.currentTab
  }

  reset() {
    this.currentTab = this.initTab
  }
}

export { TabSwitcher as default }
