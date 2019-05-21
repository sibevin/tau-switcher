# Tau Switcher

[![npm version](https://badge.fury.io/js/tau-switcher.svg)](https://badge.fury.io/js/tau-switcher)
[![Build Status](https://travis-ci.org/sibevin/tau-switcher.svg?branch=master)](https://travis-ci.org/sibevin/tau-switcher)
[![Coverage Status](https://coveralls.io/repos/github/sibevin/tau-switcher/badge.svg?branch=master)](https://coveralls.io/github/sibevin/tau-switcher?branch=master)

A tool to define tabs and switch between them.

## Usage

Require or import package first

    // cjs
    const { TabSwitcher, CycleSwitcher, BooleanSwitcher } = require('tau-switcher')

    // esm
    import { TabSwitcher, CycleSwitcher, BooleanSwitcher } from 'tau-switcher'

### Tab Switcher

Create a switcher and use it to switch between tabs

    const ts = new TabSwitcher()
    ts.getTab() // null

    ts.switch('a')
    ts.getTab() // 'a'
    ts.switch('a') // switch back to null
    ts.getTab() // null

    ts.switch('b')
    ts.isTab(['a', 'b']) // true
    ts.isTab('b') // true
    ts.isTab(['c', 'd']) // false
    ts.isTab('c') // false

    ts.setTab('c')
    ts.getTab() // 'c'

    ts.reset()
    ts.getTab() // null

### Cycle Switcher

Use `CycleSwitcher` to create a switcher with pre-define tabs, then you can use `#goNext`, `#goPrev`, `#goFirst`, `#goLast` to switch tabs.

    const cs = new CycleSwitcher({ tabs: ['a', 'b', 'c'] })
    cs.getTab() // null

    cs.goFirst()
    cs.getTab() // 'a'
    cs.goNext()
    cs.getTab() // 'b'
    cs.goNext()
    cs.getTab() // 'c'
    cs.goNext()
    cs.getTab() // 'a'
    cs.goPrev()
    cs.getTab() // 'c'
    cs.goPrev()
    cs.getTab() // 'b'
    cs.goPrev()
    cs.getTab() // 'a'
    cs.goLast()
    cs.getTab() // 'c'

Use `#isFirst`, `#isLast`, `#currentIndex` to get the current tab information.

    cs.setTab('a')
    cs.getTab() // 'a'
    cs.isFirst // true
    cs.isLast // false
    cs.currentIndex // 0

    cs.setTab(null)
    cs.getTab() // null
    cs.isFirst // false
    cs.isLast // false
    cs.currentIndex // -1

You can disable the cycle behavior by given a parameter `disableCycle: true` when creating a cycle switcher, then the current tab would not be changed if you try to go to the next tab from the last tab or go to the previous tab from the first tab.

    const cs = new CycleSwitcher({ tabs: ['a', 'b', 'c'], disableCycle: true })
    cs.goFirst()
    cs.getTab() // 'a'
    cs.goPrev()
    cs.getTab() // 'a'
    cs.goLast()
    cs.getTab() // 'c'
    cs.goNext()
    cs.getTab() // 'c'

`CycleSwither` has `#switch`, `#getTab`, `#isTab` as well, but the given tab must be pre-defined or null, otherwise the current tab would be not changed.

    cs.switch('b')
    cs.getTab() // 'b'
    cs.switch('invalid_tab')
    cs.getTab() // 'b'

### Boolean Switcher

`BooleanSwitcher` has only two tabs - true and false. The `#switch` don't receive any tab parameter and just switch the current boolean value to the opposite one.

    const bs = new BooleanSwitcher()
    bs.getTab() // false

    bs.switch()
    bs.getTab() // true
    bs.switch()
    bs.getTab() // false
    bs.switchOn()
    bs.getTab() // true
    bs.switchOff()
    bs.getTab() // false

    bs.setTab(true)
    bs.isTab(true) // true
    bs.isTab(false) // false

    bs.setTab(true)
    bs.getTab() // true
    bs.setTab(false)
    bs.getTab() // false

    bs.reset()
    bs.getTab() // false

`BooleanSwitcher` would try to covert (by `!!tab` ) tabs to boolean values before using them.

    bs.setTab('a')
    bs.getTab() // true
    bs.setTab(null)
    bs.getTab() // false

### The initial tab

All switchers have a initial tab by default(tab/cycle switchers are `null`, boolean switchers are `false`). When doing switch-back or reset, the current tab would be set to the initial one. You can use the `initTab` parameter to change the initial tab when create a switcher.

    const ts = new TabSwitcher({ initTab: 'a' })
    ts.getTab() // 'a'
    const cs = new CycleSwitcher({ tabs: ['a', 'b', 'c'], initTab: 'a' })
    cs.getTab() // 'a'
    const bs = new BooleanSwitcher({ initTab: true })
    bs.getTab() // true

## Test

    npm test

## Authors

Sibevin Wang

## Copyright

Copyright (c) 2019 Sibevin Wang. Released under the MIT license.
