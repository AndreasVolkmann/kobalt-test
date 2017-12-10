package com.example.util

import io.ktor.application.*

fun ApplicationCall.getId(name: String = "id") = parameters[name]!!.toInt()