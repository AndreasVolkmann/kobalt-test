package com.example.persistence

import com.example.data.*
import com.github.salomonbrys.kodein.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*
import java.util.Random

class DatabaseSetup(kodein: Kodein) {

    private val profileSource: ProfileSource = kodein.instance()

    init {
        val host: String = kodein.instance("db.host")
        val database: String = kodein.instance("db.database")
        Database.connect(
                url = "$host/$database",
                driver = kodein.instance("db.driver"),
                user = kodein.instance("db.user"),
                password = kodein.instance("db.pass"))
        insertBaseData()
    }

    fun insertBaseData() = transaction {
        SchemaUtils.create(*tables)
        val profiles = listOf(
                Profile(null, "Andreas Volkmann", null),
                Profile(null, "Robert Greene", "https://pbs.twimg.com/profile_images/2707261704/b1bb5b5e31154c07681959bcc7799bca_400x400.jpeg"),
                Profile(null, "Fuminori Nakamura", "http://www.diogenes.ch/dam/Diogenes/Autorenportraits/Nakamura_700130235_beschnitten.jpg"),
                Profile(null, "Mario Puzo", "https://upload.wikimedia.org/wikipedia/en/0/0c/Mario_Puzo.jpg"),
                Profile(null, "Paul Auster", "http://paul-auster.com/images/paul-auster.jpg"),
                Profile(null, "Hans Habe", "https://images.gr-assets.com/authors/1354134456p5/108377.jpg")
        ).map(profileSource::insert)

        val skills = listOf("Kotlin", "React", "Writing", "イラスト", "Entrepreneurship", "Startup", "UXデザイン", "リーダシップ", "面白い")

        val random = Random(1)

        fun getProfileId() = profiles[random.nextInt(profiles.lastIndex)].id
        (0..100).map {
            val skill = skills[random.nextInt(skills.lastIndex)]
            val target = getProfileId()
            var source = getProfileId()
            while (source == target) {
                source = getProfileId()
            }
            Endorsement(skill, target!!, source!!)
        }.forEach(profileSource::endorse)


    }

}