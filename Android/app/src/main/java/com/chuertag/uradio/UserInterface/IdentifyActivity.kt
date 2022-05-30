package com.chuertag.uradio.UserInterface

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.CountDownTimer
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.isVisible
import com.chuertag.uradio.APIs.ACRCloudAPI
import com.chuertag.uradio.Models.Song
import com.chuertag.uradio.R
import com.chuertag.uradio.databinding.ActivityIdentifyBinding
import com.github.squti.androidwaverecorder.RecorderState
import com.github.squti.androidwaverecorder.WaveRecorder
import org.json.JSONArray
import org.json.JSONObject
import pl.droidsonroids.gif.GifDrawable
import java.io.File
import java.io.FileInputStream
import java.io.IOException

class IdentifyActivity : AppCompatActivity() {
    private lateinit var activityIdentifyBinding: ActivityIdentifyBinding
    private val PERMISSIONS_REQUEST_RECORD_AUDIO = 77
    private lateinit var gifControl: GifDrawable
    private lateinit var waveRecorder: WaveRecorder
    private lateinit var filePath: String
    private lateinit var response: String
    private var song = Song()
    private var songs = ArrayList<Song>()
    private var recorded = false
    private var isRecording = false
    private var isPaused = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityIdentifyBinding = ActivityIdentifyBinding.inflate(layoutInflater)
        setContentView(activityIdentifyBinding.root)
        initComponentss()
        setComponents()
    }
    private fun initComponentss() {
        filePath = externalCacheDir?.absolutePath + "/tmpAudioFile.wav"
        waveRecorder = WaveRecorder(filePath)
        gifControl = activityIdentifyBinding.gifImageView.drawable as GifDrawable
    }
    private fun setComponents() {
        gifControl.stop();
        waveRecorder.waveConfig.sampleRate = 44100
        waveRecorder.onStateChangeListener = {
            when (it) {
                RecorderState.RECORDING -> startRecording()
                RecorderState.STOP -> stopRecording()
                RecorderState.PAUSE -> pauseRecording()
            }
        }
        waveRecorder.onTimeElapsed = {
            //Log.e(TAG, "onCreate: time elapsed $it")
        }
        activityIdentifyBinding.strtgoBtn.setOnClickListener {
            if(recorded) {
                val intent = Intent(this, SongActivity::class.java)
                intent.putExtra("songs", songs.toTypedArray())
                songs.toArray().forEach { println(it) }
                startActivity(intent)
                return@setOnClickListener
            }
            if (!isRecording) {
                if (ContextCompat.checkSelfPermission(
                        this,
                        Manifest.permission.RECORD_AUDIO
                    )
                    != PackageManager.PERMISSION_GRANTED
                ) {
                    ActivityCompat.requestPermissions(
                        this,
                        arrayOf(Manifest.permission.RECORD_AUDIO),
                        PERMISSIONS_REQUEST_RECORD_AUDIO
                    )
                } else {
                    waveRecorder.startRecording()
                }
            } else {
                waveRecorder.stopRecording()  //start stop button not implemented
            }
        }
    }
    private fun startRecording() {
        Log.d(TAG, waveRecorder.audioSessionId.toString())
        gifControl.start()
        isRecording = true
        isPaused = false
        activityIdentifyBinding.sttsTxtVw.setText(R.string.sttsTxtVw)
        activityIdentifyBinding.strtgoBtn.isEnabled = false
        activityIdentifyBinding.progressHorizontal.isVisible = true
        object : CountDownTimer(14000,1000) {
            var prog = -5
            override fun onTick(p0: Long) {
                prog += 5
                activityIdentifyBinding.progressHorizontal.progress = prog
            }
            override fun onFinish() { waveRecorder.stopRecording() }
        }.start()
    }

    private fun stopRecording() {
        recorded = true
        isRecording = false
        isPaused = false
        activityIdentifyBinding.progressHorizontal.progress = 0
        activityIdentifyBinding.progressHorizontal.isIndeterminate = true
        activityIdentifyBinding.sttsTxtVw.setText(R.string.stts2TxtVw)
        activityIdentifyBinding.strtgoBtn.setText(R.string.goBtn)
        val idSongThread = SongIdentification()
        idSongThread.start()
        try {
            idSongThread.join()
            gifControl.stop()
            val jsonObj = JSONObject(response)
            recorded = (jsonObj.get("status") as JSONObject).get("msg").equals("Success")
            activityIdentifyBinding.strtgoBtn.isEnabled = true
            activityIdentifyBinding.progressHorizontal.isVisible = false
            if(recorded){
                activityIdentifyBinding.sttsTxtVw.setText(R.string.sttsinstTxtVw)
                val arr = (jsonObj.get("metadata") as JSONObject).get("music") as JSONArray
                var element : JSONObject
                var artists : JSONArray
                var strArtists : ArrayList<String> = ArrayList()
                songs.clear()
                (0 until arr.length()).forEach {
                    element = arr.get(it) as JSONObject
                    song.sId = ((((element.get("external_metadata") as JSONObject)
                        .get("spotify") as JSONObject).get("track") as JSONObject).get("id") as String)
                    song.title = (element.get("title") as String)
                    song.album = ((element.get("album") as JSONObject).get("name") as String)
                    song.isrc = ((element.get("external_ids") as JSONObject).get("isrc") as String)
                    artists = (element.get("artists") as JSONArray)
                    strArtists.clear()
                    (0 until artists.length()).forEach {
                        strArtists.add((artists.get(it) as JSONObject).get("name") as String)
                    }
                    song.artists = strArtists.toTypedArray();
                    songs.add(song)
                }
            } else {
                activityIdentifyBinding.sttsTxtVw.setText(R.string.instTxtVw)
                activityIdentifyBinding.strtgoBtn.setText(R.string.idBtn)
                activityIdentifyBinding.progressHorizontal.isIndeterminate = false
                Toast.makeText(this, "Couldn't identify song", Toast.LENGTH_SHORT).show()
            }
        } catch (ex: Exception){
            activityIdentifyBinding.sttsTxtVw.setText(R.string.instTxtVw)
            activityIdentifyBinding.strtgoBtn.setText(R.string.idBtn)
            activityIdentifyBinding.progressHorizontal.isIndeterminate = false
            Toast.makeText(this, "An error has occured", Toast.LENGTH_SHORT).show()
            ex.printStackTrace()
        }
    }

    private fun pauseRecording() {
        isPaused = true
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>, grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            PERMISSIONS_REQUEST_RECORD_AUDIO -> {
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    waveRecorder.startRecording()
                }
                return
            }
            else -> {
            }
        }
    }

    override fun onPause() {
        super.onPause()
        if(!isPaused && !recorded) waveRecorder.pauseRecording()
    }

    override fun onResume() {
        super.onResume()
        if(isPaused && !recorded) waveRecorder.resumeRecording()
    }

    companion object {
        private const val TAG = "IdentifyActivity"
    }

    inner class SongIdentification: Thread() {
        public override fun run() {
            val file = File(filePath)
            val buffer = ByteArray(1024 * 1024)
            if (!file.exists()) return
            var fin: FileInputStream? = null
            var bufferLen = 0
            try {
                fin = FileInputStream(file)
                bufferLen = fin.read(buffer, 0, buffer.size)
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                try {
                    fin?.close()
                } catch (e: IOException) {
                    e.printStackTrace()
                }
            }
            if (bufferLen <= 0) return
            val postDatas = ByteArray(bufferLen)
            System.arraycopy(buffer, 0, postDatas, 0, bufferLen)
            val api = ACRCloudAPI()
            val result = api.recognize(
                resources.getString(R.string.host),
                resources.getString(R.string.accessKey), resources.getString(R.string.secretKey),
                postDatas, "audio", 10000
            )
            response = result
        }
    }

}