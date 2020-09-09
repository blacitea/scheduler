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
> ![Update auto push to all clients](https://raw.githubusercontent.com/blacitea/scheduler/master/public/gif/websocket_stretch.gif)

<br>
<br>

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress E2E Test

```sh
npm run cypress
```

## Dependencies

- axios : ^0.20.0
- prop-types : ^15.7.2
- react-hooks-testing-library : ^0.6.0
- react-test-renderer : ^16.13.1
