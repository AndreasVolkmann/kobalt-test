package com.example.persistence

import com.example.data.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*

class ProfileSourceImpl : ProfileSource {

    override fun getProfiles(limit: Int, page: Int): List<Profile> = transaction {
        (Profiles)
                .selectAll()
                .limit(limit, page * limit)
                .map { Profile(id = it[Profiles.id], name = it[Profiles.name], imgUrl = it[Profiles.imgUrl]) }
    }

    override fun insert(profile: Profile): Profile = transaction {
        val id = Profiles.insert {
            it[name] = profile.name
            it[imgUrl] = profile.imgUrl
        } get Profiles.id
        profile.copy(id = id)
    }

    override fun endorse(endorsement: Endorsement): Unit = transaction {
        val skillId = ProfileSkills
                .select { ProfileSkills.profileId eq endorsement.targetProfileId and (ProfileSkills.name eq endorsement.skill) }
                .firstOrNull()
                ?.get(ProfileSkills.id)
                ?: insertProfileSkill(endorsement)

        insertEndorsement(skillId, endorsement)
    }

    private fun insertProfileSkill(endorsement: Endorsement) = ProfileSkills.insert {
        it[profileId] = endorsement.targetProfileId
        it[name] = endorsement.skill
    } get ProfileSkills.id

    private fun insertEndorsement(skillId: Int, endorsement: Endorsement) = Endorsements.insert {
        it[this.skillId] = skillId
        it[endorserId] = endorsement.endorserId
    }

}