/*
*  Weather Station App
*  CGS Semester 2
*  Task 2
*  Author: your name here
*/

#include <math.h>
#include <WiFi.h>
#include <aREST.h>
#include <future>
#include <string>
// #include "pitches.h"

// #include <DHT.h>

// DHT11 sensor pins
#define Movement 17
#define Trigger 13
#define Echo 12

// #define DHTTYPE DHT11
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

// Initialize DHT sensor
// DHT dht(Movement, DHTTYPE, 17);

// WiFi parameters
const char* ssid = "C001R@V3G@m35";
// const char* password = "centauri";
String currentLine = "";

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
// int InbuiltBrightness;
bool RGB1Auto = true;
// int Red1Brightness;
// int Green1Brightness;
// int Blue1Brightness;
bool RGB2Auto = true;
// int Red2Brightness;
// int Green2Brightness;
// int Blue2Brightness;
bool VAAuto = true;
bool VAActive = false;

int AlarmPitch = 50;

// long times[10000];
float timeTotal = 0;
float average = 0;
int timesIndex = 0;
bool coldMovement = false;

// bool BoolData;
// String Data = "{\"movement\":"+(String)movement+",\"InbuiltAuto\":"+(String)InbuiltAuto+",\"InbuiltBrightness\":"+(String)analogRead(Inbuilt)+",\"RGB1Auto\":"+(String)RGB1Auto+",\"Red1Brightness\":"+(String)analogRead(RGB1[0])+",\"Green1Brightness\":"+(String)analogRead(RGB1[1])+",\"Blue1Brightness\":"+(String)analogRead(RGB1[2])+",\"RGB2Auto\":"+(String)RGB2Auto+",\"Red2Brightness\":"+(String)analogRead(RGB2[0])+",\"Green2Brightness\":"+(String)analogRead(RGB2[1])+",\"Blue2Brightness\":"+(String)analogRead(RGB2[2])+"}";

// float humidity;
// char* location = "Al Fresco";
// int timer = 72000;

// Declare functions to be exposed to the API
// int ledControl(String command);

String header;


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
  // Init DHT 
  // dht.begin();
  
  // Init variables and expose them to REST API
  rest.variable("movement",&movement);
  rest.variable("Average",&average);
  // rest.variable("Time",&timeTotal);
  rest.variable("ColdMovement",&coldMovement);


  rest.variable("BuzzerStatus",&BuzzerAuto);
  rest.variable("BuzzerStatus",&BuzzerStatus);
  // rest.variable("VAActive",&VAActive);
  rest.variable("InbuiltAuto",&InbuiltAuto);
  // rest.variable("InbuiltBrightness",&InbuiltBrightness);
  rest.variable("RGB1Auto",&RGB1Auto);
  // rest.variable("Red1Brightness",&Red1Brightness);
  // rest.variable("Green1Brightness",&Green1Brightness);
  // rest.variable("Blue1Brightness",&Blue1Brightness);
  rest.variable("RGB2Auto",&RGB2Auto);
  // rest.variable("Red2Brightness",&Red2Brightness);
  // rest.variable("Green2Brightness",&Green2Brightness);
  // rest.variable("Blue2Brightness",&Blue2Brightness);
  // rest.variable("Data",&Data);
  rest.variable("VAAuto",&VAAuto);
  rest.variable("VAActive",&VAActive);


  rest.function("update",update);
  // rest.function("data",data);
    
  // Give name and ID to device
  // rest.set_id("tdfhgfcytrf");
  // rest.set_name("gcrt6ydfcygctyv");

  // Connect to WiFi
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid);
  // IPAddress ip(192, 168, 1, 142); //set static ip
  // IPAddress gateway(192, 168, 1, 1); //set getteway
  // Serial.print(F("Setting static ip to : "));
  // Serial.println(ip);
  // IPAddress subnet(255, 255, 255, 0);//set subnet
  // WiFi.config(ip, gateway, subnet);

  
  // while (WiFi.status() != WL_CONNECTED) {
  //   delay(500);
  //   Serial.print(".");
  // }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
  
  // Print the IP address
  Serial.println(WiFi.softAPIP());
  // times[0] = 1;
}

