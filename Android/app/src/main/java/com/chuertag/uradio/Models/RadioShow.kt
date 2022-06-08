package com.chuertag.uradio.Models

import java.io.Serializable

class RadioShow (var managerId: Int, var name: String, var schedule: String, var host: String,
                 var availableAt: String) : Serializable {
    val serialVersionUID = 1L
}