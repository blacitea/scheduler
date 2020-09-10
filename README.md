# Interview Scheduler <div style="text-align: right"> <img src="https://img.shields.io/github/last-commit/blacitea/scheduler?style=flat-square" alt="Activity"> &nbsp; <img src="https://img.shields.io/netlify/2793a41d-0f44-48bf-a089-b81341630ebf?style=flat-square" alt="Build"> </div>

<br/>

## Description

Interactive SPA built with React where user can Browse, Read, Edit, Add and Delete interview appointments. Requests are made to an API server allows persist information.

Application is deployed on Netlify and can be visited [HERE](https://dazzling-kalam-f952d0.netlify.app/)

Database is deployed on [Heruko](www.heroku.com)

<br/>
<br/>

> ### Browse & Add
>
> ![Browse & Create](https://raw.githubusercontent.com/blacitea/scheduler/master/public/gif/create_appointment.gif)

<br/>

> ### Read & Edit
>
> ![Select & Edit](https://raw.githubusercontent.com/blacitea/scheduler/master/public/gif/edit_appointment.gif)

<br/>

> ### Confirm & Delete
>
> ![User confirm & Delete](https://raw.githubusercontent.com/blacitea/scheduler/master/public/gif/delete_appointment.gif)

> ### Websocket
>
> ![Update auto push to all clients](https://raw.githubusercontent.com/blacitea/scheduler/master/public/gif/websocket_push_to_clients.gif)

<br>
<br>

## Setup

Install dependencies with `npm install`.

> ### Important
>
> This application require an API server to function properly
>
> Please visit [Scheduler-api](https://github.com/blacitea/scheduler-api) and follow the [README](https://github.com/blacitea/scheduler-api/blob/master/README.md) to ensure API server up and running to proceed

<br/>

### NPM command scripts

**_API server MUST be up and running for axios request_**

<br/>

- Running Webpack Development Server

  ```sh
  npm start
  ```

- Running Jest Test Framework

  Create file `.env.test` by copying `.env.development` to provide test environment variables

  ```sh
  cp .env.development .env.test
  npm test
  ```

- Running Storybook Visual Testbed

  ```sh
  npm run storybook
  ```

- Running Cypress E2E Test

  1. Run script for API testing server ( scheduler-api)

     ```sh
     npm run test:server
     ```

  2. Run script for Cypress test ( scheduler)

     ```sh
     npm run cypress
     ```

## Dependencies

- axios : ^0.20.0
- prop-types : ^15.7.2
- react-hooks-testing-library : ^0.6.0
- react-test-renderer : ^16.13.1
- cypress
