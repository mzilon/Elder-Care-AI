#!/bin/bash

#Start companion service
echo "Starting companion Service"
cd /home/pi/Desktop/alexa-avs-sample-app/samples
cd companionService && npm start&


#Run the sample app
echo "Starting sample app."
cd /home/pi/Desktop/alexa-avs-sample-app/samples
cd javaclient && mvn exec:exec&

read -n1 -r -p "Press space to continue..." key

#Run the Wake Word Engine
cd /home/pi/Desktop/alexa-avs-sample-app/samples
cd wakeWordAgent/src && ./wakeWordAgent -e kitt_ai &
