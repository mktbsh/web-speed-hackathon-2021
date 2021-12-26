#!/bin/bash

for f in public/images/*.webp;
do ffmpeg -y -i "$f" -vf "scale=574:-1" "${f%.webp}.v2.webp";
done