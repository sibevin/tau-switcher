export class BooleanSwitcher {
  constructor({ initTab = false } = {}) {
    this.initTab = !!initTab
    this.reset()
  }

  switch() {
    this.currentTab = !this.currentTab
  }

  switchOn() {
    this.currentTab = true
  }

  switchOff() {
    this.currentTab = false
  }

  isTab(tab) {
    return this.currentTab === !!tab
  }

  setTab(tab) {
    this.currentTab = !!tab
  }

  getTab() {
    return !!this.currentTab
  }

  reset() {
    this.currentTab = this.initTab
  }
}

export { BooleanSwitcher as default }
