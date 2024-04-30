#!/bin/bash

pushd web/SmallBlind
docker compose up -d
popd

pushd web/santa-list-without-writeup/
docker compose up -d
popd

pushd web/christmasTicketChallenge/src/
docker compose up -d
popd

pushd web/truncator/
docker compose up -d
popd
