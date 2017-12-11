package com.example.server

import com.example.auth.*
import com.example.data.*
import com.example.persistence.*
import com.example.server.routes.*
import com.example.util.*
import com.github.salomonbrys.kodein.*
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import java.io.*

fun Routing.setup(kodein: Kodein) {
    val html = File("web/build/index.html").readText()
    val profileSource: ProfileSource = kodein.instance()

    static()

    route("login") {
        val loginSource: LoginSource = kodein.instance()
        post {
            val credentials = call.receive<LoginCredentials>()
            val token = loginSource.login(credentials)
            call.respondText(token)
        }
    }


    route("api") {

        authentication {
            jwtAuthentication(JwtConfig.verifier, JwtConfig.realm) { credentials ->
                credentials.payload.getClaim("id").asInt()?.let(profileSource::getProfile)
            }
        }

        route("profiles") {

            get {
                val profiles = profileSource.getProfiles(10, 0)
                println(profiles)
                call.respond(profiles)
            }

            get("{id}") {
                val id = call.getId()
                val profile = profileSource.getProfile(id)
                call.respond(profile)
            }

            post("endorse") {
                val endorsement = call.receive<Endorsement>()
                profileSource.endorse(endorsement)
                val profile = profileSource.getProfile(endorsement.targetProfileId)
                call.respond(profile)
            }

        }

        route("skills") {
            val skillSource: SkillSource = kodein.instance()

            get("{id}") {
                val id = call.getId()
                val skill = skillSource.get(id)
                call.respond(skill)
            }

        }

    }



    get("{...}") {
        call.respondText(html, ContentType.Text.Html)
    }

}