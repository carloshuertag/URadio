package com.chuertag.uradio.UserInterface

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.chuertag.uradio.APIs.SpotifyAPI
import com.chuertag.uradio.Models.Song
import com.chuertag.uradio.R
import com.chuertag.uradio.databinding.ActivitySongBinding

class SongActivity : AppCompatActivity(), SongAdapter.SongAdapterListener {
    private lateinit var activitySongBinding : ActivitySongBinding
    private var spotifyId: String = ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activitySongBinding = ActivitySongBinding.inflate(layoutInflater)
        setContentView(activitySongBinding.root)
        setComponents()
    }

    private fun setComponents() {
        val songArray = intent.extras?.get("songs") as Array<Song>
        songArray.forEach { println(it) }
        val songAdapter = SongAdapter(songArray, this)
        activitySongBinding.rcyclrVw.adapter = songAdapter
        activitySongBinding.rcyclrVw.layoutManager = LinearLayoutManager(this)
    }

    inner class SpotifyAPIRunnable (val spotifyOAuthToken: String, val isrc: String) : Runnable {
        override fun run() {
            spotifyId = SpotifyAPI.getSpotifyId(spotifyOAuthToken, isrc)
        }

    }

    override fun onClickSongListener(sId: String, isrc: String) {
        spotifyId = sId;
        if(spotifyId.equals("")) {
            if(!isrc.equals("")) {
                val thread = Thread( SpotifyAPIRunnable( resources.getString(R.string.spotifyOAuthToken),
                        isrc ))
                thread.start()
                try {
                    thread.join()
                    spotifyIntent()
                } catch (ex: Exception) {
                    Toast.makeText(this, "Couldn't get Spotify id", Toast.LENGTH_SHORT).show()
                }
            } else Toast.makeText(this, "Couldn't get Spotify id", Toast.LENGTH_SHORT).show()
        } else spotifyIntent()
    }

    private fun spotifyIntent() {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse("spotify:track:" + spotifyId)
        intent.putExtra(
            Intent.EXTRA_REFERRER,
            Uri.parse("android-app://" + this.packageName)
        )
        this.startActivity(intent)
    }
}