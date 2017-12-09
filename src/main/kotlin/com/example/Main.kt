package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.h2.api.*

fun main(args: Array<String>) {
    println("\n\nHello Kotlin world from Kobalt\n\n")

    embeddedServer(Netty, 5080) {

    }

}