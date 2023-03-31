#!/bin/sh

echo "Waiting for DB to start..."
./wait-for db:5432 

echo "Starting the WTTT server..."
# "exec" is here to replace the current bash script's process with the node's process.
# Otherwise interupts like SIGINT might not make it through to the node process.
exec npm run dev
