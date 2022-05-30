package com.chuertag.uradio.UserInterface

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.chuertag.uradio.Models.Song
import com.chuertag.uradio.databinding.ActivitySongBinding

class SongActivity : AppCompatActivity(), SongAdapter.SongAdapterListener {
    private lateinit var activitySongBinding : ActivitySongBinding
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

    override fun onClickSongListener(sId: String) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse("spotify:track:"+sId)
        intent.putExtra(
            Intent.EXTRA_REFERRER,
            Uri.parse("android-app://" + this.packageName)
        )
        this.startActivity(intent)
    }
}