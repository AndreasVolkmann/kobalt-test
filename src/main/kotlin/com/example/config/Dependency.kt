package com.example.config

import com.example.persistence.*
import com.example.util.*
import com.github.salomonbrys.kodein.*

fun makeProductionModule() = Kodein.Module {
    bind<ProfileSource>() with singleton { ProfileSourceImpl() }

    constantProperty("db.host")
    constantProperty("db.database")
    constantProperty("db.arguments")
    constantProperty("db.user")
    constantProperty("db.pass")
    constantProperty("db.driver")
}

val devModule = Kodein.Module {
    import(makeProductionModule(), allowOverride = true)
}

val prodKodein = Kodein {
    import(makeProductionModule())
}

val devKodein = Kodein {
    import(devModule, allowOverride = true)
}

fun Kodein.Builder.constantProperty(name: String) = constant(name) with Property[name]