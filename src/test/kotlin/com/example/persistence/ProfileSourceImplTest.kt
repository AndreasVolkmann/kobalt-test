package com.example.persistence

import com.example.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

internal class ProfileSourceImplTest {

    val source = ProfileSourceImpl()

    @Test fun `get Profile by Id`() {
        DatabaseSetup(testKodein)
        source.getProfile(6).let(::println)

        transaction {

        }

    }

}