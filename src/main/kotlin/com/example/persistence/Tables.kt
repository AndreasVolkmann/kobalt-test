package com.example.persistence

import org.jetbrains.exposed.sql.*

val tables = arrayOf(
        Profiles, ProfileSkills, Endorsements
)

object Profiles : Table("profiles") {
    val id = integer("id").primaryKey().autoIncrement()
    val name = varchar("name", 100)
    val imgUrl = varchar("image_url", 254).nullable()
}

object ProfileSkills : Table("profile_skills") {
    val id = integer("id").primaryKey().autoIncrement()
    val profileId = integer("profile_id") references Profiles.id
    val name = varchar("name", 50)

    init {
        uniqueIndex(profileId, name)
    }
}

object Endorsements : Table("endorsements") {
    val skillId = integer("skill_id") references ProfileSkills.id
    val endorserId = integer("endorser_id") references Profiles.id
}