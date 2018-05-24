#!/bin/bash

echo "Starting Companion Service"
cd /home/pi/Desktop/alexa-avs-sample-app/samples/
cd companionService && npm start&
echo "Starting Companion Service" > nala_startup.out

sleep 8

echo "Starting Javaclient"
cd /home/pi/Desktop/alexa-avs-sample-app/samples/
cd javaclient && mvn exec:exec&
echo "Starting Javaclient" >> nala_startup.out

sleep 28

#aplay /home/pi/Hello.wav

#sudo /home/pi/display16x32/bootLED.sh

#sleep 2

echo "Starting Wake Word Agent KITT-AI"
cd /home/pi/Desktop/alexa-avs-sample-app/samples/
cd wakeWordAgent/src && ./wakeWordAgent -e kitt_ai&
echo "Starting Wake Word Agent KITT-AI" >> nala_startup.out

aplay /home/pi/Hello.wav


sudo /home/pi/display16x32/bootLED.sh
