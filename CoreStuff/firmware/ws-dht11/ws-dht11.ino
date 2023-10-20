/*
*  Security Alarm
*  CGS Semester 2
*  Task 2
*  Author: Phoenix, ObjectivistApe
*/

#include <math.h>
#include <WiFi.h>
#include <aREST.h>
#include <future>
#include <string>

#define Movement 17
#define Trigger 13
#define Echo 12

#define Alarm1 21
#define Alarm2 22
#define Alarm3 23
#define Inbuilt 2
#define RGB1_red 32
#define RGB1_green 15
#define RGB1_blue 4
#define RGB2_red 33
#define RGB2_green 25
#define RGB2_blue 26
// Create aREST instance
aREST rest = aREST();



// WiFi parameters
const char* ssid = "C001R@V3G@m35";

int RGB1[3] = { RGB1_red, RGB1_green, RGB1_blue };
int RGB2[3] = { RGB2_red, RGB2_green, RGB2_blue };
int Alarm[3] = { Alarm1, Alarm2, Alarm3 };

//Static IP address configuration
// P connections 
#define LISTEN_PORT 80

// Create an instance of the server
WiFiServer server(LISTEN_PORT);

// Variables to be exposed to the API
bool movement = false;
bool BuzzerAuto = false;
bool BuzzerStatus = false;
bool InbuiltAuto = true;
bool RGB1Auto = true;
bool RGB2Auto = true;
bool VAAuto = true;
bool VAActive = false;

int AlarmPitch = 50;

float timeTotal = 0;
float average = 0;
int timesIndex = 0;
bool coldMovement = false;

void setup(void)
{
  for (int i = 0; i < 3; i++) {
    pinMode(Alarm[i], OUTPUT);
    tone(Alarm[i], 50);
    noTone(Alarm[i]);
  }
  pinMode(Inbuilt, OUTPUT);
  analogWrite(Inbuilt, 255);
  for (int i = 0; i < 3; i++) {
    pinMode(RGB1[i], OUTPUT);
    pinMode(RGB2[i], OUTPUT);
  }
  setRGB(0, 255, 0, RGB1);
  setRGB(0, 255, 0, RGB2);
  // Start Serial
  Serial.begin(2000000);

  pinMode(Movement, INPUT);
  pinMode(Trigger, OUTPUT);
  pinMode(Echo, INPUT);
  
  // Init variables and expose them to REST API
  rest.variable("movement",&movement);
  rest.variable("Average",&average);
  rest.variable("ColdMovement",&coldMovement);


  rest.variable("BuzzerStatus",&BuzzerAuto);
  rest.variable("BuzzerStatus",&BuzzerStatus);
  rest.variable("InbuiltAuto",&InbuiltAuto);
  rest.variable("RGB1Auto",&RGB1Auto);
  rest.variable("RGB2Auto",&RGB2Auto);
  rest.variable("VAAuto",&VAAuto);
  rest.variable("VAActive",&VAActive);


  rest.function("update",update);
    
  // Give name and ID to device
  rest.set_id("142");
  rest.set_name("CoolRaVEGames");

  // Connect to WiFi
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, "", 1, 0, 1, 2);

  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
  
  // Print the IP address
  Serial.println(WiFi.softAPIP());
}

