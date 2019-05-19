import { TabSwitcher, CycleSwitcher, BooleanSwitcher } from '../../src/index'

describe('TabSwitcher', () => {
  describe('.initialize', () => {
    describe('when no tab is given', () => {
      test('should create a tab switcher with a null tab', () => {
        const ts = new TabSwitcher()
        expect(ts.getTab()).toBeNull()
      })
    })
    describe('when a tab is given', () => {
      test('should create a tab switcher with the given tab', () => {
        const initTab = 'init_tab'
        const ts = new TabSwitcher({ initTab })
        expect(ts.getTab()).toEqual(initTab)
      })
    })
  })
  describe('#switch', () => {
    describe('when the current tab is not equal to the given one', () => {
      test('should set the current tab with the given one', () => {
        const initTab = 'init_tab'
        const ts = new TabSwitcher({ initTab })
        const givenTab = 'given_tab'
        ts.switch(givenTab)
        expect(ts.getTab()).toEqual(givenTab)
      })
    })
    describe('when the current tab is equal to the given one', () => {
      test('should set the current tab with the initial tab', () => {
        const initTab = 'init_tab'
        const ts = new TabSwitcher({ initTab })
        const givenTab = 'given_tab'
        ts.setTab(givenTab)
        ts.switch(givenTab)
        expect(ts.getTab()).toEqual(initTab)
      })
    })
  })
  describe('#isTab', () => {
    describe('when the given tab is an array', () => {
      test('should check the current tab is in the given tabs or not', () => {
        const ts = new TabSwitcher()
        const givenTabs = ['a', 'b']
        expect(ts.isTab(givenTabs)).toBeFalsy()
        ts.switch('a')
        expect(ts.isTab(givenTabs)).toBeTruthy()
      })
    })
    describe('when the given tab is a single tab', () => {
      test('should check the current tab is equal to the given one or not', () => {
        const ts = new TabSwitcher()
        const givenTab = 'given_tab'
        expect(ts.isTab(givenTab)).toBeFalsy()
        ts.switch(givenTab)
        expect(ts.isTab(givenTab)).toBeTruthy()
      })
    })
  })
  describe('#setTab, #getTab', () => {
    test('should set and get the current tab', () => {
      const ts = new TabSwitcher()
      const givenTab = 'given_tab'
      ts.setTab(givenTab)
      expect(ts.getTab()).toEqual(givenTab)
    })
  })
  describe('#reset', () => {
    test('should set the current tab with the initial tab', () => {
      const initTab = 'init_tab'
      const ts = new TabSwitcher({ initTab })
      ts.setTab('other_tab')
      ts.reset()
      expect(ts.getTab()).toEqual(initTab)
    })
  })
})

describe('BooleanSwitcher', () => {
  describe('.initialize', () => {
    describe('when no tab is given', () => {
      test('should create a boolean switcher with the off status', () => {
        const bs = new BooleanSwitcher()
        expect(bs.getTab()).toBeFalsy()
      })
    })
    describe('when a tab is given', () => {
      test('should create a boolean switcher with the given tab', () => {
        const bs = new BooleanSwitcher({ initTab: true })
        expect(bs.getTab()).toBeTruthy()
      })
    })
  })
  describe('#switch', () => {
    describe('when the switcher is on', () => {
      test('should turn it off', () => {
        const bs = new BooleanSwitcher()
        bs.setTab(true)
        bs.switch()
        expect(bs.getTab()).toBeFalsy()
      })
    })
    describe('when the switcher is off', () => {
      test('should turn it on', () => {
        const bs = new BooleanSwitcher()
        bs.setTab(false)
        bs.switch()
        expect(bs.getTab()).toBeTruthy()
      })
    })
  })
  describe('#switchOn', () => {
    test('should turn the switcher on', () => {
      const bs = new BooleanSwitcher()
      bs.setTab(false)
      bs.switch()
      expect(bs.getTab()).toBeTruthy()
    })
  })
  describe('#switchOff', () => {
    test('should turn the switcher off', () => {
      const bs = new BooleanSwitcher()
      bs.setTab(true)
      bs.switch()
      expect(bs.getTab()).toBeFalsy()
    })
  })
  describe('#isTab', () => {
    test('should check the current tab has the same boolean value to the given one or not', () => {
      const bs = new BooleanSwitcher()
      bs.setTab(true)
      expect(bs.isTab(true)).toBeTruthy()
      expect(bs.isTab(false)).toBeFalsy()
      bs.switch()
      expect(bs.isTab(false)).toBeTruthy()
      expect(bs.isTab(true)).toBeFalsy()
    })
  })
  describe('#setTab, #getTab', () => {
    test('should set and get the current tab', () => {
      const bs = new BooleanSwitcher()
      const testCases = [
        {
          givenTab: true,
          result: true,
        },
        {
          givenTab: false,
          result: false,
        },
        {
          givenTab: 'a',
          result: true,
        },
        {
          givenTab: null,
          result: false,
        },
      ]
      testCases.forEach((testCase) => {
        bs.setTab(testCase.givenTab)
        expect(bs.getTab()).toEqual(testCase.result)
      })
    })
  })
  describe('#reset', () => {
    test('should set the current tab with the initial tab', () => {
      const initTab = true
      const bs = new BooleanSwitcher({ initTab })
      bs.setTab(false)
      bs.reset()
      expect(bs.getTab()).toEqual(initTab)
    })
  })
})

