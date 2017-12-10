package com.example.server

import com.example.persistence.*
import com.github.salomonbrys.kodein.*
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun setupServer(kodein: Kodein) = embeddedServer(Netty, 5080) {
    DatabaseSetup(kodein).insertBaseData()
    install(CallLogging)
    install(ContentNegotiation) {
        gson { }
    }
    install(Routing) {
        setup(kodein)
    }
}