void loop() {
  WiFiClient client = server.available();
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trigger, LOW);
  float time = pulseIn(Echo, HIGH);
  timeTotal += time;
  coldMovement = (average - time > 100) ? true : coldMovement;
  timesIndex += 1;
  if (!movement && digitalRead(Movement)) {
    movement = digitalRead(Movement);
    if (VAAuto) {
      if (RGB1Auto) {
        setRGB(255, 0, 0, RGB1);
      }
      if (RGB2Auto) {
        setRGB(255, 0, 0, RGB2);
      }
      if (InbuiltAuto) {
        analogWrite(Inbuilt, 255);
      }
      if (BuzzerAuto) {
        AlarmPitch += AlarmPitch/5;
        for (int i = 0; i < 3; i++) {
          tone(Alarm[i], AlarmPitch);
        }
        if (AlarmPitch > 5000) {
          AlarmPitch = 50;
        }
      }
    }
  } else if (!movement) {
    if (VAAuto) {
      // if moving closer at significant speed
      if (average - time > 100) {
        if (RGB1Auto) {
          setRGB(0, 0, 255, RGB1);
        }
        if (RGB2Auto) {
          setRGB(0, 0, 255, RGB2);
        }
        if (InbuiltAuto) {
          analogWrite(Inbuilt, 0);
        }
      } else {
        if (RGB1Auto) {
          setRGB(0, 0, 0, RGB1);
        }
        if (RGB2Auto) {
          setRGB(0, 0, 0, RGB2);
        }
        if (InbuiltAuto) {
          analogWrite(Inbuilt, 0);
        }
      }
      if (BuzzerAuto) {
        for (int i = 0; i < 3; i++) {
          noTone(Alarm[i]);
        }
      }
    }
  }
  if (VAActive && !VAAuto) {
    if (RGB1Auto) {
      setRGB(255, 0, 0, RGB1);
    }
    if (RGB2Auto) {
      setRGB(255, 0, 0, RGB2);
    }
    if (InbuiltAuto) {
      analogWrite(Inbuilt, 255);
    }
    if (BuzzerAuto) {
      AlarmPitch += AlarmPitch/5;
      for (int i = 0; i < 3; i++) {
        tone(Alarm[i], AlarmPitch);
      }
      if (AlarmPitch > 5000) {
        AlarmPitch = 50;
      }
    }
  } else if (!VAAuto) {
    if (RGB1Auto) {
      setRGB(0, 0, 0, RGB1);
    }
    if (RGB2Auto) {
      setRGB(0, 0, 0, RGB2);
    }
    if (InbuiltAuto) {
      analogWrite(Inbuilt, 0);
    }
    if (BuzzerAuto) {
      for (int i = 0; i < 3; i++) {
        noTone(Alarm[i]);
      }
    }
  }
  
  // Handle REST calls
  if (!client) {
    return;
  }
  while (!client.available()){

  }
  average = timeTotal/timesIndex;
  rest.handle(client);
  movement = false;
  timeTotal = 0;
  timesIndex = 0;
  coldMovement = false;
}

void setRGB(int R, int G, int B, int light[]) {
  analogWrite(light[0], R);
  analogWrite(light[1], G);
  analogWrite(light[2], B);
}

