package com.example.routes

import io.ktor.content.*
import io.ktor.routing.*
import java.io.*

fun Route.static() {
    static {
        file("/", "web/build/index.html")
        file("/favicon.ico", "app/favicon.ico")
    }
    static("static") {
        files(File("web/build/static"))
    }
}