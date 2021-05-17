# Taktile Frontend Challenge
The goal of this demo is to allow users to easily label transaction data. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technologies
This project was created with:
* React version: ^17.0
* [React Infinite Scroller](https://www.npmjs.com/package/react-infinite-scroller): ^1.2
* [FAST API](https://fastapi.tiangolo.com): ^0.65


## Running the App
1. In the 'backend' directory, use a Docker container following the steps listed in the [FAST API documentation](https://fastapi.tiangolo.com/deployment/docker/).
2. Launch the frontend from the 'frontend' directory with `npm run start`. Use `npm install` for initial installation.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes
Future roadmap would include:
1. Custom hooks
2. Click away to close modal
3. Label editing component placed directly under transaction tags for faster UX
4. Loading spinner
5. Transaction sorting, filtering
6. Testing