package com.example.server

import com.example.persistence.*
import com.example.routes.*
import com.github.salomonbrys.kodein.*
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import java.io.*

fun setupServer(kodein: Kodein) = embeddedServer(Netty, 5080) {
    val html = File("web/build/index.html").readText()
    Setup(kodein)
    install(CallLogging)
    install(ContentNegotiation) {
        gson { }
    }
    install(Routing) {

        static()


        route("profiles") {
            val profileSource: ProfileSource = kodein.instance()
            get {
                val profiles = profileSource.getProfiles(10, 0)
                call.respond(profiles)
            }

        }

        get("{...}") {
            call.respondText(html, ContentType.Text.Html)
        }

    }

}