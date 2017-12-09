package com.example

import com.example.config.*
import com.example.server.*

fun main(args: Array<String>) {
    val kodein = prodKodein
    setupServer(kodein).start(wait = true)
}

