# Modelador UML
[![build status][build-image]][build-url]
[![javascript style guide][standard-image]][standard-url]

[build-image]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge
[build-url]: https://github.com/crfloresc/modelador-uml/actions
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge
[standard-url]: https://standardjs.com

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## First of all

If you add some obscure code to this or any other app, even if it has only the teeniest chance of being less blindingly obvious to someone else than it is to you at the time of writing, please please please add a comment.

## Frontend technologies stack

- JavaScript
- [React.js](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/react-redux)
- [Redux-Saga](https://github.com/redux-saga/redux-saga)
- [Webpack 5](https://webpack.js.org)
- [Auth0](https://auth0.com)
- [Babel 7](https://babeljs.io/docs/en/)
- [Material UI](https://material-ui.com)

## System requirements

- [**Node.js** v10.19+](https://nodejs.org/en/)
- [**npm** v6.14.8+](https://www.npmjs.com)

## Installation

```bash
# 1. Install the required dependencies
npm i or npm install

# 2. Start the frontend app
npm start or npm run dev
```

## Common

Look at the common terms:
- Items -> are elements, associations and misc.
- Elements -> only are entity, control, boundary and actor.
- Associations -> only are association with and without navigavility.

## Structure

- **/src/config**: contains everything related to environment variables and adjustable parameters (such as subheader, navbar, etc.)
- **/src/layout**: main source, divided into components and subcomponents ***(see Advance React and React Hooks)***
- **/src/providers**: contains a way to pass data through the component tree without having to pass props down manually at every level ***(see React Context)***
- **/src/services**: contains everything related to the storage of the application state, middleware validations and actions to interact with resources outside of itself asynchronously ***(see Redux and Redux-Saga)***
- **/src/shared**: contains assets, data, ids, constants, custom hooks shared by the entire application ***(see React Hooks)***

## Folder hierarchy

### **/src/layout**
```
src/
├── layout/
|   ├── __test__/
│   │   └── <a-lot-of-testing-files>.jsx
│   ├── <main-component>/
│   │   ├── components/
│   │   |   ├── <a-lot-of-subcomponents>.jsx
│   │   |   └── index.js
│   │   ├── styles/
│   │   |   ├── <a-lot-of-styles>.js
│   │   |   └── index.js
│   │   ├── index.js
│   │   └── Container.jsx
│   ├── App.jsx
│   ├── layouts.js
│   ├── scheme.js
│   └── theme.js
```

### **/src/providers**
```
src/
├── providers/
|   ├── <custom-provider>/
│   │   ├── Context.jsx
│   │   ├── index.js
│   │   ├── Provider.jsx
│   │   └── with.js
│   └── index.js
```

### **/src/services**
```
src/
├── services/
|   ├── <custom-service>/
│   │   ├── actions.js
│   │   ├── actionsTypes.js
│   │   ├── api.js
│   │   ├── middleware.js
│   │   ├── reducer.js
│   │   └── saga.js
│   ├── middleware.js
│   ├── reducer.js
│   ├── saga.js
│   └── store.js
```

### **/src/shared**
```
src/
├── shared/
|   ├── assets/
│   │   └── <a-lot-of-assets-files>.svg
│   ├── constants/
│   │   └── <a-lot-of-constant-files>.js
│   ├── hooks/
│   │   └── <a-lot-of-custom-hook-files>.js
│   ├── libs/
│   │   └── <a-lot-of-legacy-lib-files>.js
```

## How to modify?

### 1. I want to modify subheader and navbar items

Go to **/src/config** and edit ***tabs.js*** for subheader items and ***nav.js*** for navbar items. After that add new navbar index in ***config.js*** e.g. *3: nav3*.

For modify actions in navbar go to **/src/layout/services/ui/middleware.js** and add his action in **case T.CHANGE_ACTIVE_NAVITEM** it is obligatory. In case of subheader it add actions automatic, when you set nav index in ***config.js***.

If your navbar item contains a menu, then you need to add his action in **case T.CHANGE_NAV_MENU_ITEM_ID**.

### 2. I want to modify modals

Go to **/src/config** and edit ***modal.js*** for modal items.

For open a modal use ***setModal*** of ui service.

e.g.
```js
config.modal?.forEach(({ parent, type, data }) => {
  if (parent?.includes(navItemId)) {
    dispatch(setModal({ id: parent, open: true, type, data }));
  }
});
```

For add approve action, go to **src/services/ui/saga.js** and edit file to add your action.

### 3. I want to add new service

It's obligatory have in new service folder the following: ***actions.js***, ***actionsTypes.js*** and ***reducer.js***.

In **src/services/reducer.js** import and add in export your reducer service.

If your service have middleware or saga you need do extra stuffs, in **src/services/middleware.js** export your middleware service and in **src/services/saga.js** import and add in export your sagas service. After all, in **src/services/store.js** import your middlewares and apply on ***storeEnhancers(applyMiddleware(...))*** your middleware.

### 4. Modern js methods don't work in some browsers.

You need add a polyfill in **src/polyfill.js**, it is code that implements a feature on web browsers that do not support the feature. ***(see What is polyfills in Learn More)***

### 5. I want to add a new route

Go to **src/index.js** and add new route.

### 6. I want to modify api config

Go head to **src/config/api.js** or **src/services/api/base.js** and modify what you want.

### 7. I want to add new provider

It's obligatory have in new provider folder the following: ***Context.jsx***, ***Provider.jsx*** and ***index.js***.

In **src/providers/<your_new_provider>/index.js** export your ***Context.jsx*** and ***Provider.jsx***, after that, in **src/providers/index.js** export your provider.

Now, import your ***Context.jsx*** in **src/layout/common/ProvidersContainer.jsx**.

### 8. I want to custom my import or add new absolute import

Modify **.babelrc**, **jsconfig.js** and **webpack.common.js** in root. ***(See Absolute Imports)***

### 9. I don't understand

Please, see all items in **Learn More** section 

## Recommendations

Strong understood of Advanced React such as:
- [React Router](https://reactrouter.com/web/guides/quick-start).
- [React Context/Provider](https://reactjs.org/docs/context.html).
- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html).
- [React Forwarding Refs](https://reactjs.org/docs/forwarding-refs.html).
- [React Fragments](https://reactjs.org/docs/fragments.html).

Strong understood of Hooks such as:
- useCallback
- useEffect
- useRef

Strong understood of Redux.

Strong understood of Saga such as:
- [Declarative Effects](https://redux-saga.js.org/docs/basics/DeclarativeEffects).
- [Dispatching actions](https://redux-saga.js.org/docs/basics/DispatchingActions).
- [Error handling](https://redux-saga.js.org/docs/basics/ErrorHandling).
- [Root Saga Patterns](https://redux-saga.js.org/docs/advanced/RootSaga).
- [Running Tasks In Parallel](https://redux-saga.js.org/docs/advanced/RunningTasksInParallel).

### Useful Sources

[CSDN (tutorials any kind)](https://www.csdn.net/?spm=1003.2020.3001.4476).

### Search specific text in files

```bash
grep -iRl "textToSearch" ./src/
```

## License

This project is unlicensed.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Fast React introduction in [React Redux](https://medium.com/react-redux/introducción-a-redux-js-8bdf4fe0751e).

What is [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)?.

[Absolute imports](https://nimblewebdeveloper.com/blog/absolute-alias-imports-in-javascript-vscode).

[Use React-Redux in Hooks](https://react-redux.js.org/api/hooks).

[React Hooks (useEffect, useCallback, useMemo)](https://dev.to/devcord/react-hooks-useeffect-usecallback-usememo-3o42).

Polling in React using the [useInterval](https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197) Custom Hook.

[React JS— Architecture + Features + Folder structure + Design Pattern](https://saurabhshah23.medium.com/react-js-architecture-features-folder-structure-design-pattern-70b7b9103f22).

[How to Advanced Webpack 5 - Setup Tutorial](https://www.robinwieruch.de/webpack-advanced-setup-tutorial).

[React: Login](https://auth0.com/docs/quickstart/spa/react/01-login).

[Getting Size and Position of an Element in React](https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/).

[Webpack: Lazy Loading](https://webpack.js.org/guides/lazy-loading/).

[React with Factory Pattern](https://blog.bitsrc.io/react-js-with-factory-pattern-building-complex-ui-with-ease-fe6db29ab1c1).

[React Factory Pattern](https://gist.github.com/Zacaria/39ff1278fe423b22bd3b25f0f1ebc6ce).

[React v17 Component types](https://medium.com/react-courses/react-component-types-functional-class-and-exotic-factory-components-for-javascript-1a098a49a831).

[Webpack Setup for React](https://medium.com/swlh/a-complete-webpack-setup-for-react-e56a2edf78ae).

[React Starter Kit](https://github.com/kriasoft/react-starter-kit).

[Fix duplicate SVG ID collision in React](https://medium.com/pixel-and-ink/fix-duplicate-svg-id-collision-in-react-36bc9e068333).

[React Interactive SVG](https://codepen.io/nasrullahs/pen/edwPyL).

[Code Splitting](https://reactrouter.com/web/guides/code-splitting).

[SVG example](https://gist.github.com/joshblack/de18d5624d2f709bff6f).

[Example Selection Rectangle](https://jsfiddle.net/lannymcnie/gg8sv4cq/).

[Example Selection Rectangle](http://jsfiddle.net/jLqHv/).

[Build a Portfolio Website With React & Sanity.io](https://www.youtube.com/watch?v=NO7_jgzVgbc).

[How to better organize your React applications?](https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1).

[What is a Redux selector?](https://medium.com/@matthew.holman/what-is-a-redux-selector-a517acee1fe8).

[Material UI Header Component](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/blog/Header.js).

[Example Bank Client](https://github.com/pietrzakadrian/bank-client).

[Example EZDocs](https://github.com/asoomar/EZDocs).

[useFetch](https://itnext.io/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind-1d3ba9250e0).

[Auto Effect Pattern with Redux and React Hooks](https://tech.ebayinc.com/engineering/auto-effect-pattern-with-redux-and-react-hooks/).

[How To Call Web APIs with the useEffect Hook in React](https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react).

[Sagas vs Thunk](https://www.paradigmadigital.com/dev/sagas-vs-thunk/).

[Building a resizable React component using custom React Hooks](https://blog.logrocket.com/building-resizable-react-component-using-custom-react-hooks/).

[Feature Flags](https://medium.com/@dehora/feature-flags-smaller-better-faster-software-development-f2eab58df0f9).

[Example React Redux Chat App](https://github.com/bulicmatko/react-redux-chat-app/blob/master/src/middleware/socket.middleware.js).

[Material Design with ReactJS using Material UI](https://uxdesign.cc/material-design-with-reactjs-using-material-ui-9f7e81a955f7).

[Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes).

[Redux Immutable Data Modification Patterns](https://medium.com/dailyjs/redux-immutable-data-modification-patterns-614ff394da7f).

[Redux immutable update patterns](https://blog.logrocket.com/redux-immutable-update-patterns/).

[Immutability in React and Redux](https://daveceddia.com/react-redux-immutability-guide/).

[Example 403 Forbidden Page Bootstrap](https://codepen.io/amirzuhdiwibowo/pen/pVKRve).

[Example Socket.io React Hooks Chat](https://github.com/pixochi/socket.io-react-hooks-chat).

[Build a Real-Time Chat App With React Hooks and Socket.io](https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0).

[42 Realtime Examples](https://react.rocks/tag/Realtime).

[Example How to create a realtime app using Socket.io, React, Node & MongoDB](https://www.freecodecamp.org/news/how-to-create-a-realtime-app-using-socket-io-react-node-mongodb-a10c4a1ab676/).

[Example Canvas Draw](https://gist.github.com/ChrisDobby/c6a78efd2e40db587333a761320623c7).

[Example Canvas](https://gist.github.com/JobLeonard/987731e86b473d42cd1885e70eed616a).

[Example React Rnd](https://github.com/bokuweb/react-rnd).

[How to test React-Redux connected Components](https://www.robinwieruch.de/react-connected-component-test).

[CRUD utilizando Redux - ReactJS](https://ed.team/comunidad/crud-utilizando-redux-reactjs).

[Example Redux CRUD](https://github.com/rhaegarcode/redux-crud/tree/master/src).

[How to CRUD using React/Redux/Redux Sagas?](https://medium.com/@daravind/how-to-crud-using-react-redux-redux-sagas-cdef5d49e972).

[Handling asynchronous requests in react using redux-saga, building full CRUD app](https://mushti-dev.medium.com/handling-asynchronous-requests-in-react-using-redux-saga-building-full-crud-app-dff2a3c13f6b).

[Example React Redux CRUD](https://github.com/maprihoda/react-redux-crud/blob/master/client/src/sagas/posts/update.js).

[How to update single value inside specific array item in redux](https://stackoverflow.com/questions/35628774/how-to-update-single-value-inside-specific-array-item-in-redux).

[7 Tips to Handle undefined in JavaScript](https://dmitripavlutin.com/7-tips-to-handle-undefined-in-javascript/).

[Introduction to useRef Hook](https://dev.to/dinhhuyams/introduction-to-useref-hook-3m7n).

[Data fetching in React](https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/).

[How To Share State Across React Components with Context](https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context).

[Why do I need Keys in React Lists?](https://adhithiravi.medium.com/why-do-i-need-keys-in-react-lists-dbb522188bbb).

[Redux Setup for Your React App](https://betterprogramming.pub/redux-setup-for-your-react-app-d003ec03aedf).

[The only introduction to Redux (and React-Redux) you’ll ever need](https://javascript.plainenglish.io/the-only-introduction-to-redux-and-react-redux-youll-ever-need-8ce5da9e53c6).

[Lifecycle methods with ReactJS hooks](https://medium.com/@KMalazarte/lifecycle-methods-with-reactjs-hooks-9126d6d535c5).

[Using Redux with React Hooks](https://thoughtbot.com/blog/using-redux-with-react-hooks).

[React Redux with hooks](https://dev.to/jenkens/react-redux-with-hooks-2ie1).

[Beginner's Guide to React Redux](https://dev.to/jenkens/beginner-s-guide-to-react-redux-585e).

[React Redux Tutorial](https://www.valentinog.com/blog/redux/).

[How to correctly use preventDefault(), stopPropagation(), or return false; on events](https://medium.com/@jacobwarduk/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb).

[A Simple Guide to Error Boundaries in React](https://www.digitalocean.com/community/tutorials/react-error-boundaries).

[How To Fetch Data From an API With React Hooks](https://betterprogramming.pub/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd).

[Example React Starter 2020](https://github.com/androidfanatic/react-starter-2020).

[How to deploy a React app to Firebase using GitHub Actions](https://levelup.gitconnected.com/how-to-deploy-a-react-app-to-firebase-using-github-actions-step-by-step-11367e0627d5).

[How to deploy a create-react-app with github-actions](https://cmichel.medium.com/how-to-deploy-a-create-react-app-with-github-actions-5e01f7a7b6b).

[Example Material UI X](https://github.com/mui-org/material-ui-x).

[Example Material UI Confirm](https://github.com/jonatanklosko/material-ui-confirm).

[Create responsive drawer menu with React + Material-UI](https://medium.com/@tsubasakondo_36683/create-responsive-drawer-menu-with-react-material-ui-617a42764b69).

[How To Master Advanced React Design Patterns — Compound Components](https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823).

[Example React Hook Konva](https://github.com/Drasky-Vanderhoff/react-hook-konva).

[Example React Hook Konva](https://github.com/alexdunne/react-konva-hooks-demo).

[Building a Complex UI Animation in React](https://css-tricks.com/building-a-complex-ui-animation-in-react-simply/).

[An alternative to dangerously set innerHTML](https://remarkablemark.medium.com/an-alternative-to-dangerously-set-innerhtml-64a12a7c1f96).

[Example React Diagrams](https://github.com/projectstorm/react-diagrams).

[A rectangle react component which can be resized and rotated](https://reactjsexample.com/a-rectangle-react-component-which-can-be-resized-and-rotated/).

[Material UI — Grids](https://codeburst.io/material-ui-grids-91508da0d432).

[Using React Hooks with Canvas](https://itnext.io/using-react-hooks-with-canvas-f188d6e416c0).

[https://rossbulat.medium.com/working-with-svgs-in-react-d09d1602a219](https://rossbulat.medium.com/working-with-svgs-in-react-d09d1602a219).

[PRPL pattern: Solutions for modern web app optimization](https://blog.logrocket.com/prpl-pattern-solutions-for-modern-web-app-optimization/).

[How to use SVGs in React](https://blog.logrocket.com/how-to-use-svgs-in-react/).

[Finding the absolute positions of react components](https://medium.com/@chung.andrew7/finding-the-absolute-positions-of-react-components-fda1c5bc9ab).

[Detecting double clicks using React hooks](https://simbathesailor007.medium.com/double-click-using-react-hooks-4fea2292d3a4).

[https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835](https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835).

[React Hooks: UseEffect, UseCallback, UseMemo](https://dev.to/devcord/react-hooks-useeffect-usecallback-usememo-3o42).

[Pointer Events in React](https://betterprogramming.pub/pointer-events-with-react-the-why-how-what-617a5b51dbb2).

[Replacing Lifecycle methods with React Hooks](https://javascript.plainenglish.io/lifecycle-methods-substitute-with-react-hooks-b173073052a#:~:text=getDerivedStateFromProps(%20),or%20null%20to%20update%20nothing.).

[Stateful vs. Stateless React Components](https://medium.com/@cgcrutch18/stateful-vs-stateless-react-components-13f647f7fc4).

[The Best Way to Import SVGs in React](https://betterprogramming.pub/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9).

[Example React SVG Pan Zoom](https://github.com/chrvadala/react-svg-pan-zoom).

[Example useMousePosition](https://gist.github.com/whoisryosuke/99f23c9957d90e8cc3eb7689ffa5757c).

[Example Pitch Zoom Pan](https://gist.github.com/iammerrick/c4bbac856222d65d3a11dad1c42bdcca).

[Passing Data Between React Components](https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf).

[What is “Props” and how to use it in React?](https://itnext.io/what-is-props-and-how-to-use-it-in-react-da307f500da0).