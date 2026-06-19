import { TeamMember } from '../models/index.js';
import { pickFields } from '../utils/pickFields.js';
import { TEAM_MEMBER_FIELDS } from '../constants/fieldAllowlists.js';

export async function listTeamMembers(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await TeamMember.findAndCountAll({
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function createTeamMember(data) {
  return TeamMember.create(pickFields(data, TEAM_MEMBER_FIELDS));
}

export async function updateTeamMember(id, data) {
  const member = await TeamMember.findByPk(id);
  if (!member) throw Object.assign(new Error('Team member not found'), { statusCode: 404 });
  await member.update(pickFields(data, TEAM_MEMBER_FIELDS));
  return member;
}

export async function deleteTeamMember(id) {
  const member = await TeamMember.findByPk(id);
  if (!member) throw Object.assign(new Error('Team member not found'), { statusCode: 404 });
  await member.destroy();
}

export async function toggleTeamMemberStatus(id) {
  const member = await TeamMember.findByPk(id);
  if (!member) throw Object.assign(new Error('Team member not found'), { statusCode: 404 });
  await member.update({ is_active: !member.is_active });
  return member;
}
