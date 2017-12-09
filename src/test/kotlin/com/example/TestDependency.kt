package com.example

import com.example.config.*
import com.github.salomonbrys.kodein.*

val testKodein = Kodein {
    import(devModule, allowOverride = true)
}