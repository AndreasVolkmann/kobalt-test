package com.example.util

import com.example.data.*
import io.ktor.application.*
import io.ktor.auth.*

fun ApplicationCall.getId(name: String = "id") = parameters[name]!!.toInt()

val ApplicationCall.profile get() = authentication.principal<Profile>()!!