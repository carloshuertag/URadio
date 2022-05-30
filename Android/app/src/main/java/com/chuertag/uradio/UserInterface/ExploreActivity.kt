package com.chuertag.uradio.UserInterface

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.chuertag.uradio.Models.Song
import com.chuertag.uradio.databinding.ActivityExploreBinding

class ExploreActivity : AppCompatActivity() {
    private lateinit var activityExploreBinding: ActivityExploreBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityExploreBinding = ActivityExploreBinding.inflate(layoutInflater)
        setContentView(activityExploreBinding.root)
        setComponents()
    }
    private fun setComponents() {
    }

}