describe('CycleSwitcher', () => {
  describe('.initialize', () => {
    describe('when no initTab is given', () => {
      test('should create a cycle switcher with a null tab', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        expect(cs.getTab()).toBeNull()
      })
    })
    describe('when a initTab is given', () => {
      test('should create a cycle switcher with the given tab', () => {
        const tabs = ['a', 'b', 'c']
        const initTab = tabs[0]
        const cs = new CycleSwitcher({ tabs, initTab })
        expect(cs.getTab()).toEqual(initTab)
      })
    })
    describe('when the given initTab is not in tabs', () => {
      test('should create a cycle switcher with a null tab', () => {
        const tabs = ['a', 'b', 'c']
        const initTab = 'd'
        const cs = new CycleSwitcher({ tabs, initTab })
        expect(cs.getTab()).toBeNull()
      })
    })
  })
  describe('#switch', () => {
    describe('when the current tab is not equal to the given one', () => {
      test('should set the current tab with the given one', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        const givenTab = 'c'
        cs.switch(givenTab)
        expect(cs.getTab()).toEqual(givenTab)
      })
    })
    describe('when the current tab is equal to the given one', () => {
      test('should set the current tab with the initial tab', () => {
        const tabs = ['a', 'b', 'c']
        const initTab = tabs[0]
        const cs = new CycleSwitcher({ tabs, initTab })
        const givenTab = 'c'
        cs.setTab(givenTab)
        cs.switch(givenTab)
        expect(cs.getTab()).toEqual(initTab)
      })
    })
    describe('when the given tab is not in tabs', () => {
      test('should keep the current tab not changed', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        const oriTab = tabs[0]
        const givenTab = 'd'
        cs.setTab(oriTab)
        cs.switch(givenTab)
        expect(cs.getTab()).toEqual(oriTab)
      })
    })
  })
  describe('#goNext', () => {
    describe('when disableCycle is false', () => {
      describe('when the current tab is not the last one', () => {
        test('should set the current tab to the next one', () => {
          const tabs = ['a', 'b', 'c']
          const cs = new CycleSwitcher({ tabs })
          cs.switch('b')
          cs.goNext()
          expect(cs.isTab('c')).toBeTruthy()
        })
      })
      describe('when the current tab is the last one', () => {
        test('should set the current tab to the first one', () => {
          const tabs = ['a', 'b', 'c']
          const cs = new CycleSwitcher({ tabs })
          cs.switch('c')
          cs.goNext()
          expect(cs.isTab('a')).toBeTruthy()
        })
      })
      describe('when the current tab is not in the tabs', () => {
        test('should keep the current tab not changed', () => {
          const tabs = ['a', 'b', 'c']
          const cs = new CycleSwitcher({ tabs })
          cs.goNext()
          expect(cs.isTab(null)).toBeTruthy()
        })
      })
    })
    describe('when disableCycle is ture', () => {
      describe('when the current tab is the last tab', () => {
        test('should keep the current tab not changed', () => {
          const tabs = ['a', 'b', 'c']
          const disableCycle = true
          const cs = new CycleSwitcher({ tabs, disableCycle })
          cs.switch('c')
          cs.goNext()
          expect(cs.isTab('c')).toBeTruthy()
        })
      })
    })
  })
  describe('#goPrev', () => {
    describe('when disableCycle is false', () => {
      describe('when the current tab is not the first one', () => {
        test('should set the current tab to the next one', () => {
          const tabs = ['a', 'b', 'c']
          const cs = new CycleSwitcher({ tabs })
          cs.switch('b')
          cs.goPrev()
          expect(cs.isTab('a')).toBeTruthy()
        })
      })
      describe('when the current tab is the first one', () => {
        test('should set the current tab to the last one', () => {
          const tabs = ['a', 'b', 'c']
          const cs = new CycleSwitcher({ tabs })
          cs.switch('a')
          cs.goPrev()
          expect(cs.isTab('c')).toBeTruthy()
        })
      })
      describe('when the current tab is not in the tabs', () => {
        test('should keep the current tab not changed', () => {
          const tabs = ['a', 'b', 'c']
          const cs = new CycleSwitcher({ tabs })
          cs.goPrev()
          expect(cs.isTab(null)).toBeTruthy()
        })
      })
    })
    describe('when disableCycle is true', () => {
      describe('when the current tab is the first one', () => {
        test('should keep the current tab not changed', () => {
          const tabs = ['a', 'b', 'c']
          const disableCycle = true
          const cs = new CycleSwitcher({ tabs, disableCycle })
          cs.switch('a')
          cs.goPrev()
          expect(cs.isTab('a')).toBeTruthy()
        })
      })
    })
  })
  describe('#goFirst', () => {
    test('should set the current tab is the first one', () => {
      const tabs = ['a', 'b', 'c']
      const cs = new CycleSwitcher({ tabs })
      cs.switch('b')
      cs.goFirst()
      expect(cs.isFirst).toBeTruthy()
    })
  })
  describe('#goLast', () => {
    test('should set the current tab is the first one', () => {
      const tabs = ['a', 'b', 'c']
      const cs = new CycleSwitcher({ tabs })
      cs.switch('b')
      cs.goLast()
      expect(cs.isLast).toBeTruthy()
    })
  })
  describe('#isFirst', () => {
    test('should check the current tab is the first one or not', () => {
      const tabs = ['a', 'b', 'c']
      const cs = new CycleSwitcher({ tabs })
      cs.switch('a')
      expect(cs.isFirst).toBeTruthy()
      cs.switch('b')
      expect(cs.isFirst).toBeFalsy()
    })
  })
  describe('#isLast', () => {
    test('should check the current tab is the last one or not', () => {
      const tabs = ['a', 'b', 'c']
      const cs = new CycleSwitcher({ tabs })
      cs.switch('c')
      expect(cs.isLast).toBeTruthy()
      cs.switch('b')
      expect(cs.isLast).toBeFalsy()
    })
  })
  describe('#currentIndex', () => {
    test('should the current tab index', () => {
      const tabs = ['a', 'b', 'c']
      const cs = new CycleSwitcher({ tabs })
      cs.switch('a')
      expect(cs.currentIndex).toEqual(0)
      cs.switch('b')
      expect(cs.currentIndex).toEqual(1)
    })
  })
  describe('#isTab', () => {
    describe('when the given tab is an array', () => {
      test('should check the current tab is in the given tabs or not', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        const givenTabs = ['a', 'b']
        expect(cs.isTab(givenTabs)).toBeFalsy()
        cs.switch('a')
        expect(cs.isTab(givenTabs)).toBeTruthy()
      })
    })
    describe('when the given tab is a single tab', () => {
      test('should check the current tab is equal to the given one or not', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        const givenTab = tabs[0]
        expect(cs.isTab(givenTab)).toBeFalsy()
        cs.switch(givenTab)
        expect(cs.isTab(givenTab)).toBeTruthy()
      })
    })
  })
  describe('#setTab, #getTab', () => {
    describe('when the given tab is in tabs', () => {
      test('should set the current tab', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        const givenTab = tabs[0]
        cs.setTab(givenTab)
        expect(cs.getTab()).toEqual(givenTab)
      })
    })
    describe('when the given tab is not in tabs', () => {
      test('should keep the current tab not changed', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        const oriTab = tabs[0]
        const givenTab = 'd'
        cs.setTab(oriTab)
        cs.setTab(givenTab)
        expect(cs.getTab()).toEqual(oriTab)
      })
    })
    describe('when the given tab is null', () => {
      test('should set the current tab to null', () => {
        const tabs = ['a', 'b', 'c']
        const cs = new CycleSwitcher({ tabs })
        cs.setTab(null)
        expect(cs.getTab()).toBeNull()
      })
    })
  })
  describe('#reset', () => {
    test('should set the current tab with the initial tab', () => {
      const tabs = ['a', 'b', 'c']
      const initTab = tabs[0]
      const cs = new CycleSwitcher({ tabs, initTab })
      const otherTab = tabs[1]
      cs.setTab(otherTab)
      cs.reset()
      expect(cs.getTab()).toEqual(initTab)
    })
  })
})
