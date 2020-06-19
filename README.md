# Gnometown(https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)

Gnometown made with React Hooks + Redux and Parcel.


- **React Hooks:** to define all styled components
- **Redux:** in order to create a store to locate all gnomes and filter settings
- **Testing:** made with react testing library (unit, integration, snapshots, e2e)

## Installation

- npm install

## build

- npm run start

## Unitary Test 

- npm run test 

## E2E Test 

- npm run cypress


## Components

All components haves their own test. Unit, Integration and Snapshot.
Also commented its functionality in test file.
PropTypes included and default props.

## User Stories

User can load and view all data from url.
User can apply filters to data (job, name, age)
User can change page to view more gnomes

## Dev Dependencies

- **React Testing Library:** to test React Hooks Redux (unit testing and integration tests)
- **cypress:** to test React Hooks Redux (end to end tests)
- **Enzyme:** to test some components using shallow, mount & render
- **Prettier:** to make styled code in a beautiful way