int update(String update) {
  bool m = movement;
  int t = timesIndex;
  float tt = timeTotal;
  bool cm = coldMovement;
  Serial.println(update);
  BuzzerAuto = ((update.indexOf("\"BuzzerAuto\":true") >= 0) ? true : ((update.indexOf("\"BuzzerAuto\":false") >= 0) ? false : NULL));
  InbuiltAuto = ((update.indexOf("\"InbuiltAuto\":true") >= 0) ? true : ((update.indexOf("\"InbuiltAuto\":false") >= 0) ? false : NULL));
  RGB1Auto = ((update.indexOf("\"RGB1Auto\":true") >= 0) ? true : ((update.indexOf("\"RGB1Auto\":false") >= 0) ? false : NULL));
  RGB2Auto = ((update.indexOf("\"RGB2Auto\":true") >= 0) ? true : ((update.indexOf("\"RGB2Auto\":false") >= 0) ? false : NULL));
  VAAuto = ((update.indexOf("\"VAAuto\":true") >= 0) ? true : ((update.indexOf("\"VAAuto\":false") >= 0) ? false : NULL));
  if (!BuzzerAuto) {
    if (((update.indexOf("\"BuzzerStatus\":true") >= 0) ? true : ((update.indexOf("\"BuzzerStatus\":false") >= 0) ? false : NULL))) {
      for (int i = 0; i < 3; i++) {
        tone(Alarm[i], ((update[update.indexOf("\"Buzzer\":") + 9] == ',' || update[update.indexOf("\"Buzzer\":") + 9] == '}') ? (update[update.indexOf("\"Buzzer\":") + 8] - '0') : ((update[update.indexOf("\"Buzzer\":") + 10] == ',' || update[update.indexOf("\"Buzzer\":") + 10] == '}') ? ((update[update.indexOf("\"Buzzer\":") + 8] - '0') * 10 + (update[update.indexOf("\"Buzzer\":") + 9] - '0')) : (update[update.indexOf("\"Buzzer\":") + 8] - '0') * 100 + (update[update.indexOf("\"Buzzer\":") + 9] - '0') * 10 + (update[update.indexOf("\"Buzzer\":") + 10] - '0'))));
      }
    } else {
      for (int i = 0; i < 3; i++) {
        noTone(Alarm[i]);
      }
    }
  }
  if (!InbuiltAuto) {
    analogWrite(Inbuilt, ((update[update.indexOf("\"InbuiltBrightness\":") + 21] == ',' || update[update.indexOf("\"InbuiltBrightness\":") + 21] == '}') ? (update[update.indexOf("\"InbuiltBrightness\":") + 20] - '0') : ((update[update.indexOf("\"InbuiltBrightness\":") + 22] == ',' || update[update.indexOf("\"InbuiltBrightness\":") + 22] == '}') ? ((update[update.indexOf("\"InbuiltBrightness\":") + 20] - '0') * 10 + (update[update.indexOf("\"InbuiltBrightness\":") + 21] - '0')) : (update[update.indexOf("\"InbuiltBrightness\":") + 20] - '0') * 100 + (update[update.indexOf("\"InbuiltBrightness\":") + 21] - '0') * 10 + (update[update.indexOf("\"InbuiltBrightness\":") + 22] - '0'))));
  }
  if (!RGB1Auto) {
    setRGB(((update[update.indexOf("\"Red1Brightness\":") + 18] == ',' || update[update.indexOf("\"Red1Brightness\":") + 18] == '}') ? (update[update.indexOf("\"Red1Brightness\":") + 17] - '0') : ((update[update.indexOf("\"Red1Brightness\":") + 19] == ',' || update[update.indexOf("\"Red1Brightness\":") + 19] == '}') ? ((update[update.indexOf("\"Red1Brightness\":") + 17] - '0') * 10 + (update[update.indexOf("\"Red1Brightness\":") + 18] - '0')) : (update[update.indexOf("\"Red1Brightness\":") + 17] - '0') * 100 + (update[update.indexOf("\"Red1Brightness\":") + 18] - '0') * 10 + (update[update.indexOf("\"Red1Brightness\":") + 19] - '0'))), ((update[update.indexOf("\"Green1Brightness\":") + 20] == ',' || update[update.indexOf("\"Green1Brightness\":") + 20] == '}') ? (update[update.indexOf("\"Green1Brightness\":") + 19] - '0') : ((update[update.indexOf("\"Green1Brightness\":") + 21] == ',' || update[update.indexOf("\"Green1Brightness\":") + 21] == '}') ? ((update[update.indexOf("\"Green1Brightness\":") + 19] - '0') * 10 + (update[update.indexOf("\"Green1Brightness\":") + 20] - '0')) : (update[update.indexOf("\"Green1Brightness\":") + 19] - '0') * 100 + (update[update.indexOf("\"Green1Brightness\":") + 20] - '0') * 10 + (update[update.indexOf("\"Green1Brightness\":") + 21] - '0'))), ((update[update.indexOf("\"Blue1Brightness\":") + 19] == ',' || update[update.indexOf("\"Blue1Brightness\":") + 19] == '}') ? (update[update.indexOf("\"Blue1Brightness\":") + 18] - '0') : ((update[update.indexOf("\"Blue1Brightness\":") + 20] == ',' || update[update.indexOf("\"Blue1Brightness\":") + 20] == '}') ? ((update[update.indexOf("\"Blue1Brightness\":") + 18] - '0') * 10 + (update[update.indexOf("\"Blue1Brightness\":") + 19] - '0')) : (update[update.indexOf("\"Blue1Brightness\":") + 18] - '0') * 100 + (update[update.indexOf("\"Blue1Brightness\":") + 19] - '0') * 10 + (update[update.indexOf("\"Blue1Brightness\":") + 20] - '0'))), RGB1);
  }
  if (!RGB2Auto) {
    setRGB(((update[update.indexOf("\"Red2Brightness\":") + 18] == ',' || update[update.indexOf("\"Red2Brightness\":") + 18] == '}') ? (update[update.indexOf("\"Red2Brightness\":") + 17] - '0') : ((update[update.indexOf("\"Red2Brightness\":") + 19] == ',' || update[update.indexOf("\"Red2Brightness\":") + 19] == '}') ? ((update[update.indexOf("\"Red2Brightness\":") + 17] - '0') * 10 + (update[update.indexOf("\"Red2Brightness\":") + 18] - '0')) : (update[update.indexOf("\"Red2Brightness\":") + 17] - '0') * 100 + (update[update.indexOf("\"Red2Brightness\":") + 18] - '0') * 10 + (update[update.indexOf("\"Red2Brightness\":") + 19] - '0'))), ((update[update.indexOf("\"Green2Brightness\":") + 20] == ',' || update[update.indexOf("\"Green2Brightness\":") + 20] == '}') ? (update[update.indexOf("\"Green2Brightness\":") + 19] - '0') : ((update[update.indexOf("\"Green2Brightness\":") + 21] == ',' || update[update.indexOf("\"Green2Brightness\":") + 21] == '}') ? ((update[update.indexOf("\"Green2Brightness\":") + 19] - '0') * 10 + (update[update.indexOf("\"Green2Brightness\":") + 20] - '0')) : (update[update.indexOf("\"Green2Brightness\":") + 19] - '0') * 100 + (update[update.indexOf("\"Green2Brightness\":") + 20] - '0') * 10 + (update[update.indexOf("\"Green2Brightness\":") + 21] - '0'))), ((update[update.indexOf("\"Blue2Brightness\":") + 19] == ',' || update[update.indexOf("\"Blue2Brightness\":") + 19] == '}') ? (update[update.indexOf("\"Blue2Brightness\":") + 18] - '0') : ((update[update.indexOf("\"Blue2Brightness\":") + 20] == ',' || update[update.indexOf("\"Blue2Brightness\":") + 20] == '}') ? ((update[update.indexOf("\"Blue2Brightness\":") + 18] - '0') * 10 + (update[update.indexOf("\"Blue2Brightness\":") + 19] - '0')) : (update[update.indexOf("\"Blue2Brightness\":") + 18] - '0') * 100 + (update[update.indexOf("\"Blue2Brightness\":") + 19] - '0') * 10 + (update[update.indexOf("\"Blue2Brightness\":") + 20] - '0'))), RGB2);
  }
  if (!VAAuto) {
    VAActive = ((update.indexOf("\"VAActive\":true") >= 0) ? true : ((update.indexOf("\"VAActive\":false") >= 0) ? false : NULL));
    if (VAActive) {
      if (RGB1Auto) {
        setRGB(0, 255, 0, RGB1);
      }
      if (RGB2Auto) {
        setRGB(255, 255, 255, RGB2);
      }
      if (InbuiltAuto) {
        analogWrite(Inbuilt, 255);
      }
      if (BuzzerAuto) {
        AlarmPitch += AlarmPitch/5;
        for (int i = 0; i < 3; i++) {
          tone(Alarm[i], AlarmPitch);
        }
        if (AlarmPitch > 5000) {
          AlarmPitch = 50;
        }
      }
    } else {
      if (RGB1Auto) {
        setRGB(0, 0, 0, RGB1);
      }
      if (RGB2Auto) {
        setRGB(0, 0, 0, RGB2);
      }
      if (InbuiltAuto) {
        analogWrite(Inbuilt, 0);
      }
      if (BuzzerAuto) {
        for (int i = 0; i < 3; i++) {
          noTone(Alarm[i]);
        }
      }
    }
  }
  movement = m;
  timesIndex = t;
  timeTotal = tt;
  coldMovement = cm;
  return 0;
}