package com.example.server

import com.example.persistence.*
import com.example.server.routes.*
import com.github.salomonbrys.kodein.*
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import java.io.*

fun Routing.setup(kodein: Kodein) {
    val html = File("web/build/index.html").readText()

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