void loop() {
  WiFiClient client = server.available();
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trigger, LOW);
  float time = pulseIn(Echo, HIGH);
  timeTotal += time;
  coldMovement = (average - time > 100) ? true : coldMovement;
  // Serial.println(time);

  // float time = pulseIn(Echo, HIGH);
  // Serial.println(times[timesIndex]);
  // Serial.println(timesIndex);
  // if (times) {
  // float lastTimes[timesIndex];
  // Serial.print("dfgrs");
  // for (int i = 0; i < timesIndex; i++) {
  //   lastTimes[i] = times[i];
  // }
  // float times[timesIndex];
  // for (int i = 0; i < timesIndex; i++) {
  //   times[i] = lastTimes[i];
  // }
  // times[0] += 1;
  // times[0] = ;
  // Serial.println("times[0]");
  timesIndex += 1;
  // Serial.println(times);

  // times[0] += 1;

  // } else {
  //   float times[] = {time};
  // }
  // Serial.println(time/343);
  // Serial.println(time);
  // int fre = 0;
  // while (fre < 1500) {
  //   tone(Alarm[0], fre);
  //   fre += 1;
  // }
  // tone(Alarm[0], 1000);
  // delay(6753454675674);
  // tone(Alarm[0], 1000, 10000);
  if (!movement && digitalRead(Movement)) {
    // Reading temperature and humidity
    movement = digitalRead(Movement);
    if (VAAuto) {
      // VAActive = true;
      // Serial.println(VAActive);
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
    // Serial.print("Movement: ");
    // Serial.println(movement);
  } else if (!movement) {
    // Serial.println(VAActive);
    if (VAAuto) {
      // VAActive = false;
      // Serial.println(VAActive);
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
  // InbuiltBrightness = analogRead(Inbuilt);
  // if (!InbuiltAuto) {
  //   analogWrite(Inbuilt, InbuiltBrightness);
  // }
  // InbuiltBrightness = analogRead(Inbuilt);
  // humidity = dht.readHumidity();

  // Prints the temperature in celsius
  // Serial.print("Movement: ");
  // Serial.println(movement);
  // Serial.print("Humidity: ");
  // Serial.println(humidity);
  // Serial.print("Timer: ");
  // Serial.println(timer);
  // delay(5000);
  // timer--;

  //Check running time and reset if expired
  // if (timer == 0 ) {
  //   delay(3000);
  //   Serial.println("Resetting..");
  //   ESP.restart();
  // }
  
  // Handle REST calls
  if (!client) {
    return;
  }
  // String currentLine = "";
  while (!client.available()){
    // return;
  }
  // InbuiltBrightness = analogRead(Inbuilt);
  // rest.handle(client);
  // while(client.connected()) {             // if there's bytes to read from the client,
    // while(client.available()) {
    //   char c = client.read();             // read a byte, then
    //   Serial.write(c);                    // print it out the serial monitor
    //   header += c;
    //   currentLine += c;
    //   if (c == '\n') {
    //     if (currentLine.length() == 0) {
    //       Serial.println(header);
    //       rest.handle(client);
    //       movement = false;
    //       return;
    //     }
    //     currentLine = "";
    //   }
    // }
    //  else {
    //   Serial.println(header);
    //   rest.handle(client);
    //   movement = false;
    //   return;
    // }
  // }
  // Serial.println(header);
  // InbuiltBrightness = analogRead(Inbuilt);
  // rest.set_id((String)Red1Brightness + "G" + (String)Green1Brightness + "B" + (String)Blue1Brightness);
  // rest.set_name((String)Red2Brightness + "G" + (String)Green2Brightness + "B" + (String)Blue2Brightness + "\"InbuiltBrightness\":" + (String)InbuiltBrightness);
  // Data = "{\"movement\":"+(String)movement+",\"InbuiltAuto\":"+(String)InbuiltAuto+",\"InbuiltBrightness\":"+(String)analogRead(Inbuilt)+",\"RGB1Auto\":"+(String)RGB1Auto+",\"Red1Brightness\":"+(String)analogRead(RGB1[0])+",\"Green1Brightness\":"+(String)analogRead(RGB1[1])+",\"Blue1Brightness\":"+(String)analogRead(RGB1[2])+",\"RGB2Auto\":"+(String)RGB2Auto+",\"Red2Brightness\":"+(String)analogRead(RGB2[0])+",\"Green2Brightness\":"+(String)analogRead(RGB2[1])+",\"Blue2Brightness\":"+(String)analogRead(RGB2[2])+"}";
  // InbuiltBrightness = analogRead(Inbuilt);
  // long total = 0;
  // for (int i = 0; i < timesIndex; i++) {
  //   total += times[i];
  // }
  average = timeTotal/timesIndex;
  Serial.println(average);
  // Serial.println(total/timesIndex);
  // Serial.println(timesIndex);
  // float sum = 0;
  // for (int i = 0; i < timesIndex; i++) {
  //   sum += (times[i] - average)*(times[i] - average);
  // }
  // Serial.println(sum);
  // Serial.println(sum/timesIndex);
  // SD = sqrt(sum/timesIndex);
  // Serial.println(SD);
  // float average/
  rest.handle(client);
  movement = false;
  timeTotal = 0;
  timesIndex = 0;
  coldMovement = false;
  // return;
  // analogWrite(Inbuilt, InbuiltBrightness);
  // if (!InbuiltAuto) {
  //   // InbuiltBrightness = analogRead(Inbuilt);
  //   analogWrite(Inbuilt, InbuiltBrightness);
  // }
  // Serial.println(header);
  // rest.handle(client);
  // movement = false;
  // return;
}

void setRGB(int R, int G, int B, int light[]) {
  analogWrite(light[0], R);
  analogWrite(light[1], G);
  analogWrite(light[2], B);
}

// void seen() {
//   setRGB(255, 0, 0, RGB1);
//   setRGB(255, 0, 0, RGB2);
//   analogWrite(Inbuilt, 255);
//   delay(400);
//   for (int i = 0; i < 255; i++) {
//     delay(5);
//     setRGB(255, 0, i, RGB1);
//   }
//   for (int i = 0; i < 255; i++) {
//     delay(5);
//     setRGB(255, 0, i, RGB2);
//   }
//   for (int i = 0; i < 255; i++) {
//     delay(5);
//     setRGB(255, i, 255, RGB1);
//   }
//   for (int i = 0; i < 255; i++) {
//     delay(5);
//     setRGB(255, i, 255, RGB2);
//   }
//   // Prints the temperature in celsius
//   delay(500);
//   for (int i = 0; i < 255; i++) {
//     delay(5);
//     setRGB(255, 255, 255 - i, RGB1);
//   }
//   for (int i = 0; i < 255; i++) {
//     delay(5);
//     setRGB(255 - i, 255, 0, RGB1);
//   }
//   delay(500);
//   setRGB(0, 255, 0, RGB1);
// }

int update(String update) {
  bool m = movement;
  int t = timesIndex;
  // float a = average;
  float tt = timeTotal;
  bool cm = coldMovement;
  Serial.println(update);
  BuzzerAuto = ((update.indexOf("\"BuzzerAuto\":true") >= 0) ? true : ((update.indexOf("\"BuzzerAuto\":false") >= 0) ? false : NULL));
  // BuzzerStatus = ((update.indexOf("\"BuzzerStatus\":true") >= 0) ? true : ((update.indexOf("\"BuzzerStatus\":false") >= 0) ? false : NULL));
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
    // Serial.println(((update[update.indexOf("\"Blue1Brightness\":") + 19] == ',' || update[update.indexOf("\"Blue1Brightness\":") + 19] == '}') ? (update[update.indexOf("\"Blue1Brightness\":") + 18] - '0') : ((update[update.indexOf("\"Blue1Brightness\":") + 20] == ',' || update[update.indexOf("\"Blue1Brightness\":") + 20] == '}') ? ((update[update.indexOf("\"Blue1Brightness\":") + 18] - '0') * 10 + (update[update.indexOf("\"Blue1Brightness\":") + 19] - '0')) : (update[update.indexOf("\"Blue1Brightness\":") + 18] - '0') * 100 + (update[update.indexOf("\"Blue1Brightness\":") + 19] - '0') * 10 + (update[update.indexOf("\"Blue1Brightness\":") + 20] - '0'))));
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
  // average = a;
  timeTotal = tt;
  coldMovement = cm;
  return 0;
}