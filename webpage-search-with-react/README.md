# Webpage Search With React

This small app shows how easy it is to get started with the Aquifer API.

There are two components to it:
1. Backend API proxy
2. Frontend React client

[Demo video](https://cdn.aquifer.bible/training/webpage-search-with-react-demo.mp4)

## Notes on backend API proxy

The backend proxy will forward all requests to the Aquifer API, injecting the API key configured in your environment. This proxy demonstrates the intended usage of the API, as a server-to-server call, rather than a client-to-server call. In other words, an Aquifer API key is meant to only be visible on your backend and shouldn't be shipped with the client. The Aquifer API's restrictive CORS policy ensures this.

## Install dependencies

`pushd backend && yarn install && popd`

`pushd frontend && yarn install && popd`

## Setup your environment

`cp backend/.env.template backend/.env`

Open `backend/.env` and set your Aquifer API key.

## Run

`cd backend && yarn dev`

`cd frontend && yarn dev`

## Open in browser

Navigate to `http://localhost:5173` in your browser.
