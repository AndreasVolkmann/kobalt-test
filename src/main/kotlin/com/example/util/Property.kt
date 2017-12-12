package com.example.util

import java.util.*

object Property {

    val props = Properties().apply {
        val stream = Property::class.java.classLoader.getResourceAsStream("application.properties")
        load(stream)
        stream.close()
    }

    operator fun get(key: String) = props[key].toString()

}