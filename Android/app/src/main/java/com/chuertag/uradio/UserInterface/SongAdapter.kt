package com.chuertag.uradio.UserInterface

import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.chuertag.uradio.Models.Song
import com.chuertag.uradio.R
import com.chuertag.uradio.databinding.SongInfoBinding

class SongAdapter (private val dataArray: Array<Song>, private val songAdapterListener:
    SongAdapter.SongAdapterListener) : RecyclerView.Adapter<SongAdapter.ViewHolder>(){
    private lateinit var songInfoBinding : SongInfoBinding
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SongAdapter.ViewHolder {
        songInfoBinding = SongInfoBinding.bind(LayoutInflater.from(parent.context)
            .inflate(R.layout.song_info, parent, false))
        return ViewHolder(songInfoBinding.root)
    }

    override fun onBindViewHolder(holder: SongAdapter.ViewHolder, position: Int) {
        songInfoBinding.titleTxtVw.text = "Title: " + dataArray[position].title
        songInfoBinding.albumTxtVw.text = "Album: " + dataArray[position].album
        var artists = StringBuilder()
        dataArray[position].artists.forEach {
            artists.append("\n")
            artists.append(it)
        }
        songInfoBinding.artistsTxtVw.text = "Artists:" + artists.toString()
        songInfoBinding.spBtn.setOnClickListener {
            songAdapterListener.onClickSongListener(dataArray[position].sId)
        }
    }

    override fun getItemCount() = dataArray.size

    class ViewHolder (view : View) : RecyclerView.ViewHolder(view)

    interface SongAdapterListener {
        fun onClickSongListener(sId: String)
    }
}