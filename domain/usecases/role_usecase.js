// npm install mongoose uuid

const repositories = require('../repositories/role_repository');
const { v4: uuidv4 } = require('uuid');


// Function to create a new role
const create = async (roleData) => {
    try {
        const roleId = uuidv4();
        const role = {
            role_id: roleId,
            ...roleData
        };
        const createdRole = await repositories.create(role);
        return createdRole;
    } catch (error) {
        throw new Error('Failed to create role');
    }
};

// Function to get list of roles
const getList = async () => {
    try {
        const roles = await repositories.findAll();
        return roles;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

// Use case to delete a role by ID
const deleteRole = async (roleId) => {
    try {
        const result = await repositories.deleteOneById(roleId);
        return result;
    } catch (error) {
        throw new Error('Failed to delete user');
    }
  };

  async function updateOne(updateData) {
    try {
      const roleId = updateData.role_id;
      const updatedRole = await repositories.updateOne(roleId, updateData);
      return updatedRole;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

module.exports = { create, getList, deleteRole, updateOne };