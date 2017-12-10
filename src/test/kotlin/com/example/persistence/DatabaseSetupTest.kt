package com.example.persistence

import com.example.*
import com.example.data.*
import com.github.salomonbrys.kodein.*
import org.amshove.kluent.*
import org.junit.jupiter.api.*

internal class DatabaseSetupTest {

    @Test fun baseData() {
        val profileSource: ProfileSource = testKodein.instance()

        DatabaseSetup(testKodein).let {
            it.insertBaseData()
            val profiles = profileSource.getProfiles()
            profiles.shouldNotBeEmpty()
            profiles.forEach(::println)

            profiles.map(Profile::name).distinct().size shouldEqualTo profiles.size
        }

    }

}