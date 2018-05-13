#!/usr/bin/env bash
mongoimport --db fe-components --collection customers --file ./customers.json --jsonArray
