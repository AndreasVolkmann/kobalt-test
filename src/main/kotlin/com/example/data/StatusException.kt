package com.example.data

import io.ktor.http.HttpStatusCode

abstract class StatusException(override val message: String?, override val cause: Throwable? = null): Exception() {

    abstract val status: HttpStatusCode

}