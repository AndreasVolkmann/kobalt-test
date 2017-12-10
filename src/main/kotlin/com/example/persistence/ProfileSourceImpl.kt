package com.example.persistence

import com.example.data.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*

class ProfileSourceImpl : ProfileSource {

    override fun getProfiles(limit: Int, page: Int): List<Profile> = transaction {
        (Profiles)
                .selectAll()
                .limit(limit, page * limit)
                .map { rowToProfile(it) }
    }

    override fun getProfile(id: Int): Profile = transaction {
        val rows = (Profiles leftJoin ProfileSkills)
                .slice(Profiles.name, Profiles.imgUrl, ProfileSkills.name, ProfileSkills.id)
                .select({ Profiles.id eq id })
        rows.forEach(::println)

        val skillIds = rows.associate { it.tryGet(ProfileSkills.id) to it[ProfileSkills.name] }.filterKeys { it != null }
        val endorsements = if (skillIds.isNotEmpty()) Endorsements
                .select({ Endorsements.skillId inList skillIds.keys })
                .map { Endorsement(skillIds[it[Endorsements.skillId]]!!, id, it[Endorsements.endorserId]) }
        else listOf()

        val skills = endorsements.groupBy(Endorsement::skill)

        val endorsers = skills.mapValues { it.value.map(Endorsement::endorserId) }
                .flatMap { (_, ids) -> ids.take(10) }
                .distinct()
                .let { getProfiles(it) }
                .associateBy(Profile::id)

        val skillIdLookup = skillIds.map { it.value to it.key!! }.toMap()
        val profileSkills = skills.map { (skill, endos) ->
            ProfileSkill(skillIdLookup[skill]!!, skill, endos.size, endos.mapNotNull { endorsers[it.endorserId] })
        }

        val firstRow = rows.first()
        Profile(id, firstRow[Profiles.name], firstRow[Profiles.imgUrl], profileSkills)
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

    private fun getProfiles(ids: List<Int>): List<Profile> = if (ids.isNotEmpty()) Profiles
            .select({ Profiles.id inList ids })
            .map(this::rowToProfile)
    else listOf()

    private fun insertProfileSkill(endorsement: Endorsement) = ProfileSkills.insert {
        it[profileId] = endorsement.targetProfileId
        it[name] = endorsement.skill
    } get ProfileSkills.id

    private fun insertEndorsement(skillId: Int, endorsement: Endorsement) = Endorsements.insert {
        it[this.skillId] = skillId
        it[endorserId] = endorsement.endorserId
    }

    private fun rowToProfile(row: ResultRow) = Profile(
            id = row[Profiles.id],
            name = row[Profiles.name],
            imgUrl = row[Profiles.imgUrl])

}