<template>
         <div>
             <h1>Users</h1>
             <button @click="showCreateUserModal" class="btn btn-primary mb-3">Create User</button>
             <table class="table">
                 <thead>
                     <tr>
                         <th>Name</th>
                         <th>Email</th>
                         <th>Roles</th>
                         <th>Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="user in users" :key="user.id">
                         <td>{{ user.name }}</td>
                         <td>{{ user.email }}</td>
                         <td>
                             <span v-for="role in user.roles" :key="role.id" class="badge bg-secondary">{{ role.name }}</span>
                         </td>
                         <td>
                             <button @click="editUser(user)" class="btn btn-warning btn-sm">Edit</button>
                             <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
                         </td>
                     </tr>
                 </tbody>
             </table>

             <!-- Create/Edit User Modal -->
             <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
                 <div class="modal-dialog">
                     <div class="modal-content">
                         <div class="modal-header">
                             <h5 class="modal-title">{{ editingUser ? 'Edit User' : 'Create User' }}</h5>
                             <button type="button" class="btn-close" @click="closeModal"></button>
                         </div>
                         <div class="modal-body">
                             <div class="mb-3">
                                 <label for="name" class="form-label">Name</label>
                                 <input v-model="userForm.name" type="text" class="form-control" id="name">
                             </div>
                             <div class="mb-3">
                                 <label for="email" class="form-label">Email</label>
                                

 <input v-model="userForm.email" type="email" class="form-control" id="email">
                             </div>
                             <div class="mb-3">
                                 <label for="password" class="form-label">Password</label>
                                 <input v-model="userForm.password" type="password" class="form-control" id="password">
                             </div>
                             <div class="mb-3">
                                 <label for="password_confirmation" class="form-label">Confirm Password</label>
                                 <input v-model="userForm.password_confirmation" type="password" class="form-control" id="password_confirmation">
                             </div>
                             <div class="mb-3">
                                 <label for="roles" class="form-label">Roles</label>
                                 <select v-model="userForm.roles" class="form-control" id="roles" multiple>
                                     <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
                                 </select>
                             </div>
                         </div>
                         <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                             <button type="button" class="btn btn-primary" @click="saveUser">{{ editingUser ? 'Update' : 'Create' }}</button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </template>

     <script>
     import axios from 'axios';

     export default {
         data() {
             return {
                 users: [],
                 roles: [],
                 showModal: false,
                 editingUser: null,
                 userForm: {
                     name: '',
                     email: '',
                     password: '',
                     password_confirmation: '',
                     roles: []
                 }
             };
         },
         mounted() {
             this.fetchUsers();
             this.fetchRoles();
         },
         methods: {
             fetchUsers() {
                 axios.get('/api/users').then(response => {
                     this.users = response.data;
                 });
             },
             fetchRoles() {
                 axios.get('/api/roles').then(response => {
                     this.roles = response.data;
                 });
             },
             showCreateUserModal() {
                 this.editingUser = null;
                 this.userForm = {
                     name: '',
                     email: '',
                     password: '',
                     password_confirmation: '',
                     roles: []
                 };
                 this.showModal = true;
             },
             editUser(user) {
                 this.editingUser = user;
                 this.userForm = {
                     name: user.name,
                     email: user.email,
                     password: '',
                     password_confirmation: '',
                     roles: user.roles.map(role => role.name)
                 };
                 this.showModal = true;
             },
             saveUser() {
                 if (this.editingUser) {
                     axios.put(`/api/users/${this.editingUser.id}`, this.userForm).then(() => {
                         this.fetchUsers();
                         this.closeModal();
                     });
                 } else {
                     axios.post('/api/users', this.userForm).then(() => {
                         this.fetchUsers();
                         this.closeModal();
                     });
                 }
             },
             deleteUser(userId) {
                 axios.delete(`/api/users/${userId}`).then(() => {
                     this.fetchUsers();
                 });
             },
             closeModal() {
                 this.showModal = false;
             }
         }
     };
     </script>

     <style scoped>
     .modal-backdrop {
         display: none;
     }
     </style>
     
