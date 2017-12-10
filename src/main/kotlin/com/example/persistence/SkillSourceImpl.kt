package com.example.persistence

import com.example.data.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*

class SkillSourceImpl : SkillSource {

    override fun get(id: Int): Skill = transaction {
        val rows = (ProfileSkills leftJoin Endorsements)
                .slice(ProfileSkills.name)
                .select({ ProfileSkills.id eq id })

        val firstRow = rows.first()
        Skill(id = id,
                name = firstRow[ProfileSkills.name],
                topProfiles = listOf())
    }


}