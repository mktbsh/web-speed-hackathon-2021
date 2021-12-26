#!/bin/bash

for f in public/images/profiles/*.webp;
do ffmpeg -y -i "$f" -vf "scale=-1:72" "${f%.webp}.min.webp";
done