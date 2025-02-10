<template>
         <div>
             <h1>Permissions</h1>
             <button @click="showCreatePermissionModal" class="btn btn-primary mb-3">Create Permission</button>
             <table class="table">
                 <thead>
                     <tr>
                         <th>Name</th>
                         <th>Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="permission in permissions" :key="permission.id">
                         <td>{{ permission.name }}</td>
                         <td>
                             <button @click="editPermission(permission)" class="btn btn-warning btn-sm">Edit</button>
                             <button @click="deletePermission(permission.id)" class="btn btn-danger btn-sm">Delete</button>
                         </td>
                     </tr>
                 </tbody>
             </table>

             <!-- Create/Edit Permission Modal -->
             <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
                 <div class="modal-dialog">
                     <div class="modal-content">
                         <div class="modal-header">
                             <h5 class="modal-title">{{ editingPermission ? 'Edit Permission' : 'Create Permission' }}</h5>
                             <button type="button" class="btn-close" @click="closeModal"></button>
                         </div>
                         <div class="modal-body">
                             <div class="mb-3">
                                 <label for="name" class="form-label">Name</label>
                                 <input v-model="permissionForm.name" type="text" class="form-control" id="name">
                             </div>
                         </div>
                         <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                             <button type="button" class="btn btn-primary" @click="savePermission">{{ editingPermission ? 'Update' : 'Create' }}</button>
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
                 permissions: [],
                 showModal: false,
                 editingPermission: null,
                 permissionForm: {
                     name: ''
                 }
             };
         },
         mounted() {
             this.fetchPermissions();
         },
         methods: {
             fetchPermissions() {
                 axios.get('/api/permissions').then(response => {
                     this.permissions = response.data;
                 });
             },
             showCreatePermissionModal() {
                 this.editingPermission = null;
                 this.permissionForm = {
                     name: ''
                 };
                 this.showModal = true;
             },
             editPermission(permission) {
                 this.editingPermission = permission;
                 this.permissionForm = {
                     name: permission.name
                 };
                 this.showModal = true;
             },
             savePermission() {
                 if (this.editingPermission) {
                     axios.put(`/api/permissions/${this.editingPermission.id}`, this.permissionForm).then(() => {
                         this.fetchPermissions();
                         this.closeModal();
                     });
                 } else {
                     axios.post('/api/permissions', this.permissionForm).then(() => {
                         this.fetchPermissions();
                         this.closeModal();
                     });
                 }
             },
             deletePermission(permissionId) {
                 axios.delete(`/api/permissions/${permissionId}`).then(() => {
                     this.fetchPermissions();
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
