package com.chuertag.uradio.Models

import java.io.Serializable

data class Song (var isrc: String = "", var title: String = "", var album: String = "",
                 var artists: Array<String> = emptyArray(), var sId: String = "") : Serializable {
                     val serialVersionUID = 1L
                 }
