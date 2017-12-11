package com.example.server

import com.example.data.*
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.response.*

fun StatusPages.Configuration.setup() {

    exception<Throwable> {
        val status = when (it) {
            is StatusException -> it.status
            else -> HttpStatusCode.InternalServerError
        }

        println(it)
        it.stackTrace.forEach(::println)
        call.response.status(status)
        call.respond(it)
    }

}