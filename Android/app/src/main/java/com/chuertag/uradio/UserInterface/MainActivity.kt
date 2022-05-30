package com.chuertag.uradio.UserInterface

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.chuertag.uradio.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var activityMainBinding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityMainBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(activityMainBinding.root)
        setComponents()
    }
    private fun setComponents() {
        activityMainBinding.idBtn.setOnClickListener {
            startActivity(Intent(this, IdentifyActivity::class.java))
        }
        activityMainBinding.xplrBtn.setOnClickListener {
            startActivity(Intent(this, ExploreActivity::class.java))
        }
    }
}