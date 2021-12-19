#!/bin/bash

for f in public/movies/*.webm;
do ffmpeg -i "$f" -ss 1 -vframes 1 -f image2 "${f%.webm}.webp";
done