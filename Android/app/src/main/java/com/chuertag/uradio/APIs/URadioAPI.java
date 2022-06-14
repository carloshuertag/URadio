package com.chuertag.uradio.APIs;

import android.util.JsonReader;

import com.chuertag.uradio.Models.RadioShow;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

public class URadioAPI {

    private static final int PORT = 3000;
    private static final String GETRADIOSHOWSPATH = "/api/radioShow/";
    private static final String PROTOCOL = "https://";

    public static ArrayList<RadioShow> getRadioShows(String ipAddr) throws Exception{
        ArrayList<RadioShow> radioShows = new ArrayList<>();
        String url = new StringBuilder(PROTOCOL).append(ipAddr).append(PORT)
                .append(GETRADIOSHOWSPATH).toString(), name, schedule, host, avaiableAt;
        int page, managerId;
        URL getRadioShowsEndpoint = new URL(url);
        HttpURLConnection httpURLConnection = (HttpURLConnection)
                getRadioShowsEndpoint.openConnection();
        httpURLConnection.setRequestProperty("Accept","application/json");
        httpURLConnection.setRequestMethod("GET");
        if (httpURLConnection.getResponseCode() == HttpsURLConnection.HTTP_OK) { //Success
            System.out.println("Success");
            JsonReader jsonReader = new JsonReader(new InputStreamReader(
                    httpURLConnection.getInputStream()));
            jsonReader.beginObject(); // Start processing the JSON object
            while (jsonReader.hasNext()) { // Loop through all keys
                if (jsonReader.nextName().equals("data")) { // Check if desired key
                    jsonReader.beginArray(); // Start processing the JSON array
                    while(jsonReader.hasNext()){ // Loop through all elements
                        // T
                    }
                    break;
                } else if (jsonReader.nextName().equals("meta")) { // Check if desired key
                    jsonReader.beginObject(); // Start processing the JSON object
                    while (jsonReader.hasNext()) { // Loop through all keys
                        if (jsonReader.nextName().equals("page")) { // Check if desired key
                            page = jsonReader.nextInt();
                            break; // Break out of the loop
                        } else jsonReader.skipValue(); // Skip values of other keys
                    }
                    break; // Break out of the loop
                } else jsonReader.skipValue(); // Skip values of other keys
            }
        } else System.out.println("Status is not 200 (HTTP OK)");
        return radioShows;
    }

}
