# React back-office

This repository contains a back-office user management system built using React, Vite, Firebase.
The system allows to manage users fake online REST API called ReqRes.

## DEMO

[React Back-Office](https://react-back-office-geovanesantana.vercel.app/)

## Development

Make sure you add the env vars in `.env` file. Just copy the `.env.example` file.

```bash
# Install dependencies
$ yarn

# Run the project
$ yarn dev

# The server will initialize in the <http://localhost:3000>
```

## Setting up Firebase for Cypress

This project use [Cypress](https://www.cypress.io/) for our end-to-end testing, with the [cypress-firebase](https://github.com/prescottprue/cypress-firebase) plugin to help Cypress talk to Firebase. In addition to the Firebase tools installed above, you will need a Firebase service account for end-to-end testing in Cypress.

1. Go to the service accounts section of the Firebase project settings.
2. In the "Firebase Admin SDK" section, click the "Generate new private key" button. Then click "Generate key" on the dialog.
3. It will download a JSON file. Copy this into the root of your local copy of the repo and rename it to `serviceAccount.json`.
4. Make sure you add the env vars in `cypress.env.json` file. Just copy the `cypress.env.example.json` file.

```sh
# end-to-end tests
yarn test
```

## Running with Docker Compose

Alternatively, you can run the project using Docker Compose.

1. Make sure you have Docker and Docker Compose installed on your machine.

```sh
# build the Docker images
docker-compose build

# Start the project using Docker Compose:
docker-compose up
```
