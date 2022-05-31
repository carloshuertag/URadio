package com.chuertag.uradio.APIs;

import android.util.JsonReader;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class SpotifyAPI {
    public static String getSpotifyId(String spotifyOAuthToken, String isrc) {
        System.out.println("Getting spotify id");
        String spotifyId = "";
        try {
            String url = "https://api.spotify.com/v1/search?q=isrc%3A"+isrc+"&type=track&market=ES&limit=1";
            URL spotifySearchEndpoint = new URL(url);
            HttpsURLConnection urlConnection = (HttpsURLConnection)
                    spotifySearchEndpoint.openConnection();
            urlConnection.setRequestProperty("Accept","application/json");
            urlConnection.setRequestProperty("Content-Type", "application/json");
            urlConnection.setRequestProperty("Authorization","Bearer "+spotifyOAuthToken);
            urlConnection.setRequestMethod("GET");
            if (urlConnection.getResponseCode() == HttpsURLConnection.HTTP_OK) { //Success
                System.out.println("Success");
                JsonReader jsonReader = new JsonReader(new InputStreamReader(urlConnection.getInputStream()));
                jsonReader.beginObject(); // Start processing the JSON object
                while (jsonReader.hasNext()) { // Loop through all keys
                    String key = jsonReader.nextName(); // Fetch the next key
                    if (key.equals("tracks")) { // Check if desired key
                        jsonReader.beginObject();
                        while(jsonReader.hasNext()) {
                            key = jsonReader.nextName();
                            if (key.equals("items")){
                                jsonReader.beginArray();
                                while (jsonReader.hasNext()) {
                                    jsonReader.beginObject();
                                    while (jsonReader.hasNext()) {
                                        if (jsonReader.nextName().equals("id")) {
                                            spotifyId = jsonReader.nextString();
                                            break;
                                        } else jsonReader.skipValue();
                                    }
                                }
                                jsonReader.endArray();
                                break;
                            } else jsonReader.skipValue();
                        }
                        break; // Break out of the loop
                    } else jsonReader.skipValue(); // Skip values of other keys
                }
                jsonReader.close();
                urlConnection.disconnect();
            } else System.out.println("Not 200 OK");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        System.out.println(spotifyId);
        return spotifyId;
    }
}
