export class CycleSwitcher {
  constructor({ tabs, initTab = null, disableCycle = false }) {
    this.tabs = tabs
    this.initTab = (this.tabs.indexOf(initTab) >= 0) ? initTab : null
    this.disableCycle = (disableCycle === true)
    this.reset()
  }

  goNext() {
    if (this.currentIndex >= 0) {
      if (this.isLast) {
        if (!this.disableCycle) {
          this.goFirst()
        }
      } else {
        this.setTab(this.tabs[this.currentIndex + 1])
      }
    }
  }

  goPrev() {
    if (this.currentIndex >= 0) {
      if (this.isFirst) {
        if (!this.disableCycle) {
          this.goLast()
        }
      } else {
        this.setTab(this.tabs[this.currentIndex - 1])
      }
    }
  }

  goFirst() {
    this.setTab(this.tabs[0])
  }

  goLast() {
    this.setTab(this.tabs[this.tabs.length - 1])
  }

  get isFirst() {
    return this.currentIndex === 0
  }

  get isLast() {
    return this.currentIndex === this.tabs.length - 1
  }

  get currentIndex() {
    return this.tabs.indexOf(this.currentTab)
  }

  switch(tab) {
    if (this.currentTab === tab) {
      this.reset()
    } else if (this.tabs.indexOf(tab) >= 0) {
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
    if (tab === null || this.tabs.indexOf(tab) >= 0) {
      this.currentTab = tab
    }
  }

  getTab() {
    return this.currentTab
  }

  reset() {
    this.currentTab = this.initTab
  }
}

export { CycleSwitcher as default }
