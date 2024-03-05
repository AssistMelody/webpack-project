#!/bin/bash

cross-env MOCK_DATA=$1 npx webpack server --config=./webpack.config.dev.js